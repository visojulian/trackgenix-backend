import express from 'express';
import {
  getAllAdmins,
  getAdminById,
  createAdmin,
} from '../controllers/admins';
import validateAdminBody from '../validations/admins';

const router = express.Router();

router
  .get('/', getAllAdmins)
  .get('/:id', getAdminById)
  .post('/', validateAdminBody, createAdmin);

export default router;
