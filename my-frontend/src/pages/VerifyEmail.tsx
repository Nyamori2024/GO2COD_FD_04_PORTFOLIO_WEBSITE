// src/pages/VerifyEmail.tsx
import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const token = searchParams.get('token');
    // Mock backend response
    const mockResponse = { success: true };
    if (token) {
      if (mockResponse.success) {
        setMessage('Email verified successfully. Redirecting to login...');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setMessage('Email verification failed. Please try again.');
      }
    } else {
      setMessage('Invalid verification link.');
    }
  }, [searchParams, navigate]);

  return (
    <Container>
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2, backgroundColor: 'white', textAlign: 'center' }}>
        <Typography variant="h4" component="h1" mb={4}>Email Verification</Typography>
        {message.includes('Verifying') && <CircularProgress />}
        <Typography variant="body1" mt={2}>{message}</Typography>
      </Box>
    </Container>
  );
};

export default VerifyEmail;