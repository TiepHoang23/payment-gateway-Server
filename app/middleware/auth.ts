import jwt from 'jsonwebtoken';
import { getBlockedToken } from '../database/utils/redisUtils.js';
import config from '../config/index.js';
import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
  isAuthenticated: () => boolean;
  userId: string;
}

export async function parserToken(req: AuthenticatedRequest, res: Response<any, Record<string, any>>, next: NextFunction): Promise<void> {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      req.isAuthenticated = () => false;
    } else {
      // Check token rejected
      const inBlackList = await getBlockedToken(token);

      if (inBlackList) {
        req.isAuthenticated = () => false;
      } else {
        const { userId } = jwt.verify(token, config.jwt.secretKey) as { userId: string };

        req.isAuthenticated = () => true;
        req.userId = userId;
      }
    }
  } catch (error) {
    req.isAuthenticated = () => false;
  }

  next();
}

export async function checkAuth(req: AuthenticatedRequest, res: Response<any, Record<string, any>>, next: NextFunction): Promise<void> {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.json({ status: false, message: 'invalid token' });
  }
}

export default { parserToken, checkAuth };
