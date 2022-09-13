import { Request } from 'express';
import { User } from '@modules/user/entities/user.entity';

export default interface IRequest extends Request {
  user: User;
}
