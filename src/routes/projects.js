import express from 'express';
import validateProjectBody from '../validations/projects';
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
  .delete('/:id/delete', deleteProject)
  .put('/:id/update', validateProjectBody, updateProject)
  .put('/:id/assignEmployee', assignEmployee);

export default router;
