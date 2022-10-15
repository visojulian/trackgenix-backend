import express from 'express';
import projectValidation from '../validations/projects';
import projectsControllers from '../controllers/projects';

const router = express.Router();

router
  .get('/', projectsControllers.getAll)
  .post('/', projectValidation.validateCreation, projectsControllers.createProject);

export default router;
