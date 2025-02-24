import { Post } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = {
  posts: {
    list: async (params?: { page?: number; limit?: number }) => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set('_page', params.page.toString());
      if (params?.limit) searchParams.set('_limit', params.limit.toString());
      
      const response = await fetch(`${API_URL}/posts?${searchParams}`);
      const total = response.headers.get('X-Total-Count');
      const posts = await response.json();
      
      return {
        posts,
        total: parseInt(total || '0'),
      };
    },

    get: async (id: string) => {
      const response = await fetch(`${API_URL}/posts/${id}`);
      return response.json();
    },

    create: async (data: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => {
      const response = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      });
      return response.json();
    },

    update: async (id: string, data: Partial<Post>) => {
      const response = await fetch(`${API_URL}/posts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          updatedAt: new Date().toISOString(),
        }),
      });
      return response.json();
    },

    delete: async (id: string) => {
      await fetch(`${API_URL}/posts/${id}`, {
        method: 'DELETE',
      });
    },
  },

  categories: {
    list: async () => {
      const response = await fetch(`${API_URL}/categories`);
      return response.json();
    },
    // Add other category-related methods
  },

  tags: {
    list: async () => {
      const response = await fetch(`${API_URL}/tags`);
      return response.json();
    },
    // Add other tag-related methods
  },
}; 