import express from 'express';
import getUserProfile from '../controllers/user';

const router = express.Router();

router
  .get('/', getUserProfile);

export default router;
