import express from 'express';

import { dbConnect } from './db';
import { userRouter } from './routes/user';
import { cardSetRouter } from './routes/cardSet';

const app = express();
const port = process.env.PORT;

dbConnect();

app.use(express.json());
app.use([userRouter, cardSetRouter]);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
