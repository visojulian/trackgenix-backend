import express from 'express';
import {
  getAllSuperAdmins,
  getSuperAdminById,
  createSuperAdmin,
  deleteSuperAdmin,
  editSuperAdmin,
} from '../controllers/super-admins';
import checkAuth from '../middlewares/authMiddleware';

import validateSuperAdminBody from '../validations/super-admins';

const router = express.Router();

router
  .get('/', checkAuth(['SUPER_ADMIN']), getAllSuperAdmins)
  .get('/:id', checkAuth(['SUPER_ADMIN']), getSuperAdminById)
  .post('/', checkAuth(['SUPER_ADMIN']), validateSuperAdminBody, createSuperAdmin)
  .delete('/:id', checkAuth(['SUPER_ADMIN']), deleteSuperAdmin)
  .put('/:id', checkAuth(['SUPER_ADMIN']), validateSuperAdminBody, editSuperAdmin);

export default router;
