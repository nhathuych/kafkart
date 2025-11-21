import { ProductType } from '@repo/types';
import Categories from './Categories';
import ProductCard from './ProductCard';
import Link from 'next/link';
import Filter from './Filter';

const ProductList = async ({ category, sort, search, params }: { category: string, sort?: string, search?: string, params:'homepage' | 'products' }) => {
  const fetchData = async ({ category, sort, search, params }: { category?: string, sort?: string, search?: string, params: 'homepage' | 'products' }) => {
    const queries = [
      category && `category=${category}`,
      search && `search=${search}`,
      sort && `sort=${sort}`,
      params === 'homepage' && 'limit=8'
    ].filter(Boolean).join('&');
    console.log('query params: ', queries);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/api/v1/products/products?${queries.toString()}`);
    const data: ProductType[] = await res.json();
    return data;
  };

  const products = await fetchData({ category, sort, search, params });

  return (
    <div className='w-full'>
      <Categories />
      {params === 'products' && <Filter/>}
      <div className='gap-12 grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 xl:grid-cols-3'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Link
        href={category ? `/products/?category=${category}` : '/products'}
        className='flex justify-end mt-4 text-gray-500 text-sm underline'
      >
        View all products
      </Link>
    </div>
  );
};

export default ProductList;
