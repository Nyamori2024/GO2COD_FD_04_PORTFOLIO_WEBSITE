// src/pages/Login.tsx
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Mock backend response
    const mockResponse = {
      data: {
        token: 'mockToken',
        role: 'admin',
        username: 'mockUser',
        email: 'mock@example.com',
      },
    };

    if (mockResponse.data) {
      localStorage.setItem('token', mockResponse.data.token);
      localStorage.setItem('role', mockResponse.data.role);
      dispatch(setUser({ user: { username: mockResponse.data.username, email: mockResponse.data.email, role: mockResponse.data.role }, token: mockResponse.data.token }));
      setMessage('Login successful.');
      navigate('/admin');
    } else {
      setMessage('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2, backgroundColor: 'white' }}>
        <Typography variant="h4" component="h1" textAlign="center" mb={4}>Login</Typography>
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
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 4 }}>Login</Button>
      </Box>
    </Container>
  );
};

export default Login;