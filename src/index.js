// use "import" to import libraries
import express from 'express';
import { getAllProjects, getProjectsById, createProject } from './resources/projects';

// use "require" to import JSON files
const admins = require('./data/admins.json');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/projectsJuli/getAll', getAllProjects);
app.get('/projectsJuli/getProjectsById/:id', getProjectsById);
app.post('/projectsJuli/createProject', createProject);

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
