import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { checkAuthentication, logOut } from '../api/authAPI';

const Navbar = () => {
  const [ loginCheck, setLoginCheck ] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthentication()
      .then((result: boolean) => setLoginCheck(result))
  }, [])

  const logoutUser = async () => {
    await logOut();

    setLoginCheck(false);
    navigate('/login');
  }

  return (
    <div className='nav'>
      <div className='nav-title'>
        <NavLink to='/'>Krazy Kanban Board</NavLink>
      </div>
      <ul>
      {
        !loginCheck ? (
          <li className='nav-item'>
            <button type='button'>
              <NavLink to='/login'>Login</NavLink>
              <NavLink to='/register'>Register</NavLink>
            </button>
          </li>
        ) : (
          <li className='nav-item'>
            <button type='button' onClick={logoutUser}>Logout</button>
          </li>
        )
      }
      </ul>
    </div>
  )
}

export default Navbar;
