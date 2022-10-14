// use "import" to import libraries
import express from 'express';
import mongoose from 'mongoose';

import {
  getAllAdmins,
  getAdminsById,
  addAdmin,
  deleteAdmin,
  editAdmin,
  filterAdmin,
} from './controllers/admins';

import {
  getAllEmployees,
  getEmployeeById,
  createNewEmployee,
  editAnEmployee,
  deleteAnEmployee,
  fillterAllEmployees,
} from './controllers/employees';

import {
  getAllProjects,
  getActiveProjects,
  getProjectById,
  createProject,
  filterProjects,
  updateProjects,
  deleteProjects,
  assignEmployee,
} from './controllers/projects';

import {
  superAdminAlls,
  getSuperAdminById,
  superAdminCreate,
  deleteSuperAdmin,
  editSuperAdmin,
  filterSuperAdmin,
} from './controllers/super-admins';

import {
  getAllTasks,
  getTask,
  createTask,
  editTask,
  deleteTask,
  filterTasks,
} from './controllers/tasks';

import {
  getAllTimeSheets,
  filterTimeSheets,
  createTimeSheet,
  editTimeSheet,
  deleteTimeSheet,
  getTimeSheet,
} from './controllers/time-sheets';

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
      console.log('Connected to db');
    }
  },
);

// Admins
app.get('/admins', getAllAdmins);
app.get('/admins/:id', getAdminsById);
app.get('/admins/search/filter', filterAdmin);
app.post('/admins/add', addAdmin);
app.put('/admins/edit/:id', editAdmin);
app.delete('/admins/delete/:id', deleteAdmin);

// Employees
app.get('/getAllEmployees', getAllEmployees);
app.get('/getEmployeeById/:id', getEmployeeById);
app.post('/createNewEmployee', createNewEmployee);
app.put('/editAnEmployee/:id', editAnEmployee);
app.delete('/deleteAnEmployee/:id', deleteAnEmployee);
app.get('/fillterAllEmployees', fillterAllEmployees);

// Projects
app.get('/projects/getAll', getAllProjects);
app.get('/projects/getActiveProjects', getActiveProjects);
app.get('/projects/getById/:id', getProjectById);
app.post('/projects/create', createProject);
app.get('/projects/filter', filterProjects);
app.put('/projects/update/:id', updateProjects);
app.delete('/projects/delete/:id', deleteProjects);
app.put('/projects/assignEmployee/:id', assignEmployee);

// Super-admin
app.get('/superAdminAlls', superAdminAlls);
app.get('/getSuperAdminById/:id', getSuperAdminById);
app.post('/superAdminCreate', superAdminCreate);
app.delete('/deleteSuperAdmin/:id', deleteSuperAdmin);
app.put('/editSuperAdmin/:id', editSuperAdmin);
app.post('/filterSuperAdmin', filterSuperAdmin);

// Tasks
app.get('/tasks/getAll', getAllTasks);
app.get('/tasks/filter/:id', getTask);
app.post('/tasks/create', createTask);
app.put('/tasks/edit/:id', editTask);
app.delete('/tasks/delete/:id', deleteTask);
app.get('/tasks/filter', filterTasks);

// Time sheets
app.get('/time-sheets/getAll', getAllTimeSheets);
app.get('/time-sheets/get/:id', getTimeSheet);
app.get('/time-sheets/filter', filterTimeSheets);
app.post('/time-sheets/create', createTimeSheet);
app.put('/time-sheets/edit/:id', editTimeSheet);
app.delete('/time-sheets/delete/:id', deleteTimeSheet);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
