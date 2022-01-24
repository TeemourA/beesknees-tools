import express from 'express';

import { dbConnect } from './db';
import { userRouter } from './routes/user';

const app = express();
const port = process.env.PORT;

dbConnect();

app.use(express.json());
app.use([userRouter]);
// app.get('/', (req, res) => {
//   res.status(200).send('server test is ok');
// });

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
