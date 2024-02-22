// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from './services/AuthService';

const Navbar = ({ currentUser, onLogout }) => {
  const handleLogout = () => {
    AuthService.logout();
    onLogout(); // App 컴포넌트에 로그아웃 상태를 알립니다.
  };

  return (
    <nav>
      <p><Link to="/">Home</Link></p>
      {currentUser ? (
        <>
          <span>Welcome, {currentUser.username}!</span>
          <button className="right" onClick={handleLogout}>Logout</button>
          <div className="spacer"></div>

        </>
      ) : (
        <>
          <Link className="right" to="/login">Login</Link>
          <Link className="right" to="/signup">Signup</Link>
          <div className="spacer"></div>

        </>
      )}
    </nav>
  );
};

export default Navbar;
