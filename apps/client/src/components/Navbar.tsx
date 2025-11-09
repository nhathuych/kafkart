import Image from 'next/image';
import Link from 'next/link';
import SearchBar from './SearchBar';
import { Bell, Home } from 'lucide-react';
import ShoppingCartIcon from './ShoppingCartIcon';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import ProfileButton from './ProfileButton';

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center pb-4 border-gray-200 border-b w-full'>
      {/* LEFT */}
      <Link href='/' className='flex items-center'>
        <Image
          src='/logo.png'
          alt='TrendLama'
          width={36}
          height={36}
          className='w-6 md:w-9 h-6 md:h-9'
        />
        <p className='hidden md:block font-medium text-md tracking-wider'>
          TRENDLAMA.
        </p>
      </Link>
      {/* RIGHT */}
      <div className='flex items-center gap-6'>
        <SearchBar />
        <Link href='/'>
          <Home className='w-4 h-4 text-gray-600'/>
        </Link>
        <Bell className='w-4 h-4 text-gray-600'/>
        <ShoppingCartIcon/>
        <SignedOut>
          {/* <SignInButton /> */}
          <SignInButton>
            <button className='hover:bg-gray-100 px-4 py-2 border border-gray-300 rounded text-gray-800 cursor-pointer'>
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <ProfileButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
