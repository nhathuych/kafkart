import Link from 'next/link';
import React from 'react';

const ReturnPage = async ({ searchParams }: { searchParams: Promise<{session_id: string}> | undefined }) => {
  const session_id = (await searchParams)?.session_id;

  if (!session_id) return <div>No session id found!</div>;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/api/v1/payments/payments/sessions/${session_id}`);
  const data = await res.json();

  return (
    <div className='flex justify-center px-4 py-12'> 
      <div className='bg-white shadow-lg p-6 border-blue-500 border-t-4 rounded-xl w-full max-w-sm text-center'>
        <h1 className='mb-3 font-extrabold text-gray-800 text-3xl'>
          Payment: <span className='text-blue-600 uppercase'>{data.status}</span>
        </h1>
        <p className='mb-6 text-gray-600 text-lg'>
          Status: <span className='font-semibold text-gray-800'>{data.paymentStatus}</span>
        </p>
        <Link href='/orders' className='inline-block bg-blue-500 hover:bg-blue-600 shadow-md px-4 py-2 rounded-md font-semibold text-white transition duration-300'>
          See your orders
        </Link>
      </div>
    </div>
  );
};

export default ReturnPage;
