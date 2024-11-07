import { UserLogin } from "../interfaces/UserLogin";
import axios from 'axios';

const login = async (userInfo: UserLogin) => {
  try {
    // Make a POST request to the login route '/auth/login' with the userInfo
  const response = await axios.post('/auth/login', userInfo);

  // Return the user object from the response
  return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

const register = async (userInfo: UserLogin) => {
  try {
    const res = await axios.post('/auth/register', userInfo);

    return res.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}


export const checkAuthentication = async () => {
  try {
    // TODO: Make a GET request to '/auth/user' to get the logged in user's data
    const response = await axios.get('/auth/user');
    
    // TODO: Return true if a user is returned in the response or false if no user is returned
    return response.data ? true : false;
  } catch (error) {
    console.error('Authentication check error:', error);
    return false;
  }


}

export const logOut = async () => {
  await axios.get('/auth/logout');
}


export { login, register };
