import express from 'express';
import {
  getAllTasks, getTasksById, createTask, deleteTask, editTask,
} from '../controllers/tasks';
import tasksValidations from '../validations/tasks';

const router = express.Router();

router.get('/', getAllTasks);
router.get('/:id', getTasksById);
router.post('/', tasksValidations, createTask);
router.delete('/:id', deleteTask);
router.put('/:id', editTask);

export default router;
