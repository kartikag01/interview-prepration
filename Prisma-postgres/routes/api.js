import { Router } from "express"
import AuthController from "../Controller/AuthController.js";
import { createUser, getUser } from '../Controller/UserController.js';
import authMiddleware from "../middleware/Authenticate.js";


const router = Router();


// Auth Routes
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);

// Profile
router.get('/profile', authMiddleware, getUser);

export default router;

