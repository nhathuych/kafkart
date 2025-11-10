import { FastifyReply, FastifyRequest } from 'fastify';
import Clerk from '@clerk/fastify';

declare module 'fastify' {
  interface FastifyRequest {
    userId?: string;
  }
}

export const shouldBeUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const { isAuthenticated, userId } = await Clerk.getAuth(request);
  if (!isAuthenticated) return reply.code(401).send({ error: 'User not authenticated' });

  request.userId = userId;
};
