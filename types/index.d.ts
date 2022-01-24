declare namespace Express {
  export interface Request {
    token: string;
    user: { [key: string]: unknown };
  }
}
