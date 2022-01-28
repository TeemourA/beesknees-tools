import { RequestHandler } from 'express';

export const allowCors: RequestHandler = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type,authorization'
  );

  next();
};
