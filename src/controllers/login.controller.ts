import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import LoginService from '../services/login.services';

class LoginController {
  constructor(private userService = new LoginService()) {}

  public getByUsernameAndPassword = async (req: Request, res: Response) => {
    const loginData = await this.userService.getByUsernameAndPassword(req.body);

    const contents = Object.values(loginData);

    if (contents.length === 0) {
      return res.status(401).json({ message: 'Username or password invalid' });
    }

    const token = jwt.sign({ id: loginData.id }, 'superSecret', {
      algorithm: 'HS256',
      expiresIn: '10d',
    });

    return res.status(201).json({ token });
  };
}

export default LoginController;
