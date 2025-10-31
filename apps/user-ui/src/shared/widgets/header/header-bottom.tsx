'use client';
import { navItems } from 'apps/user-ui/src/config/constants';
import { AlignLeft, ChevronDown, Handbag, HeartIcon, UserRound } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const HeaderBottom = () => {
  const [shown, setShown] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    }
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`${isSticky ? 'top-0 left-0 z-[100] fixed bg-white shadow-lg' : 'relative'} w-full transition-all duration-300`}>
      <div className={`${isSticky ? 'pt-3' : 'py-0'} relative flex justify-between items-center m-auto w-[80%]`}>
        {/* All Dropdowns */}
        <div onClick={() => setShown(!shown)} className={`${isSticky && '-mb-2'} flex justify-between items-center bg-[#3489ff] px-5 w-[250px] h-[50px] cursor-pointer`}>
          <div className='flex items-center gap-2'>
            <AlignLeft color='white' />
            <span className='font-medium text-white select-none'>All Departments</span>
          </div>
          <ChevronDown color='white' />
        </div>

        {/* Dropdown Menu */}
        {shown && (
          <div className={`${isSticky ? 'top-[70px]' : 'top-[50px]'} left-0 absolute bg-[#f5f5f5] w-[250px] h-[400px]`}>
          </div>
        )}

        {/* Navigation Links */}
        <div className='flex items-center'>
          {navItems.map((item: NavItemsTypes, index: number) => (
            <Link href={item.href} key={index} className='px-5 font-medium text-lg'>{item.title}</Link>
          ))}
        </div>

        <div>
          {isSticky && (
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
          )}
        </div>
      </div>
    </div>
  )
};

export default HeaderBottom;
