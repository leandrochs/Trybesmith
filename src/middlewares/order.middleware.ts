import { NextFunction, Request, Response } from 'express';
import Order from '../interfaces/order.interface';

// productsIds: array;

function validationBook(req: Request, res: Response, next: NextFunction) {
  // const order: Order = req.body;
  const { productsIds }: Order = req.body;

  if (!productsIds) {
    return res.status(400).json({ message: '"productsIds" is required' });
  }

  if (!Array.isArray(productsIds)) {
    return res.status(422).json({ message: '"productsIds" must be an array' });
  }

  if (productsIds.length === 0) {
    return res
      .status(422)
      .json({ message: '"productsIds" must include only numbers' });
  }

  next();
}

export default validationBook;
