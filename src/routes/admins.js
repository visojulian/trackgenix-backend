import express from 'express';
import {
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
} from '../controllers/admins';
import validateAdminBody from '../validations/admins';

const router = express.Router();

router
  .get('/', getAllAdmins)
  .get('/:id', getAdminById)
  .post('/', validateAdminBody, createAdmin)
  .put('/:id', validateAdminBody, updateAdmin);

export default router;
