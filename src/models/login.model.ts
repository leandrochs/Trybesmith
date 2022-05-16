import { Pool } from 'mysql2/promise';
import Login from '../interfaces/login.interface';
import Id from '../interfaces/id.interface';

export default class LoginModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getByUsernameAndPassword(login: Login): Promise<Id> {
    const { username, password } = login;

    const [result] = await this.connection.execute(
      `SELECT u.id
      FROM Trybesmith.Users u
      WHERE u.username = ?
      AND u.password = ?`,
      [username, password],
    );

    return result as unknown as Id;
  }
}
