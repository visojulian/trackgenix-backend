// use "import" to import libraries
import express from 'express';

// use "require" to import JSON files
const admins = require('./data/admins.json');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const projectRouterJuli = require('./resources/projects');

app.use('/projectsJuli', projectRouterJuli);

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
