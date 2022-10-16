import express from 'express';
import {
  getAllSuperAdmins,
  getSuperAdminById,
  createSuperAdmin,
} from '../controllers/super-admins';

import validateSuperAdminBody from '../validations/super-admins';

const router = express.Router();

router
  .get('/', getAllSuperAdmins)
  .get('/:id', getSuperAdminById)
  .post('/', validateSuperAdminBody, createSuperAdmin);

export default router;
