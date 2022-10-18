import express from 'express';
import {
  getAllSuperAdmins,
  getSuperAdminById,
  createSuperAdmin,
  deleteSuperAdmin,
  editSuperAdmin,
} from '../controllers/super-admins';

import validateSuperAdminBody from '../validations/super-admins';

const router = express.Router();

router
  .get('/', getAllSuperAdmins)
  .get('/:id', getSuperAdminById)
  .post('/', validateSuperAdminBody, createSuperAdmin)
  .delete('/:id', deleteSuperAdmin)
  .put('/:id', validateSuperAdminBody, editSuperAdmin);

export default router;
