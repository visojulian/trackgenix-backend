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

const router = express.Router();

router
  .get('/', getProjects)
  .get('/:id', getProjectById)
  .post('/', validateProjectBody, createProject)
  .delete('/:id', deleteProject)
  .put('/:id/update', validateProjectBody, updateProject)
  .put('/:id/assignEmployee', validateEmployee, assignEmployee);

export default router;
