import { getAuth } from '@clerk/express';
import { NextFunction, Request, Response } from 'express';

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
