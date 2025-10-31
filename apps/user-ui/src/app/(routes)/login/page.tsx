'use client';
import GoogleSignInButton from 'apps/user-ui/src/shared/components/google-sign-in-button';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {};

  return (
    <div className='bg-[#f1f1f1] py-10 w-full min-h-[85vh]'>
      <h1 className='font-Poppins font-semibold text-black text-4xl text-center'>
        Login
      </h1>
      <p className='py-3 font-medium text-[#00000099] text-lg text-center'>
        Home . Login
      </p>

      <div className='flex justify-center w-full'>
        <div className='bg-white shadow p-8 rounded-lg md:w-[480px]'>
          <h3 className='mb-2 font-semibold text-3xl text-center'>
            Login to Kafkart
          </h3>

          <p className='mb-4 text-gray-500 text-center'>
            Don't have an account? {' '}
            <Link href={'/signup'} className='text-indigo-500'>
              Sign up
            </Link>
          </p>

          <GoogleSignInButton onClick={() => {}} />

          <div className='flex items-center my-5 text-gray-400 text-sm'>
            <div className='flex-1 border-gray-300 border-t' />
            <span className='px-3'>or Sign in with Email</span>
            <div className='flex-1 border-gray-300 border-t' />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <label className='block mb-1 text-gray-700'>Email</label>
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
            
            <div className='flex justify-between items-center my-4'>
              <label className='flex items-center text-gray-600 select-none'>
                <input
                  type='checkbox'
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className='mr-2 size-4'
                />
                Remember me
              </label>

              <Link href={'/forgot-password'} className='text-indigo-500 text-sm'>Forgot password?</Link>
            </div>

            <button type='submit' className='bg-black hover:bg-gray-800 py-2 rounded-lg w-full text-white hover:text-cyan-50 text-lg transition-all duration-300 cursor-pointer'>
              Login
            </button>

            {serverError && (
              <p className='mt-2 text-red-600 text-sm'>{serverError}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
};

export default Login;
