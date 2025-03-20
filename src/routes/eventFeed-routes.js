import express from 'express';
import { getEvent, getEventById, getRequest, getRequestById } from '../controllers/eventFeed-controller.js';

const router = express.Router();

// Event Feed Routes
router.get('/events', getEvent);
router.get('/events/:id', getEventById);
router.get('/requests', getRequest);
router.get('/requests/:id', getRequestById);

export default router;