// use "import" to import libraries
import express from 'express';
import {
  getAllAdmins,
  getAdminsById,
  addAdmin,
  deleteAdmin,
  editAdmin,
  filterAdmin,
} from './resources/admins';
import {
  getAllEmployees,
  getEmployeeById,
  createNewEmployee,
  editAnEmployee,
  deleteAnEmployee,
  fillterAllEmployees,
} from './resources/employees';
import {
  getAllTasks,
  getTask,
  createTask,
  editTask,
  deleteTask,
  filterTasks,
} from './resources/tasks';

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', getAllAdmins);
app.get('/admins/:id', getAdminsById);
app.get('/admins/search/filter', filterAdmin);
app.post('/admins/add', addAdmin);
app.put('/admins/edit/:id', editAdmin);
app.delete('/admins/delete/:id', deleteAdmin);

app.get('/getAllEmployees', getAllEmployees);
app.get('/getEmployeeById/:id', getEmployeeById);
app.post('/createNewEmployee', createNewEmployee);
app.put('/editAnEmployee/:id', editAnEmployee);
app.delete('/deleteAnEmployee/:id', deleteAnEmployee);
app.get('/fillterAllEmployees', fillterAllEmployees);

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
