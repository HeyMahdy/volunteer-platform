import express from 'express';
import { createRequest, updateRequest, deleteRequest } from '../controllers/request-controller.js'
const router = express.Router();

// Request Routes

router.post('/', createRequest);
router.put('/:id', updateRequest);
router.delete('/:id', deleteRequest);

export default router;