// src/pages/Register.tsx
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('/api/register', { email, password });
      setMessage('Registration successful. Please check your email to verify your account.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Error during registration:', error);
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2, backgroundColor: 'white' }}>
        <Typography variant="h4" component="h1" textAlign="center" mb={4}>Register</Typography>
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
        <TextField 
          id="password" 
          label="Password" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          fullWidth 
          required 
          margin="normal" 
        />
        {message && <Typography color={message.includes('successful') ? 'primary' : 'error'} variant="body2">{message}</Typography>}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 4 }}>Register</Button>
      </Box>
    </Container>
  );
};

export default Register;