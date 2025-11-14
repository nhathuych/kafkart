import ProductInteraction from '@/components/ProductInteraction';
import { ProductType } from '@repo/types';
import Image from 'next/image';

// TEMPORARY
const product: ProductType = {
  id: 1,
  name: 'Adidas CoreFit T-Shirt',
  shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
  price: 59.9,
  sizes: ['xs', 's', 'm', 'l', 'xl'],
  colors: ['gray', 'purple', 'green'],
  images: {
    gray: '/products/1g.png',
    purple: '/products/1p.png',
    green: '/products/1gr.png',
  },
  categorySlug: 'test',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  // TODO:get the product from db
  // TEMPORARY
  return {
    title: product.name,
    describe: product.description,
  };
};

const ProductPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ color: string; size: string }>;
}) => {
  const { size, color } = await searchParams;

  const selectedSize = size || (product.sizes[0] as string);
  const selectedColor = color || (product.colors[0] as string);
  return (
    <div className='flex lg:flex-row flex-col gap-4 md:gap-12 mt-12'>
      {/* IMAGE */}
      <div className='relative w-full lg:w-5/12 aspect-2/3'>
        <Image
          src={(product.images as Record<string, string>)?.[selectedColor] || ''}
          alt={product.name}
          fill
          className='rounded-md object-contain'
        />
      </div>
      {/* DETAILS */}
      <div className='flex flex-col gap-4 w-full lg:w-7/12'>
        <h1 className='font-medium text-2xl'>{product.name}</h1>
        <p className='text-gray-500'>{product.description}</p>
        <h2 className='font-semibold text-2xl'>${product.price.toFixed(2)}</h2>
        <ProductInteraction
          product={product}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
        />
        {/* CARD INFO */}
        <div className='flex items-center gap-2 mt-4'>
          <Image
            src='/klarna.png'
            alt='klarna'
            width={50}
            height={25}
            className='rounded-md'
          />
          <Image
            src='/cards.png'
            alt='cards'
            width={50}
            height={25}
            className='rounded-md'
          />
          <Image
            src='/stripe.png'
            alt='stripe'
            width={50}
            height={25}
            className='rounded-md'
          />
        </div>
        <p className='text-gray-500 text-xs'>
          By clicking Pay Now, you agree to our{' '}
          <span className='hover:text-black underline'>Terms & Conditions</span>{' '}
          and <span className='hover:text-black underline'>Privacy Policy</span>
          . You authorize us to charge your selected payment method for the total amount shown. All sales are subject to our return and{' '}
          <span className='hover:text-black underline'>Refund Policies</span>.
        </p>
      </div>
    </div>
  );
};

export default ProductPage;
