import express from 'express';
import validateCreation from '../validations/time-sheets';

import {
  getAllTimeSheets,
  getTimeSheetById,
  createTimeSheet,
  deleteTimeSheet,
  editTimeSheet,
} from '../controllers/time-sheets';
import checkAuth from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), getAllTimeSheets)
  .get('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), getTimeSheetById)
  .post('/', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), validateCreation, createTimeSheet)
  .delete('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), deleteTimeSheet)
  .put('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), validateCreation, editTimeSheet);

export default router;
