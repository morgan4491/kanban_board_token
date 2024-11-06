import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = Router();

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  const { username, password } = req.body;
  console.log(req);

  try {
    // find the user by their username
    const user = await User.findOne({
      where: {
        username
      }
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    const isLogin = await bcrypt.compare(password, user.password);

    if (!isLogin) {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }

    const token = jwt.sign({
      user_id: user.id,
      username: user.username
    },
    process.env.JWT_SECRET!, {
      expiresIn: '1h'
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return res.json({ token, user });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({
      message: 'An error occured while logging in'
    });
  }
};


// POST /login - Login a user
router.post('/login', login);

export default router;
