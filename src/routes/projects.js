import express from 'express';
import {
  validateProjectBody,
  validateEmployee,
} from '../validations/projects';
import {
  getProjects,
  getProjectById,
  createProject,
  deleteProject,
  updateProject,
  assignEmployee,
} from '../controllers/projects';
import checkAuth from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), getProjects)
  .get('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), getProjectById)
  .post('/', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), validateProjectBody, createProject)
  .delete('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), deleteProject)
  .put('/:id/update', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), validateProjectBody, updateProject)
  .put('/:id/assignEmployee', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), validateEmployee, assignEmployee);

export default router;
