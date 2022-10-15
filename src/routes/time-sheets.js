import express from 'express';
import validateCreation from '../validations/time-sheets';

import {
  getAllTimeSheets,
  getTimeSheetById,
  createTimeSheet,
} from '../controllers/time-sheets';

const router = express.Router();

router
  .get('/', getAllTimeSheets)
  .get('/:id', getTimeSheetById)
  .post('/', validateCreation, createTimeSheet);

export default router;
