// src/pages/RequestResetPassword.tsx
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const RequestResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Mock backend response
    const mockResponse = { success: true };
    if (mockResponse.success) {
      setMessage('If an account with that email exists, a password reset link has been sent.');
    } else {
      setMessage('Failed to send password reset link. Please try again.');
    }
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2, backgroundColor: 'white' }}>
        <Typography variant="h4" component="h1" textAlign="center" mb={4}>Request Password Reset</Typography>
        <TextField 
          id="email" 
          label="Email" 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          fullWidth 
          required 
          margin="normal" 
        />
        {message && <Typography color={message.includes('sent') ? 'primary' : 'error'} variant="body2">{message}</Typography>}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 4 }}>Send Reset Link</Button>
      </Box>
    </Container>
  );
};

export default RequestResetPassword;