// src/services/userService.ts
import axios from 'axios';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const fetchUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>('/users');
  return response.data;
};

export const addUser = async (user: Partial<User>): Promise<User> => {
  const response = await api.post<User>('/users', user);
  return response.data;
};

export const updateUser = async (id: string, user: Partial<User>): Promise<User> => {
  const response = await api.put<User>(`/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`);
};