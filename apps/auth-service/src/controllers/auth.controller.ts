import { NextFunction, Response, Request } from 'express';
import { checkOtpRestrictions, sendOtp, trackOtpRequests, validateRegistrationData, verifyOtp } from '../utils/auth.helper';
import prisma from '../libs/prisma';
import { AuthError, ValidationError } from '@packages/error-handler';
import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { setCookie } from '../utils/cookies.helper';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validateRegistrationData(req.body, 'user');
    const { email, name, password } = req.body;
    password == password  // for generate swagger automatically

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return next(new ValidationError('Email is already in use. Please choose a different one.'));

    await checkOtpRestrictions(email);
    await trackOtpRequests(email);
    await sendOtp(name, email, 'user-activation');

    res.status(200).json({ message: 'OTP sent to your email. Please verify your account!' });
  } catch (error) {
    return next(error);
  }
};

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, name, password, otp } = req.body;
    if (!email || !name || !password || !otp) return next(new ValidationError('Please provide all required fields: email, name, password, and OTP.'));

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return next(new ValidationError('An account with this email already exists. Please use a different email address.'));

    await verifyOtp(email, otp);

    const hashedPassword = await argon2.hash(password);
    await prisma.user.create({ data: { email, name, password: hashedPassword } });

    res.status(201).json({
      success: true,
      message: `User registration successful for email ${email}.`,
    });
  } catch (error) {
    return next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return next(new ValidationError('Email and password are required.'));

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return next(new AuthError('User not found.'));

    const isMatch = await argon2.verify(user.password!, password);
    if (!isMatch) return next(new AuthError('Incorrect password.'));

    const accessToken = jwt.sign(
      { id: user.id, role: 'user' },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: '15m' },
    );
    const refreshToken = jwt.sign(
      { id: user.id, role: 'user' },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: '7d' },
    );

    setCookie('refresh_token', refreshToken, res);
    setCookie('access_token', accessToken, res);

    res.status(200).json({
      message: 'Login successful.',
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    if (!email) throw new ValidationError('Email is required.');

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new ValidationError('No user account found with this email.');

    await checkOtpRestrictions(email);
    await trackOtpRequests(email);
    await sendOtp(user.name, email, 'forgot-password-user-email');

    res.status(200).json({ message: 'An OTP has been sent to your email address. Please check your inbox to verify your account.' });
  } catch (error) {
    next(error);
  }
};

export const verifyUserForgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) throw new ValidationError('Email and OTP are required.');

    await verifyOtp(email, otp);
    res.status(200).json({ message: 'OTP verified. Now you can reset your password!' });
  } catch (error) {
    next(error);
  }
};

export const resetUserPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) return next(new ValidationError('Email and new password are required.'));

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return next(new ValidationError('User not found.'));

    const isTheSamePassword = await argon2.verify(user.password!, newPassword);
    if (isTheSamePassword) return next(new ValidationError('New password cannot be the same as the old password.'));

    const hashedPassword = await argon2.hash(newPassword);
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: 'Password has been reset successfully.' });
  } catch (error) {
    next(error);
  }
};
