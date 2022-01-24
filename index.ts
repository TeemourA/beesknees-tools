import express from 'express';

const app = express();
const port = process.env.port || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('server test is ok');
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

// console.log('hello from node typescript')
