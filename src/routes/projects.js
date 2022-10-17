import express from 'express';
import validateProjectBody from '../validations/projects';
import {
  getProjects,
  getProjectById,
  createProject,
} from '../controllers/projects';

const router = express.Router();

router
  .get('/', getProjects)
  .get('/:id', getProjectById)
  .post('/', validateProjectBody, createProject);

export default router;
