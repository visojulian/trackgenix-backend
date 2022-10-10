// use "import" to import libraries
import express from 'express';
import {
  getAllAdmins, getAdminsById, addAdmin, deleteAdmin, editAdmin, filterAdmin,
} from './resources/admins';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', getAllAdmins);
app.get('/admins/:id', getAdminsById);
app.get('/admins/filter/search', filterAdmin);
app.post('/admins/add', addAdmin);
app.put('/admins/edit/:id', editAdmin);
app.delete('/admins/delete/:id', deleteAdmin);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
