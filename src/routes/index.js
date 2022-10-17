import express from 'express';
import superAdminsRoutes from './super-admins';
import timeSheetsRouter from './time-sheets';

const router = express.Router();

router.use('/super-admins', superAdminsRoutes);
router.use('/time-sheets', timeSheetsRouter);

export default router;
