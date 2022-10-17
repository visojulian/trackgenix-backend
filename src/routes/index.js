import express from 'express';

import adminsRoutes from './admins';
import employeesRoutes from './employees';
import projectsRoutes from './projects';
import superAdminsRoutes from './super-admins';
import timeSheetsRouter from './time-sheets';

const router = express.Router();
router.use('/admins', adminsRoutes);
router.use('/employees', employeesRoutes);
router.use('/projects', projectsRoutes);
router.use('/super-admins', superAdminsRoutes);
router.use('/time-sheets', timeSheetsRouter);

export default router;
