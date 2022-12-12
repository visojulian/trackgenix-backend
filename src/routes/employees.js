import express from 'express';
import { validateEmployeeBody, validateEditEmployee } from '../validations/employees';
import {
  getAllEmployees,
  getEmployeesById,
  createEmployees,
  deleteEmployees,
  editEmployees,
} from '../controllers/employees';
import checkAuth from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), getAllEmployees)
  .get('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), getEmployeesById)
  .post('/', validateEmployeeBody, createEmployees)
  .delete('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), deleteEmployees)
  .put('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), validateEditEmployee, editEmployees);

export default router;
