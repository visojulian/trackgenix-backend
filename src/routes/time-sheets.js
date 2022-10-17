import express from 'express';
import validateCreation from '../validations/time-sheets';

import {
  getAllTimeSheets,
  getTimeSheetById,
  createTimeSheet,
  deleteTimeSheet,
  editTimeSheet,
} from '../controllers/time-sheets';

const router = express.Router();

router
  .get('/', getAllTimeSheets)
  .get('/:id', getTimeSheetById)
  .post('/', validateCreation, createTimeSheet)
  .delete('/:id', deleteTimeSheet)
  .put('/:id', validateCreation, editTimeSheet);

export default router;
