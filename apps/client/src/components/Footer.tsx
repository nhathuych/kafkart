import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className='flex md:flex-row flex-col md:justify-between items-center md:items-start gap-8 md:gap-0 bg-gray-800 mt-16 p-8 rounded-lg'>
      <div className='flex flex-col items-center md:items-start gap-4'>
        <Link href='/' className='flex items-center'>
          <Image src='/logo.png' alt='TrendLama' width={36} height={36} />
          <p className='hidden md:block font-medium text-md text-white tracking-wider'>
            TRENDLAMA.
          </p>
        </Link>
        <p className='text-gray-400 text-sm'>© 2025 Trendlama.</p>
        <p className='text-gray-400 text-sm'>All rights reserved.</p>
      </div>
      <div className='flex flex-col items-center md:items-start gap-4 text-gray-400 text-sm'>
        <p className='text-amber-50 text-sm'>Links</p>
        <Link href='/'>Homepage</Link>
        <Link href='/'>Contact</Link>
        <Link href='/'>Terms of Service</Link>
        <Link href='/'>Privacy Policy</Link>
      </div>
      <div className='flex flex-col items-center md:items-start gap-4 text-gray-400 text-sm'>
        <p className='text-amber-50 text-sm'>Links</p>
        <Link href='/'>All Products</Link>
        <Link href='/'>New Arrivals</Link>
        <Link href='/'>Best Sellers</Link>
        <Link href='/'>Sale</Link>
      </div>
      <div className='flex flex-col items-center md:items-start gap-4 text-gray-400 text-sm'>
        <p className='text-amber-50 text-sm'>Links</p>
        <Link href='/'>About</Link>
        <Link href='/'>Contact</Link>
        <Link href='/'>Blog</Link>
        <Link href='/'>Affiliate Program</Link>
      </div>
    </div>
  );
};

export default Footer;
