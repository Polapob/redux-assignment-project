import { Request } from 'express';

export interface IAuthRequest extends Request {
  userEmail: string;
  userId: string;
}
