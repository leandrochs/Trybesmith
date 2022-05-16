import { Request, Response } from 'express';
import OrderService from '../services/order.services';

class OrderController {
  constructor(private orderService = new OrderService()) {}

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.orderService.getAll();
    res.status(200).json(orders);
  };

  public create = async (req: Request, res: Response) => {
    const createOrder = req.body;
    const orderCreated = await this.orderService.create(createOrder);
    res.status(201).json(orderCreated);
  };
}

export default OrderController;


// const create = async (req, res) => {
//   try {
//     const { title, content, categoryIds } = req.body;
//     const userId = req.user.id;

//     const blogPost = await BlogPostService.create({ title, content, categoryIds, userId });

//     if (blogPost.message && blogPost.message.indexOf('a foreign key constraint fails') !== -1) {
//       return res.status(400).json({ message: '"categoryIds" not found' });
//     }
    
//     return res.status(201).json(blogPost);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json(defaultServerErrorMessage);
//   }
// };