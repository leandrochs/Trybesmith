import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwtConfig';

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization: token } = req.headers;

  if (!token) return res.status(401).json({ message: 'Token not found' });

  const decoded = jwt.verify(token, jwtConfig.secret);

  console.log('decoded: ', decoded);
  // const { userId } = decoded;
  // console.log('userId: ', userId);

  req.user = decoded;

  next();
}

export default authMiddleware;
