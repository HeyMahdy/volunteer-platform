import express from 'express';
import {
    createProfile,
    updateProfile,
    getProfileById,
    createSkill,
    updateSkill,
    createCause,
    updateCause
} from '../controllers/profile-controller.js';
import authMiddleware from '../middlewares/auth-middleware.js';

const router = express.Router();

// Profile Routes
router.post('/', authMiddleware, createProfile);
router.get('/:id', authMiddleware, getProfileById);
router.put('/:id', authMiddleware, updateProfile);


// Skill Routes
router.post('/skills', authMiddleware, createSkill);
router.put('/skills/:id', authMiddleware, updateSkill);

// Cause Routes
router.post('/causes', authMiddleware, createCause);
router.put('/causes/:id', authMiddleware, updateCause);

export default router;


