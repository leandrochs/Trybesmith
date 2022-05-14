import { NextFunction, Request, Response } from 'express';
import User from '../interfaces/user.interface';

const properties = ['username', 'classe', 'level', 'password'];

// id?: number
// username: string;
// classe: string;
// level: number;
// password: string;

function validateProperties(user: User): [boolean, string | null, string | null] {
  for (let i = 0; i < properties.length; i += 1) {
    if (!Object.prototype.hasOwnProperty.call(user, properties[i])) {
      return [false, properties[i], null];
    }
  }

  return [true, null, null];
}

function validateValueType(user: User): [boolean, string | null, string | null] {
  if (typeof user.username !== 'string') return [false, 'username', 'string'];
  if (typeof user.classe !== 'string') return [false, 'classe', 'string'];
  if (typeof user.password !== 'string') return [false, 'password', 'string'];
  if (typeof user.level !== 'number') return [false, 'level', 'number'];

  return [true, null, null];
}

function validateValues(user: User): [boolean, string | null, string | null] {
  const entries = Object.entries(user);
  for (let i = 0; i < entries.length; i += 1) {
    const [property, value] = entries[i];
    if (value.length < 3) {
      return [false, property, null];
    }
  }
  return [true, null, null];
}

function validateLength(user: User): [boolean, string | null, string | null] {
  if (user.level < 1) return [false, 'level', '"level" must be greater than or equal to 1'];
  if (user.password.length < 8) {
    return [false, 'password', '"password" length must be at least 8 characters long'];
  }

  return [true, null, null];
}

function validationBook(req: Request, res: Response, next: NextFunction) {
  const user: User = req.body;

  let [valid, property, message] = validateProperties(user);
  if (!valid) {
    return res.status(400).json({ message: `"${property}" is required` });
  }

  [valid, property, message] = validateValueType(user);
  if (!valid) {
    return res.status(422).json({ message: `"${property}" must be a ${message}` });
  }
  
  [valid, property, message] = validateLength(user);
  if (!valid) return res.status(422).json({ message });

  [valid, property, message] = validateValues(user);
  if (!valid) {
    return res.status(422).json({
      message: `"${property}" length must be at least 3 characters long`,
    });
  }

  next();
}

export default validationBook;
