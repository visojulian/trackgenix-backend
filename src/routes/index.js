import express from 'express';
import projectsRoutes from './projects';
import superAdminsRoutes from './super-admins';

const router = express.Router();
router.use('/projects', projectsRoutes);
router.use('/super-admins', superAdminsRoutes);

export default router;
