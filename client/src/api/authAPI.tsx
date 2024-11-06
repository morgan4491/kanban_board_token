import { UserLogin } from "../interfaces/UserLogin";
import axios from 'axios';

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    const response = await axios.post('/auth/login', userInfo, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      // Handle successful login
      return response.data;
    } else {
      // Handle unsuccessful login
      throw new Error('Login failed');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}



export { login };
