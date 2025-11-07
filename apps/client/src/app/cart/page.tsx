'use client';

import PaymentForm from '@/components/PaymentForm';
import ShippingForm from '@/components/ShippingForm';
import useCartStore from '@/stores/cartStore';
import { CartItemsType, ShippingFormInputs } from '@/types';
import { ArrowRight, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const steps = [
  {
    id: 1,
    title: 'Shopping Cart',
  },
  {
    id: 2,
    title: 'Shipping Address',
  },
  {
    id: 3,
    title: 'Payment Method',
  },
];

// TEMPORARY
// const cartItems: CartItemsType = [
//   {
//     id: 1,
//     name: 'Adidas CoreFit T-Shirt',
//     shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
//     price: 39.9,
//     sizes: ['s', 'm', 'l', 'xl', 'xxl'],
//     colors: ['gray', 'purple', 'green'],
//     images: {
//       gray: '/products/1g.png',
//       purple: '/products/1p.png',
//       green: '/products/1gr.png',
//     },
//     quantity: 1,
//     selectedSize: 'm',
//     selectedColor: 'gray',
//   },
//   {
//     id: 2,
//     name: 'Puma Ultra Warm Zip',
//     shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
//     price: 59.9,
//     sizes: ['s', 'm', 'l', 'xl'],
//     colors: ['gray', 'green'],
//     images: { gray: '/products/2g.png', green: '/products/2gr.png' },
//     quantity: 1,
//     selectedSize: 'l',
//     selectedColor: 'gray',
//   },
//   {
//     id: 3,
//     name: 'Nike Air Essentials Pullover',
//     shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
//     price: 69.9,
//     sizes: ['s', 'm', 'l'],
//     colors: ['green', 'blue', 'black'],
//     images: {
//       green: '/products/3gr.png',
//       blue: '/products/3b.png',
//       black: '/products/3bl.png',
//     },
//     quantity: 1,
//     selectedSize: 'l',
//     selectedColor: 'black',
//   },
// ];

const CartPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [shippingForm, setShippingForm] = useState<ShippingFormInputs>();

  const activeStep = parseInt(searchParams.get('step') || '1');

  const { cart, removeFromCart } = useCartStore();
  return (
    <div className='flex flex-col justify-center items-center gap-8 mt-12'>
      {/* TITLE */}
      <h1 className='font-medium text-2xl'>Your Shopping Cart</h1>
      {/* STEPS */}
      <div className='flex lg:flex-row flex-col items-center gap-8 lg:gap-16'>
        {steps.map((step) => (
          <div
            className={`flex items-center gap-2 border-b-2 pb-4 ${
              step.id === activeStep ? 'border-gray-800' : 'border-gray-200'
            }`}
            key={step.id}
          >
            <div
              className={`size-6 rounded-full text-white p-4 flex items-center justify-center ${
                step.id === activeStep ? 'bg-gray-800' : 'bg-gray-400'
              }`}
            >
              {step.id}
            </div>
            <p
              className={`text-sm font-medium ${
                step.id === activeStep ? 'text-gray-800' : 'text-gray-400'
              }`}
            >
              {step.title}
            </p>
          </div>
        ))}
      </div>
      {/* STEPS & DETAILS */}
      <div className='flex lg:flex-row flex-col gap-16 w-full'>
        {/* STEPS */}
        <div className='flex flex-col gap-8 shadow-lg p-8 border border-gray-100 rounded-lg w-full lg:w-7/12'>
          {activeStep === 1 ? (
            cart.map((item) => (
              // SINGLE CART ITEM
              <div
                className='flex justify-between items-center'
                key={item.id + item.selectedSize + item.selectedColor}
              >
                {/* IMAGE AND DETAILS */}
                <div className='flex gap-8'>
                  {/* IMAGE */}
                  <div className='relative bg-gray-50 rounded-lg size-32 overflow-hidden'>
                    <Image
                      src={item.images[item.selectedColor]?.toString() || ''}
                      alt={item.name}
                      fill
                      className='object-contain'
                    />
                  </div>
                  {/* ITEM DETAILS */}
                  <div className='flex flex-col justify-between'>
                    <div className='flex flex-col gap-1'>
                      <p className='font-medium text-sm'>{item.name}</p>
                      <p className='text-gray-500 text-xs'>
                        Quantity: {item.quantity}
                      </p>
                      <p className='text-gray-500 text-xs'>
                        Size: {item.selectedSize}
                      </p>
                      <p className='text-gray-500 text-xs'>
                        Color: {item.selectedColor}
                      </p>
                    </div>
                    <p className='font-medium'>${item.price.toFixed(2)}</p>
                  </div>
                </div>
                {/* DELETE BUTTON */}
                <button
                  onClick={() => removeFromCart(item)}
                  className='flex justify-center items-center bg-red-100 hover:bg-red-200 rounded-full size-8 text-red-400 transition-all duration-300 cursor-pointer'
                >
                  <Trash2 className='size-3' />
                </button>
              </div>
            ))
          ) : activeStep === 2 ? (
            <ShippingForm setShippingForm={setShippingForm} />
          ) : activeStep === 3 && shippingForm ? (
            <PaymentForm />
          ) : (
            <p className='text-gray-500 text-sm'>
              Please fill in the shipping form to continue.
            </p>
          )}
        </div>
        {/* DETAILS */}
        <div className='flex flex-col gap-8 shadow-lg p-8 border border-gray-100 rounded-lg w-full lg:w-5/12 h-max'>
          <h2 className='font-semibold'>Cart Details</h2>
          <div className='flex flex-col gap-4'>
            <div className='flex justify-between text-sm'>
              <p className='text-gray-500'>Subtotal</p>
              <p className='font-medium'>
                $
                {cart
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className='flex justify-between text-sm'>
              <p className='text-gray-500'>Discount(10%)</p>
              <p className='font-medium'>$ 10</p>
            </div>
            <div className='flex justify-between text-sm'>
              <p className='text-gray-500'>Shipping Fee</p>
              <p className='font-medium'>$10</p>
            </div>
            <hr className='border-gray-200' />
            <div className='flex justify-between'>
              <p className='font-semibold text-gray-800'>Total</p>
              <p className='font-medium'>
                $
                {cart
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toFixed(2)}
              </p>
            </div>
          </div>
          {activeStep === 1 && (
            <button
              onClick={() => router.push('/cart?step=2', { scroll: false })}
              className='flex justify-center items-center gap-2 bg-gray-800 hover:bg-gray-900 p-2 rounded-lg w-full text-white transition-all duration-300 cursor-pointer'
            >
              Continue
              <ArrowRight className='size-3' />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
