// src/services/contentService.ts
import axios from 'axios';

interface ContentItem {
  id: string;
  title: string;
  body: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const fetchContent = async (): Promise<ContentItem[]> => {
  const response = await api.get<ContentItem[]>('/content');
  return response.data;
};

export const addContent = async (content: Partial<ContentItem>): Promise<ContentItem> => {
  const response = await api.post<ContentItem>('/content', content);
  return response.data;
};

export const updateContent = async (id: string, content: Partial<ContentItem>): Promise<ContentItem> => {
  const response = await api.put<ContentItem>(`/content/${id}`, content);
  return response.data;
};

export const deleteContent = async (id: string): Promise<void> => {
  await api.delete(`/content/${id}`);
};