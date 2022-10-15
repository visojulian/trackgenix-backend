import express from 'express';
import taskControllers from '../controllers/tasks';
// import tasksValidations from '../validations/tasks';

const router = express.Router();

router.get('/', taskControllers.getAllTasks);
// router.get('/:id', getTasksById);
// router.post('/', createTask);

export default router;
