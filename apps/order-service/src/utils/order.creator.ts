import { Order } from '@repo/order-db';
import { OrderType } from '@repo/types';

export const createOrder = async (order: OrderType) => {
  try {
    const newOrder = new Order(order);
    await newOrder.save();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
