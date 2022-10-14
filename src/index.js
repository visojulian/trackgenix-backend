// use "import" to import libraries
import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 5000;

app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

const MONGO_URL = 'mongodb+srv://BaSP:BaSP2022@cluster0.2ktcmjk.mongodb.net/BaSP-database-Lucas-a?retryWrites=true&w=majority';

mongoose.connect(
  MONGO_URL,
  (error) => {
    if (error) {
      console.log('Failed connection to database', error);
    } else {
      console.log('Connected to database.');
      app.listen(port, () => {
        console.log(`Server ready on port ${port}`);
      });
    }
  },
);
