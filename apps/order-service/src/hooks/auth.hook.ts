import { FastifyReply, FastifyRequest } from 'fastify';
import Clerk from '@clerk/fastify';
import type { CustomJwtSessionClaims } from '@repo/types';

declare module 'fastify' {
  interface FastifyRequest {
    userId?: string;
  }
}

export const shouldBeUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const { isAuthenticated, userId } = await Clerk.getAuth(request);
  if (!isAuthenticated) return reply.code(401).send({ message: 'User not authenticated' });

  request.userId = userId;
};

export const shouldBeAdmin = async (request: FastifyRequest, reply: FastifyReply) => {
  const auth = await Clerk.getAuth(request);
  if (!auth.userId) return reply.code(401).send({ message: 'User not authenticated' });

  const claims = auth.sessionClaims as CustomJwtSessionClaims;
  if (claims.metadata?.role !== 'admin') return reply.code(403).send({ message: 'Unauthorized' });

  request.userId = auth.userId;
};
