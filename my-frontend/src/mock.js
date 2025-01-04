// src/mock.js
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Create a new instance of MockAdapter on the default axios instance
const mock = new MockAdapter(axios);

// Mock registration endpoint
mock.onPost('/api/register').reply((config) => {
  const { email, password } = JSON.parse(config.data);
  if (email && password) {
    return [200, { message: 'Registration successful' }];
  } else {
    return [400, { message: 'Registration failed' }];
  }
});

// Mock login endpoint
mock.onPost('/api/login').reply((config) => {
  const { email, password } = JSON.parse(config.data);
  if (email === 'admin@example.com' && password === 'password') {
    return [200, { token: 'mock-token', role: 'admin' }];
  } else {
    return [401, { message: 'Login failed. Invalid credentials.' }];
  }
});

export default mock;