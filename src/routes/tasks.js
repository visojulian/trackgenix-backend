import express from 'express';
import { createTask } from '../controllers/tasks';
// import tasksValidations from '../validations/tasks';

const router = express.Router();

// router.get('/', getAllTasks);
// router.get('/:id', getTasksById);
router.post('/', createTask);

export default router;
