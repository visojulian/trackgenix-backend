import express from 'express';
import projectValidation from '../validations/projects';
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
  .post('/', projectValidation.validateProjectBody, createProject)
  .delete('/:id/delete', deleteProject)
  .put('/:id/update', updateProject)
  .put('/:id/assignEmployee', assignEmployee);

export default router;
