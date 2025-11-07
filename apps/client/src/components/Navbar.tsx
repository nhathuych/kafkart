import Image from 'next/image';
import Link from 'next/link';
import SearchBar from './SearchBar';
import { Bell, Home, ShoppingCart } from 'lucide-react';
import ShoppingCartIcon from './ShoppingCartIcon';

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
        <Link href='/login'>Sign in</Link>
      </div>
    </nav>
  );
};

export default Navbar;
