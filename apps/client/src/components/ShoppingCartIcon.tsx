'use client';

import useCartStore from '@/stores/cartStore';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

const ShoppingCartIcon = () => {
  const { cart, hasHydrated } = useCartStore();

  if (!hasHydrated) return null;
  return (
    <Link href='/cart' className='relative'>
      <ShoppingCart className='w-4 h-4 text-gray-600' />
      <span className='-top-3 -right-3 absolute flex justify-center items-center bg-amber-400 rounded-full w-4 h-4 font-medium text-gray-600 text-xs'>
        {cart.reduce((acc, item) => acc + item.quantity, 0)}
      </span>
    </Link>
  );
};

export default ShoppingCartIcon;
