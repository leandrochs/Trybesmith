import { Pool, ResultSetHeader } from 'mysql2/promise';
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

  public async create(order: Order): Promise<Order> {
    const { productsIds } = order;

    // const result = productsIds.map(async (productId) => {
    await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (productId) VALUES (?)',
      [productsIds],
    );
    // });
    // const [dataInserted] = result;
    // const { insertId } = dataInserted;
    return { productsIds };
  }
}

// public async create(product: Product): Promise<Product> {
//   const { name, amount } = product;
//   const result = await this.connection.execute<ResultSetHeader>(
//     'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
//     [name, amount],
//   );
//   const [dataInserted] = result;
//   const { insertId } = dataInserted;
//   return { id: insertId, ...product };
// }
