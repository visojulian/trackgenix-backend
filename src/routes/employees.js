import express from 'express';
import employeesControllers from '../controllers/employees';
// import employeesValidations from '../validations/employees';

const router = express.Router();

const logger = (req, res, next) => {
  console.log('Runnig Middleware');
  return next();
};

router
  .get('/', employeesControllers.getAllEmployees)
  .get('/:id', employeesControllers.getEmployeesById)
  .post('/', logger, employeesControllers.createEmployees);
// employeesValidations.validateEmployeesCreation,
export default router;
