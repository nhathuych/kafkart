import Link from 'next/link';
import React from 'react';
import { Handbag, HeartIcon, Search, UserRound } from 'lucide-react';
import HeaderBottom from './header-bottom';

const Header = () => {
  return (
    <div className='bg-white w-full'>
      <div className='flex justify-between items-center m-auto py-5 w-[80%]'>
        <div>
          <Link href={'/'}>
            <span className='font-bold text-slate-600 text-2xl select-none'>Kafkart</span>
          </Link>
        </div>

        <div className='relative w-[50%]'>
          <input type='text' placeholder='Search for products...' className='px-4 pr-[4.5rem] border-[#3389FF] border-[2.5px] rounded-lg outline-none w-full h-[55px] font-Poppins font-medium' />
          <div className='top-0 right-0 absolute flex justify-center items-center bg-[#3389FF] rounded-lg w-[60px] h-[55px] cursor-pointer'>
            <Search color='#fff' />
          </div>
        </div>

        <div className='flex items-center gap-8 pb-2'>
          <div className='flex items-center gap-2'>
            <Link href={'/login'} className='flex justify-center items-center border-[#010f1c1a] border-2 rounded-full size-[45px]'>
              <UserRound className='text-slate-600' />
            </Link>
            <Link href={'/login'}>
              <span className='block font-medium'>Hello, Huy dev</span>
              <span className='font-semibold'>Sign In</span>
            </Link>
          </div>

          <div className='flex items-center gap-5'>
            <Link href={'/wishlist'} className='relative'>
              <HeartIcon className='text-slate-700' />
              <div className='-top-3 -right-3 absolute flex justify-center items-center bg-red-500 border-2 border-white rounded-full size-6'>
                <span className='font-medium text-white text-sm'>0</span>
              </div>
            </Link>
            <Link href={'/cart'} className='relative'>
              <Handbag className='text-slate-700' />
              <div className='-top-3 -right-3 absolute flex justify-center items-center bg-red-500 border-2 border-white rounded-full size-6'>
                <span className='font-medium text-white text-sm'>0</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className='border-b border-b-[#99999939]' />
      <HeaderBottom />
    </div>
  )
};

export default Header;
