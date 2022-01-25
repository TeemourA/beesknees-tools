import { IUser } from '../../src/models/User';

declare global {
  declare namespace Express {
    interface Request {
      token: string;
      user: IUser;
    }
  }
}
