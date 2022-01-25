import express from 'express';

import { dbConnect } from './db';
import { userRouter } from './routes/user';

const app = express();
const port = process.env.PORT;

dbConnect();

app.use(express.json());
app.use([userRouter]);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
