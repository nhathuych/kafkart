import { ShippingFormInputs, shippingFormSchema } from '@repo/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

const ShippingForm = ({
  setShippingForm,
}: {
  setShippingForm: (data: ShippingFormInputs) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormInputs>({
    resolver: zodResolver(shippingFormSchema as any),
  });

  const router = useRouter();

  const handleShippingForm: SubmitHandler<ShippingFormInputs> = (data) => {
    setShippingForm(data);
    router.push('/cart?step=3', { scroll: false });
  };

  return (
    <form
      className='flex flex-col gap-4'
      onSubmit={handleSubmit(handleShippingForm)}
    >
      <div className='flex flex-col gap-1'>
        <label htmlFor='name' className='font-medium text-gray-500 text-xs'>
          Name
        </label>
        <input
          className='py-2 border-gray-200 border-b outline-none text-sm'
          type='text'
          id='name'
          placeholder='John Doe'
          {...register('name')}
          value='Elon Musk'
        />
        {errors.name && (
          <p className='text-red-500 text-xs'>{errors.name.message}</p>
        )}
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor='email' className='font-medium text-gray-500 text-xs'>
          Email
        </label>
        <input
          className='py-2 border-gray-200 border-b outline-none text-sm'
          type='email'
          id='email'
          placeholder='johndoe@gmail.com'
          {...register('email')}
          value='nhathuych@gmail.com'
        />
        {errors.email && (
          <p className='text-red-500 text-xs'>{errors.email.message}</p>
        )}
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor='phone' className='font-medium text-gray-500 text-xs'>
          Phone
        </label>
        <input
          className='py-2 border-gray-200 border-b outline-none text-sm'
          type='text'
          id='phone'
          placeholder='123456789'
          {...register('phone')}
          value='0123456789'
        />
        {errors.phone && (
          <p className='text-red-500 text-xs'>{errors.phone.message}</p>
        )}
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor='address' className='font-medium text-gray-500 text-xs'>
          Address
        </label>
        <input
          className='py-2 border-gray-200 border-b outline-none text-sm'
          type='text'
          id='address'
          placeholder='123 Main St, Anytown'
          {...register('address')}
          value='District 5, Cholon'
        />
        {errors.address && (
          <p className='text-red-500 text-xs'>{errors.address.message}</p>
        )}
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor='city' className='font-medium text-gray-500 text-xs'>
          City
        </label>
        <input
          className='py-2 border-gray-200 border-b outline-none text-sm'
          type='text'
          id='city'
          placeholder='New York'
          {...register('city')}
          value='Saigon'
        />
        {errors.city && (
          <p className='text-red-500 text-xs'>{errors.city.message}</p>
        )}
      </div>
      <button
        type='submit'
        className='flex justify-center items-center gap-2 bg-gray-800 hover:bg-gray-900 p-2 rounded-lg w-full text-white transition-all duration-300 cursor-pointer'
      >
        Continue
        <ArrowRight className='w-3 h-3' />
      </button>
    </form>
  );
};

export default ShippingForm;
