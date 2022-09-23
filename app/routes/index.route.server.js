// Index Routes
import { Router } from 'express';
import { helloWorld } from '../controllers/index.controller.server.js';

// Instantiating the router
const router = Router();

// Middleware to connect application
router.get('/', helloWorld);
router.get('/hello', helloWorld);

export default router;