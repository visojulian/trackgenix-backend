import express from 'express';
import employeesValidations from '../validations/employees';
import {
  getAllEmployees,
  getEmployeesById,
  createEmployees,
  deleteEmployees,
} from '../controllers/employees';

const router = express.Router();

router
  .get('/', getAllEmployees)
  .get('/:id', getEmployeesById)
  .post('/', employeesValidations, createEmployees)
  .delete('/:id', deleteEmployees);

export default router;
