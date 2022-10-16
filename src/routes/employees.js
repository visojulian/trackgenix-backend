import express from 'express';
import employeesControllers from '../controllers/employees';
import employeesValidations from '../validations/employees';

const router = express.Router();

router
  .get('/', employeesControllers.getAllEmployees)
  .get('/:id', employeesControllers.getEmployeesById)
  .post('/', employeesValidations.validateEmployeesCreation, employeesControllers.createEmployees);

export default router;
