import connection from '../models/connection';
import OrderModel from '../models/order.model';
import Order from '../interfaces/order.interface';
import CreateOrder from '../interfaces/createOrder.interface';

class OrderService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public async getAll(): Promise<Order[]> {
    const orders = await this.model.getAll();
    return orders;
  }

  public create(createOrder: CreateOrder): Promise<CreateOrder> {
    return this.model.create(createOrder);
  }
}

export default OrderService;
