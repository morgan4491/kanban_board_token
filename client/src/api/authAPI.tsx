import { UserLogin } from "../interfaces/UserLogin";
import axios from 'axios';

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route '/auth/login' with the userInfo


  // TODO: return the user object from the response

}

const register = async (userInfo: UserLogin) => {
  const res = await axios.post('/auth/register', userInfo);

  return res.data;
}


export const checkAuthentication = async () => {
  // TODO: Make a GET request to '/auth/user' to get the logged in user's data

  // TODO: Return true if a user is returned in the response or false if no user is returned
}

export const logOut = async () => {
  await axios.get('/auth/logout');
}


export { login, register };
