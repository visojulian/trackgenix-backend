import mongoose from 'mongoose';
import app from './app';

require('dotenv').config();

const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

mongoose.connect(
  process.env.DATABASE_URL,
  (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log('Failed connection to database', error);
    } else {
      // eslint-disable-next-line no-console
      console.log('Connected to database.');
      app.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`Server ready on port ${port}`);
      });
    }
  },
);
