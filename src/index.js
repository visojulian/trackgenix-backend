// use "import" to import libraries
import express from 'express';
import {
  getAllProjects, getActiveProjects, getProjectById, createProject, filterProjects,
} from './resources/projects';

// use "require" to import JSON files
const admins = require('./data/admins.json');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/projects/getAll', getAllProjects);
app.get('projects/getActive', getActiveProjects);
app.get('/projects/getById/:id', getProjectById);
app.post('/projects/create', createProject);
app.get('/projects/filter', filterProjects);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
