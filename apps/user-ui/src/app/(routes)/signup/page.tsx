'use client';
import axios, { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import GoogleSignInButton from 'apps/user-ui/src/shared/components/google-sign-in-button';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  name: string;
  email: string;
  password: string;
};

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [canResend, setCanResend] = useState(true);
  const [userData, setUserData] = useState<FormData | null>(null);
  const [timer, setTimer] = useState(60);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [showOtp, setShowOtp] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const startResendTimer = () => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      })
    }, 1000);
  };

  const signupMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register`, data);
      return res.data;
    },
    onSuccess: (_, formData) => {
      setUserData(formData);
      setShowOtp(true);
      setCanResend(false);
      setTimer(60);
      startResendTimer();
    },
  });

  const onSubmit = (data: FormData) => {
    signupMutation.mutate(data);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const resendOtp = () => {};

  return (
    <div className='bg-[#f1f1f1] py-10 w-full min-h-[85vh]'>
      <h1 className='font-Poppins font-semibold text-black text-4xl text-center'>
        Sign Up
      </h1>
      <p className='py-3 font-medium text-[#00000099] text-lg text-center'>
        Home . Sign Up
      </p>

      <div className='flex justify-center w-full'>
        <div className='bg-white shadow p-8 rounded-lg md:w-[480px]'>
          <h3 className='mb-2 font-semibold text-3xl text-center'>
            Sign Up to Kafkart
          </h3>

          <p className='mb-4 text-gray-500 text-center'>
            Already have an account? {' '}
            <Link href={'/login'} className='text-indigo-500'>
              login
            </Link>
          </p>

          <GoogleSignInButton onClick={() => {}} />

          <div className='flex items-center my-5 text-gray-400 text-sm'>
            <div className='flex-1 border-gray-300 border-t' />
            <span className='px-3'>or Sign up with Email</span>
            <div className='flex-1 border-gray-300 border-t' />
          </div>

          {!showOtp ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <label className='block mb-1 text-gray-700'>Full Name</label>
              <input
                type='text'
                placeholder='Huy Dev'
                className='mb-1 p-2 border border-gray-300 rounded-md outline-0 w-full'
                { ...register('name', {
                  required: 'Name is required',
                })}
              />
              {errors.name && (
                <p className='text-red-600 text-sm'>{String(errors.name.message)}</p>
              )}

              <label className='block mt-2 mb-1 text-gray-700'>Email</label>
              <input
                type='email'
                placeholder='support@kafkart.com'
                className='mb-1 p-2 border border-gray-300 rounded-md outline-0 w-full'
                { ...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Email is Invalid',
                  }
                })}
              />
              {errors.email && (
                <p className='text-red-600 text-sm'>{String(errors.email.message)}</p>
              )}

              <label className='block mt-2 mb-1 text-gray-700'>Password</label>
              <div className='relative'>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder='Min. 6 characters'
                  className='mb-1 p-2 pr-10 border border-gray-300 rounded-md outline-0 w-full'
                  { ...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
                />
                <button type='button' onClick={() => setPasswordVisible(!passwordVisible)} className='right-3 absolute inset-y-0 flex items-center text-gray-400'>
                  {passwordVisible ? <Eye /> : <EyeOff />}
                </button>
                {errors.password && (
                  <p className='text-red-600 text-sm'>{String(errors.password.message)}</p>
                )}
              </div>

              <button type='submit' className='bg-black hover:bg-gray-800 mt-4 py-2 rounded-lg w-full text-white hover:text-cyan-50 text-lg transition-all duration-300 cursor-pointer'>
                Sign Up
              </button>

              {serverError && (
                <p className='mt-2 text-red-600 text-sm'>{serverError}</p>
              )}
            </form>
          ) : (
            <div>
              <h3 className='mb-4 font-semibold text-xl text-center'>Enter OTP</h3>
              <div className='flex justify-center gap-6'>
                {otp.map((digit, index) => (
                  <input
                    type='text'
                    key={index}
                    maxLength={1}
                    value={digit}
                    ref={(el) => { if (el) inputRefs.current[index] = el }}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className='border border-gray-300 !rounded outline-none size-12 text-center'
                  />
                ))}
              </div>
              <button className='bg-indigo-500 mt-4 py-2 rounded-lg w-full text-white text-lg cursor-pointer'>
                Verify OTP
              </button>
              <p className='mt-4 text-sm text-center'>
                {canResend ? (
                  <button
                    onClick={resendOtp}
                    className='text-indigo-500 cursor-pointer'
                  >
                    Resend OTP
                  </button>
                ) : (
                  `Resend OTP in ${timer} seconds`
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
};

export default Signup;
