// src/services/types.ts

export interface User {
  username: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  jwt: string;
  user: User;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  body: string;
  tags: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;  // Add content property
  body: string;
  author: string;
  date: string;  // Add date property
  publishedAt: string;
}