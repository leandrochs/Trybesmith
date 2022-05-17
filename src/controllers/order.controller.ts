import { Request, Response } from 'express';
import OrderService from '../services/order.services';

class OrderController {
  constructor(private orderService = new OrderService()) {}

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.orderService.getAll();
    res.status(200).json(orders);
  };

  public create = async (req: Request, res: Response) => {
    const { decoded, productsIds } = req.body;
    const { userId } = decoded;

    const orderCreated = await this.orderService.create({
      userId,
      productsIds,
    });
    res.status(201).json(orderCreated);
  };
}

export default OrderController;
