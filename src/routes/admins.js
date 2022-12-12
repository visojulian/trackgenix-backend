import express from 'express';
import {
  getAllAdmins,
  getAdminById,
  createAdmin,
  deleteAdmin,
  updateAdmin,
} from '../controllers/admins';
import checkAuth from '../middlewares/authMiddleware';
import { validateAdminBody, validateEditAdminBody } from '../validations/admins';

const router = express.Router();

router
  .get('/', checkAuth(['SUPER_ADMIN']), getAllAdmins)
  .get('/:id', checkAuth(['SUPER_ADMIN']), getAdminById)
  .post('/', checkAuth(['SUPER_ADMIN']), validateAdminBody, createAdmin)
  .delete('/:id', checkAuth(['SUPER_ADMIN']), deleteAdmin)
  .put('/:id', checkAuth(['SUPER_ADMIN']), validateEditAdminBody, updateAdmin);

export default router;
