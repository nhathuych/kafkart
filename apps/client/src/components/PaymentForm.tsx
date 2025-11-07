import { PaymentFormInputs, paymentFormSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

const PaymentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormInputs>({
    resolver: zodResolver(paymentFormSchema as any),
  });

  const router = useRouter();

  const handlePaymentForm: SubmitHandler<PaymentFormInputs> = (data) => {
    
  };

  return (
    <form
      className='flex flex-col gap-4'
      onSubmit={handleSubmit(handlePaymentForm)}
    >
      <div className='flex flex-col gap-1'>
        <label htmlFor='cardHolder' className='font-medium text-gray-500 text-xs'>
          Name on card
        </label>
        <input
          className='py-2 border-gray-200 border-b outline-none text-sm'
          type='text'
          id='cardHolder'
          placeholder='John Doe'
          {...register('cardHolder')}
        />
        {errors.cardHolder && (
          <p className='text-red-500 text-xs'>{errors.cardHolder.message}</p>
        )}
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor='cardNumber' className='font-medium text-gray-500 text-xs'>
          Card Number
        </label>
        <input
          className='py-2 border-gray-200 border-b outline-none text-sm'
          type='text'
          id='cardNumber'
          placeholder='123456789123'
          {...register('cardNumber')}
        />
        {errors.cardNumber && (
          <p className='text-red-500 text-xs'>{errors.cardNumber.message}</p>
        )}
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor='expirationDate' className='font-medium text-gray-500 text-xs'>
          Expiration Date
        </label>
        <input
          className='py-2 border-gray-200 border-b outline-none text-sm'
          type='text'
          id='expirationDate'
          placeholder='01/32'
          {...register('expirationDate')}
        />
        {errors.expirationDate && (
          <p className='text-red-500 text-xs'>{errors.expirationDate.message}</p>
        )}
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor='cvv' className='font-medium text-gray-500 text-xs'>
          CVV
        </label>
        <input
          className='py-2 border-gray-200 border-b outline-none text-sm'
          type='text'
          id='cvv'
          placeholder='123'
          {...register('cvv')}
        />
        {errors.cvv && (
          <p className='text-red-500 text-xs'>{errors.cvv.message}</p>
        )}
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Image src='/klarna.png' alt='klarna' width={50} height={25} className='rounded-md'/>
        <Image src='/cards.png' alt='cards' width={50} height={25} className='rounded-md'/>
        <Image src='/stripe.png' alt='stripe' width={50} height={25} className='rounded-md'/>
      </div>
      <button
        type='submit'
        className='flex justify-center items-center gap-2 bg-gray-800 hover:bg-gray-900 p-2 rounded-lg w-full text-white transition-all duration-300 cursor-pointer'
      >
        Checkout
        <ShoppingCart className='w-3 h-3' />
      </button>
    </form>
  );
};

export default PaymentForm;
