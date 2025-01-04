// src/components/Header.tsx
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../features/authSlice';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery, useTheme } from '@mui/material';

const Header = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setDrawerOpen(false); // Close the drawer after navigation
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Portfolio CMS
        </Typography>
        {isSmallScreen ? (
          <>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={isDrawerOpen} onClose={toggleDrawer}>
              <List>
                <ListItem component="button" button onClick={() => handleNavigation('/portfolio')}>
                  <ListItemText primary="Portfolio" />
                </ListItem>
                <ListItem component="button" button onClick={() => handleNavigation('/blog')}>
                  <ListItemText primary="Blog" />
                </ListItem>
                {user && user.role === 'admin' && (
                  <ListItem component="button" button onClick={() => handleNavigation('/admin')}>
                    <ListItemText primary="Admin" />
                  </ListItem>
                )}
                {user ? (
                  <ListItem component="button" button onClick={handleLogout}>
                    <ListItemText primary="Logout" />
                  </ListItem>
                ) : (
                  <>
                    <ListItem component="button" button onClick={() => handleNavigation('/login')}>
                      <ListItemText primary="Login" />
                    </ListItem>
                    <ListItem component="button" button onClick={() => handleNavigation('/register')}>
                      <ListItemText primary="Register" />
                    </ListItem>
                  </>
                )}
              </List>
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" onClick={() => navigate('/portfolio')}>Portfolio</Button>
            <Button color="inherit" onClick={() => navigate('/blog')}>Blog</Button>
            {user && user.role === 'admin' && (
              <Button color="inherit" onClick={() => navigate('/admin')}>Admin</Button>
            )}
            {user ? (
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            ) : (
              <>
                <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
                <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
              </>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;