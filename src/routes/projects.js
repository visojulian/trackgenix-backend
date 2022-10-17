import express from 'express';
import projectValidation from '../validations/projects';
import {
  getProjects,
  getProjectById,
  createProject,
  deleteProject,
} from '../controllers/projects';

const router = express.Router();

router
  .get('/', getProjects)
  .get('/:id', getProjectById)
  .post('/', projectValidation.validateProjectBody, createProject)
  .delete('/:id/delete', deleteProject);

export default router;
