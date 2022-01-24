import express from 'express';

import { auth } from '../middleware/auth';
import { User } from '../models/User';

// import { handleError, normalizeUserAvatar } from '../utils/router.js';

export const userRouter = express.Router();

userRouter.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

// userRouter.post('/users/login', auth, async (req, res) => {
//   try {
//     const user = await User.findByCredentials(
//       req.body.email,
//       req.body.password
//     );
//     const token = await user.generateAuthToken();
//     res.send({ user, token });
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });