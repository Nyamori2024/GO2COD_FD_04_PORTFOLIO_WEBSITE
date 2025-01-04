// src/pages/Admin.tsx
import React, { useEffect } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';

const Admin = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Page
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Welcome to the admin page. Here you can manage the application settings and content.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" color="primary" onClick={() => navigate('/admin/manage-users')}>
            Manage Users
          </Button>
          <Button variant="contained" color="secondary" onClick={() => navigate('/admin/manage-content')}>
            Manage Content
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Admin;