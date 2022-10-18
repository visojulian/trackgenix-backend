import express from 'express';
import {
  getAllAdmins,
  getAdminById,
  createAdmin,
  deleteAdmin,
  updateAdmin,
} from '../controllers/admins';
import validateAdminBody from '../validations/admins';

const router = express.Router();

router
  .get('/', getAllAdmins)
  .get('/:id', getAdminById)
  .post('/', validateAdminBody, createAdmin)
  .delete('/:id', deleteAdmin)
  .put('/:id', validateAdminBody, updateAdmin);

export default router;
