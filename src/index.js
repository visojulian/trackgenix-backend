// use "import" to import libraries
import express from 'express';
import { getAllEmployees, getEmployeeById, createNewEmployee } from './resources/employees';

// use "require" to import JSON files
const admins = require('./data/admins.json');
// const employees = require('./data/employees.json');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.get('/getAllEmployees', getAllEmployees);
app.get('/getEmployeeById/:id', getEmployeeById);
app.post('/createNewEmployee', createNewEmployee);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
