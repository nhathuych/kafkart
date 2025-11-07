'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Filter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleFilter = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className='flex justify-end items-center gap-2 my-6 text-gray-500 text-sm'>
      <span>Sort by:</span>
      <select
        name='sort'
        id='sort'
        className='shadow-md p-1 rounded-sm ring-1 ring-gray-200'
        onChange={(e) => handleFilter(e.target.value)}
      >
        <option value='newest'>Newest</option>
        <option value='oldest'>Oldest</option>
        <option value='asc'>Price: Low to High</option>
        <option value='desc'>Price: High to Low</option>
      </select>
    </div>
  );
};

export default Filter;
