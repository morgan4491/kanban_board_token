import express from 'express';
import { getAllUsers, registerUser, loginUser, logOutUser } from '../../controllers/user-controller.js';
const router = express.Router();
// GET /users - Get all users
router.get('/', getAllUsers);
// POST /users - Register a new user
router.post('/', [registerUser, loginUser, logOutUser]);
export { router as userRouter };
