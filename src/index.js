// use "import" to import libraries
import express from 'express';
import {
  getAllAdmins, getAdminsById, addAdmin,
} from './resources/admins';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', getAllAdmins);
app.get('/admins/:id', getAdminsById);
app.post('/admins/add', addAdmin);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
