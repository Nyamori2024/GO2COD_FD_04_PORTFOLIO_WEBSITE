// src/services/mockData.ts
import { AuthResponse, PortfolioItem, BlogPost } from './types';

// Mock user data
export const mockUser: AuthResponse = {
  jwt: 'mock_token_123',
  user: {
    username: 'testuser',
    email: 'testuser@example.com',
    role: 'admin',
  },
};

// Mock portfolio items
export const mockPortfolioItems: PortfolioItem[] = [
  {
    id: '1',
    title: 'Project One',
    description: 'Description for project one',
    image: 'image1.png',
    body: 'Body content for project one',
    tags: ['tag1', 'tag2'],
  },
  {
    id: '2',
    title: 'Project Two',
    description: 'Description for project two',
    image: 'image2.png',
    body: 'Body content for project two',
    tags: ['tag3', 'tag4'],
  },
  {
    id: '3',
    title: 'Project Three',
    description: 'Description for project three',
    image: 'image3.png',
    body: 'Body content for project three',
    tags: ['tag5', 'tag6'],
  },
];

// Mock blog posts
export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Blog Post One',
    content: 'Content for blog post one',
    body: 'Body content for blog post one',
    author: 'Author One',
    date: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Blog Post Two',
    content: 'Content for blog post two',
    body: 'Body content for blog post two',
    author: 'Author Two',
    date: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Blog Post Three',
    content: 'Content for blog post three',
    body: 'Body content for blog post three',
    author: 'Author Three',
    date: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
  },
];