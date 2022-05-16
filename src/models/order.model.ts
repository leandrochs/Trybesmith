import { Pool } from 'mysql2/promise';
import Order from '../interfaces/order.interface';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    const result = await this.connection.execute(
      `SELECT 
        o.id,
        o.userId,
        JSON_ARRAYAGG(pr.id) AS productsIds
      FROM Trybesmith.Orders o, Trybesmith.Products pr
      WHERE o.id = pr.orderId
      GROUP BY o.id, o.userId
      ORDER BY o.userId;`,
    );
    const [rows] = result;
    return rows as Order[];
  }
}
