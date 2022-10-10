// use "import" to import libraries
import express from 'express';
import {
  getAllTasks,
  getTask,
  createTask,
  editTask,
  deleteTask,
  filterTasks,
} from './resources/tasks';

// use "require" to import JSON files
const admins = require('./data/admins.json');

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

app.get('/tasks/getAll', getAllTasks);
app.get('/tasks/filter/:id', getTask);
app.post('/tasks/create', createTask);
app.put('/tasks/edit/:id', editTask);
app.delete('/tasks/delete/:id', deleteTask);
app.get('/tasks/filter', filterTasks);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
