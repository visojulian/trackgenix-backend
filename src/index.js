// use "import" to import libraries
import express from 'express';
import mongoose from 'mongoose';
import employeesRoutes from './routes/employees';

const app = express();
const port = 3000;

app.use(express.json());

// Entity Routes
app.use('/employees', employeesRoutes);

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
