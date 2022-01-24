import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { unauthorizedAccessErrorMessage } from '../constants/errorMessages';

import { User } from '../models/User';
import { authorization } from '../constants/headers';

export const auth: RequestHandler = async (req, res, next) => {
  try {
    const token = req.header(authorization)?.replace('Bearer ', '');
    if (!token) throw new Error();

    const { _id } = <{ _id: string }>(
      jwt.verify(token, process.env.TOKEN_SECRET!)
    );

    const user = await User.findOne({ _id, 'tokens.token': token });
    if (!user) throw new Error();

    req.token = token;
    req.user = user;

    next();
  } catch (e) {
    res.status(401).send({ error: unauthorizedAccessErrorMessage });
  }
};
