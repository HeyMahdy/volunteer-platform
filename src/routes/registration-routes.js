import express from 'express';
import registration from '../controllers/registration-controller.js'
import authMiddleware from '../middlewares/auth-middleware.js'
const router = express.Router();

// Register for an event
router.post('/register',authMiddleware,registration);

export default router; 