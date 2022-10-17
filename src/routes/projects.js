import express from 'express';
import projectValidation from '../validations/projects';
import {
  getProjects,
  getProjectById,
  createProject,
  deleteProject,
  updateProject,
} from '../controllers/projects';

const router = express.Router();

router
  .get('/', getProjects)
  .get('/:id', getProjectById)
  .post('/', projectValidation.validateProjectBody, createProject)
  .delete('/:id/delete', deleteProject)
  .put('/:id/update', updateProject);

export default router;
