import express from 'express';

import  { createEvent, updateEvent, deleteEvent } from '../controllers/Event-controller.js'


const router = express.Router();

// Event Routes
router.post('/:id', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;