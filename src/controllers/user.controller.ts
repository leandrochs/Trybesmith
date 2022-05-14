import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserService from '../services/user.services';

class UserController {
  constructor(private userService = new UserService()) {}

  public create = async (req: Request, res: Response) => {
    const user = req.body;
    const userCreated = await this.userService.create(user);

    if (userCreated) {
      const token = jwt.sign({ id: userCreated.id }, 'superSecret', {
        algorithm: 'HS256',
        expiresIn: '10d',
      });

      return res.status(201).json({ token });
    }
  };
}

export default UserController;
