import express from 'express';
import projectValidation from '../validations/projects';
import {
  getProjects,
  getProjectById,
  createProject,
} from '../controllers/projects';

const router = express.Router();

router
  .get('/', getProjects)
  .get('/:id', getProjectById)
  .post('/', projectValidation.validateProjectBody, createProject);

export default router;
