import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import AuthContext from '../../store/auth-context';

const MainNavigation = () => {
  const context = useContext(AuthContext);
  const isLoggedIn = context.isLoggedIn;

  const logoutHandler = () => {
    context.logout();
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to='/' className='navbar-brand'>
          <span className="fw-bold">Online Classrooms</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            {!isLoggedIn && (
              <li className="nav-item">
                <Link to='/auth' className='nav-link'>Login</Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <Link to='/profile' className='nav-link'>Profile</Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item dropdown">
                <button className='nav-link btn' onClick={logoutHandler}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>

  );
};

export default MainNavigation;
