'use client'

import { ShippingFormInputs } from '@repo/types';
import { PaymentElement, useCheckout } from '@stripe/react-stripe-js';
import { ConfirmError } from '@stripe/stripe-js';
import React, { useState } from 'react';

const CheckoutForm = ({ shippingForm }: { shippingForm: ShippingFormInputs}) => {
  const checkout = useCheckout();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ConfirmError | null>(null);

  const handleClick = async () => {
    setLoading(true);
    await checkout.updateEmail(shippingForm.email);
    await checkout.updateShippingAddress({
      name: 'shipping_address',
      address: {
        line1: shippingForm.address,
        city: shippingForm.city,
        country: 'US',
      },
    });

    const res = await checkout.confirm();
    if (res.type === 'error') setError(res.error);
    setLoading(false);
  };

  return (
    <form>
      <PaymentElement options={{ layout: 'accordion' }} />
      <button
        disabled={loading}
        onClick={handleClick}
        className={`w-full mt-4 py-2 px-4 text-white font-semibold rounded-lg transition-all ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
        }`}
      >
        {loading ? 'Loading...' : 'Pay'}
      </button>
      {error && <div>{error.message}</div>}
    </form>
  );
};

export default CheckoutForm;
