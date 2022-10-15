import express from 'express';
import {
  getAllTimeSheets, getTimeSheetById,
} from '../controllers/time-sheets';

const router = express.Router();

router
  .get('/', getAllTimeSheets)
  .get('/:id', getTimeSheetById);

export default router;
