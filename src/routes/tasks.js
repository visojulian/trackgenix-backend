import express from 'express';
import { getAllTasks, getTasksById, createTask } from '../controllers/tasks';
import tasksValidations from '../validations/tasks';

const router = express.Router();

router.get('/', getAllTasks);
router.get('/:id', getTasksById);
router.post('/', tasksValidations, createTask);

export default router;
