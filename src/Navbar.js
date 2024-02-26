import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import AuthService from './services/AuthService';

const Navbar = ({ currentUser, onLogout }) => {
  const handleLogout = () => {
    AuthService.logout();
    onLogout();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Home
          </RouterLink>
        </Typography>
        {currentUser ? (
          <Box>
            <Typography variant="subtitle1" component="div" sx={{ marginRight: 2 }}>
              Welcome, {currentUser.username}!
            </Typography>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Box>
        ) : (
          <Box>
            <Button color="inherit" component={RouterLink} to="/login">Login</Button>
            <Button color="inherit" component={RouterLink} to="/signup">Signup</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
