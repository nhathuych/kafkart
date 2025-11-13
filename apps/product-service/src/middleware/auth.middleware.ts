import { getAuth } from '@clerk/express';
import { NextFunction, Request, Response } from 'express';
import { CustomJwtSessionClaims } from '@repo/types';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const shouldBeUser = async (req: Request, res: Response, next: NextFunction) => {
  const { isAuthenticated, userId } = await getAuth(req);
  if (!isAuthenticated) return res.status(401).json({ error: 'User not authenticated' });

  req.userId = userId;
  return next();
};

export const shouldBeAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const auth = await getAuth(req);
  if (!auth.userId) return res.status(401).json({ error: 'User not authenticated' });

  const claims = auth.sessionClaims as CustomJwtSessionClaims;
  if (claims.metadata?.role !== 'admin') return res.status(403).send({ message: 'Unauthorized' });

  req.userId = auth.userId;
  return next();
};
