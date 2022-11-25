import express from 'express';
import {
  getAllTasks, getTasksById, createTask, deleteTask, editTask,
} from '../controllers/tasks';
import checkAuth from '../middlewares/authMiddleware';
import tasksValidations from '../validations/tasks';

const router = express.Router();

router.get('/', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), getAllTasks);
router.get('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), getTasksById);
router.post('/', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), tasksValidations, createTask);
router.delete('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), deleteTask);
router.put('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), editTask);

export default router;
