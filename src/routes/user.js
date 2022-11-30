import express from 'express';
import getUserProfile from '../controllers/user';
import checkAuth from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), getUserProfile);

export default router;
