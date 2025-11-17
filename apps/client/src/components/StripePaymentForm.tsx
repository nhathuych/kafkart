'use client'
import React, { useEffect, useState } from 'react';
import {loadStripe} from '@stripe/stripe-js';
import { CheckoutProvider } from '@stripe/react-stripe-js';
import { useAuth } from '@clerk/nextjs';
import { CartItemsType, ShippingFormInputs } from '@repo/types';
import CheckoutForm from './CheckoutForm';
import useCartStore from '@/stores/cartStore';

const stripe = loadStripe("pk_test_51STLhMQSXeY3T7UV3VWKdF1SBXj76KGzHTWkZL5vX3JXGfDhsZScNWPemn2rp0XkesSEwhiiFB9ad4UbDIWl9HGg005X2RrgIs");

const fetchClientSecret = async (cart: CartItemsType, token: string) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/api/v1/payments/payments/sessions/create-checkout-session`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      body: JSON.stringify({ cart }),
    })
    .then((response) => response.json())
    .then((json) => json.checkoutSessionClientSecret);
};

const StripePaymentForm = ({ shippingForm }: { shippingForm: ShippingFormInputs}) => {
  const { cart } = useCartStore();
  const [token, setToken] = useState<string | null>(null);
  const { getToken  } = useAuth();

  useEffect(() => {
    getToken().then((token) => setToken(token));
  }, []);

  if (!token) {
    return <div>Loading...</div>;
  }

  return (
    <CheckoutProvider
      stripe={stripe}
      options={{fetchClientSecret: () => fetchClientSecret(cart, token)}}
    >
      <CheckoutForm shippingForm={shippingForm} />
    </CheckoutProvider>
  );
};

export default StripePaymentForm;
