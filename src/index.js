// use "import" to import libraries
import express from 'express';
import {
  getAllTimeSheets,
  filterTimeSheets,
  createTimeSheet,
  editTimeSheet,
  deleteTimeSheet,
  getTimeSheet,
} from './resources/time-sheets';

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

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
