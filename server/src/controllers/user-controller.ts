import { Request, Response } from 'express';
import {sign} from 'jsonwebtoken';
import { User } from '../models/User.js';

function createToken(user_id: number) {
  const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }
  return sign({user_id}, secret);
}

// GET /users
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


// POST /auth/register
export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const newUser = await User.create({ username, password });
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// TODO: Complete the login controller
// POST /auth/login
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Find a user in the database by the username provided in req.body

  // If no user found, send a 403 json response with a user not found message and return

  // If user is found, verify the password is correct (ie. user.validatePassword(password))

  // If password is validated then create a jwt token using the createToken function above and passing their id

  // Send a cookie back with the name of token and the token as value. Make sure to set httpOnly in the options object (ie. res.cookie())

  // Send a json response back with the user attached
};

// Logout a user
// GET /auth/logout
export const logOutUser = (_: Request, res: Response) => {
  res.clearCookie('token');

  res.json({
    message: 'Logged out successfully!'
  });
}