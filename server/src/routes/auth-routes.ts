import { Router} from 'express';
import { registerUser, loginUser } from '../controllers/user-controller.js';

const router = Router();

// POST /register - Register a user
router.post('/register', registerUser);

// POST /login - Login a user
router.post('/login', loginUser);

export default router;
