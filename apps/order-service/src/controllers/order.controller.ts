import { FastifyReply, FastifyRequest } from 'fastify';
import { Order } from '@repo/order-db';

export const getUserOrders = async (request: FastifyRequest, reply: FastifyReply) => {
  const orders = await Order.find({ userId: request.userId });
  return reply.send(orders);
};

export const getAllOrders = async (request: FastifyRequest, reply: FastifyReply) => {
  const { limit } = request.query as { limit?: number };
  const orders = await Order.find().limit(limit || 10).sort({ createdAt: -1 });
  return reply.send(orders);
};
