import { useState, useEffect, useCallback } from 'react';
import { Article } from '@/models/article';

interface UseArticlesOptions {
  initialFetch?: boolean;
}

interface UseArticlesResult {
  articles: Article[];
  article: Article | null;
  isLoading: boolean;
  error: string | null;
  fetchArticles: () => Promise<void>;
  fetchArticle: (id: string) => Promise<void>;
  createArticle: (article: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Article | null>;
  updateArticle: (id: string, article: Partial<Article>) => Promise<Article | null>;
  deleteArticle: (id: string) => Promise<boolean>;
}

export function useArticles(options: UseArticlesOptions = {}): UseArticlesResult {
  const { initialFetch = true } = options;
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all articles
  const fetchArticles = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/posts');
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      setArticles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch articles');
      console.error('Error fetching articles:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch a single article by ID
  const fetchArticle = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    setArticle(null);
    
    try {
      const response = await fetch(`/api/posts?id=${id}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      setArticle(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch article');
      console.error('Error fetching article:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Create a new article
  const createArticle = useCallback(async (articleData: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Update local state with the new article
      setArticles(prev => [...prev, data]);
      
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create article');
      console.error('Error creating article:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update an existing article
  const updateArticle = useCallback(async (id: string, articleData: Partial<Article>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/posts?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Update local state
      setArticles(prev => 
        prev.map(article => 
          article.id === id ? { ...article, ...data } : article
        )
      );
      
      // If this is the currently selected article, update it too
      if (article && article.id === id) {
        setArticle({ ...article, ...data });
      }
      
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update article');
      console.error('Error updating article:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [article]);

  // Delete an article
  const deleteArticle = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/posts?id=${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      // Update local state by removing the deleted article
      setArticles(prev => prev.filter(article => article.id !== id));
      
      // If this is the currently selected article, clear it
      if (article && article.id === id) {
        setArticle(null);
      }
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete article');
      console.error('Error deleting article:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [article]);

  // Initial fetch of articles if initialFetch is true
  useEffect(() => {
    if (initialFetch) {
      fetchArticles();
    }
  }, [fetchArticles, initialFetch]);

  return {
    articles,
    article,
    isLoading,
    error,
    fetchArticles,
    fetchArticle,
    createArticle,
    updateArticle,
    deleteArticle,
  };
} 