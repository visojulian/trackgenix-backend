import express from 'express';

import adminsRoutes from './admins';
import employeesRoutes from './employees';
import projectsRoutes from './projects';
import superAdminsRoutes from './super-admins';
import taskRoutes from './tasks';
import timeSheetsRouter from './time-sheets';
import userRouter from './user';

const router = express.Router();

router.use('/admins', adminsRoutes);
router.use('/employees', employeesRoutes);
router.use('/projects', projectsRoutes);
router.use('/super-admins', superAdminsRoutes);
router.use('/tasks', taskRoutes);
router.use('/time-sheets', timeSheetsRouter);
router.use('/user', userRouter);

export default router;
