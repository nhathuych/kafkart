import { FastifyInstance } from 'fastify';
import { shouldBeUser } from '../hooks/auth.hook';
import { getUserOrders, getAllOrders } from '../controllers/order.controller';

export const orderRoute = async (fastify: FastifyInstance) => {
  fastify.get('/user-orders', { preHandler: shouldBeUser }, getUserOrders);
  fastify.get('/', getAllOrders);
};
