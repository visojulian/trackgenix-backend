import express from 'express';
import projectsRoutes from './projects';
import superAdminsRoutes from './super-admins';
import timeSheetsRouter from './time-sheets';

const router = express.Router();

router.use('/projects', projectsRoutes);
router.use('/super-admins', superAdminsRoutes);
router.use('/time-sheets', timeSheetsRouter);

export default router;
