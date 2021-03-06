import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwtConfig';

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization: token } = req.headers;

  if (!token) return res.status(401).json({ message: 'Token not found' });

  let decoded;

  try {
    decoded = jwt.verify(token, jwtConfig.secret);
  } catch (e) {
    res.status(401).json({ message: 'Invalid token' });
  }

  req.body = { ...req.body, decoded };

  next();
}

export default authMiddleware;
