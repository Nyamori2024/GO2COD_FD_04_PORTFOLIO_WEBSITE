// src/pages/ResetPassword.tsx
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    const token = searchParams.get('token');
    // Mock backend response
    const mockResponse = { success: true };
    if (token) {
      if (mockResponse.success) {
        setMessage('Password reset successfully. Redirecting to login...');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setMessage('Password reset failed. Please try again.');
      }
    } else {
      setMessage('Invalid reset link.');
    }
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2, backgroundColor: 'white' }}>
        <Typography variant="h4" component="h1" textAlign="center" mb={4}>Reset Password</Typography>
        <TextField 
          id="password" 
          label="New Password" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          fullWidth 
          required 
          margin="normal" 
        />
        <TextField 
          id="confirmPassword" 
          label="Confirm Password" 
          type="password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          fullWidth 
          required 
          margin="normal" 
        />
        {message && <Typography color={message.includes('successfully') ? 'primary' : 'error'} variant="body2">{message}</Typography>}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 4 }}>Reset Password</Button>
      </Box>
    </Container>
  );
};

export default ResetPassword;