import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwtConfig';
import LoginService from '../services/login.services';

class LoginController {
  constructor(private userService = new LoginService()) {}

  public getByUsernameAndPassword = async (req: Request, res: Response) => {
    const loginData = await this.userService.getByUsernameAndPassword(req.body);

    const [contents] = Object.values(loginData);

    if (!contents) {
      return res.status(401).json({ message: 'Username or password invalid' });
    }

    const { id } = contents;

    // const token = jwt.sign({ userId: id }, jwtConfig.secret);
    const token = jwt.sign({ userId: id }, jwtConfig.secret, jwtConfig.configs);

    return res.status(200).json({ token });
  };
}

export default LoginController;
