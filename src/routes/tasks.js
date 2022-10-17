import express from 'express';
import taskControllers from '../controllers/tasks';
import tasksValidations from '../validations/tasks';

const router = express.Router();

router.get('/', taskControllers.getAllTasks);
router.get('/:id', taskControllers.getTasksById);
router.post('/', tasksValidations, taskControllers.createTask);

export default router;
