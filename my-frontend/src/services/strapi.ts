// src/services/strapi.ts
import axios from 'axios';
import { mockUser, mockPortfolioItems, mockBlogPosts } from './mockData';
import { AuthResponse, PortfolioItem, BlogPost } from './types';

const api = axios.create({
  baseURL: import.meta.env.VITE_STRAPI_URL,
});

/**
 * Login function
 * @param {string} email - The user's email address
 * @param {string} password - The user's password
 * @returns {Promise<AuthResponse>} - The response data from the login request
 */
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  if (import.meta.env.MODE === 'development') {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockUser);
      }, 1000);
    });
  }

  const response = await api.post('/auth/local', {
    identifier: email,
    password,
  });

  // Ensure the response data matches the expected structure
  const user: AuthResponse['user'] = {
    username: response.data.user.username,
    email: response.data.user.email,
    role: response.data.user.role,
  };

  return {
    jwt: response.data.jwt,
    user,
  };
};

/**
 * Fetch Portfolio Items function
 * @returns {Promise<PortfolioItem[]>} - The response data from the fetch request
 */
export const fetchPortfolioItems = async (): Promise<PortfolioItem[]> => {
  if (import.meta.env.MODE === 'development') {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockPortfolioItems);
      }, 1000);
    });
  }

  const response = await api.get<PortfolioItem[]>('/portfolio-items');
  return response.data;
};

/**
 * Fetch Blog Posts function
 * @returns {Promise<BlogPost[]>} - The response data from the fetch request
 */
export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  if (import.meta.env.MODE === 'development') {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockBlogPosts);
      }, 1000);
    });
  }

  const response = await api.get<BlogPost[]>('/blog-posts');
  return response.data;
};