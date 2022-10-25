import express from 'express';
import validateEmployeeBody from '../validations/employees';
import {
  getAllEmployees,
  getEmployeesById,
  createEmployees,
  deleteEmployees,
  editEmployees,
} from '../controllers/employees';

const router = express.Router();

router
  .get('/', getAllEmployees)
  .get('/:id', getEmployeesById)
  .post('/', validateEmployeeBody, createEmployees)
  .delete('/:id', deleteEmployees)
  .put('/:id', validateEmployeeBody, editEmployees);

export default router;
