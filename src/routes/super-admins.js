import express from 'express';
import superAdminControllers from '../controllers/super-admins';
import superAdminValidations from '../validations/super-admins';

const router = express.Router();

router
  .get('/', superAdminControllers.getAllSuperAdmins)
  .get('/:id', superAdminControllers.getSuperAdminById)
  .post('/', superAdminValidations.validateCreation, superAdminControllers.createSuperAdmin);

export default router;
