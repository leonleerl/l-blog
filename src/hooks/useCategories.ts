import { useState, useEffect, useCallback } from 'react';
import { Category } from '@/models/category';

interface UseCategoriesOptions {
  initialFetch?: boolean;
}

interface UseCategoriesResult {
  categories: Category[];
  category: Category | null;
  isLoading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  fetchCategory: (id: number) => Promise<void>;
  createCategory: (category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Category | null>;
  updateCategory: (id: number, category: Partial<Category>) => Promise<Category | null>;
  deleteCategory: (id: number) => Promise<boolean>;
}

export function useCategories(options: UseCategoriesOptions = {}): UseCategoriesResult {
  const { initialFetch = true } = options;
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all categories
  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/categories');
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch categories');
      console.error('Error fetching categories:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch a single category by ID
  const fetchCategory = useCallback(async (id: number) => {
    setIsLoading(true);
    setError(null);
    setCategory(null);
    
    try {
      const response = await fetch(`/api/categories?id=${id}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      setCategory(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch category');
      console.error('Error fetching category:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Create a new category
  const createCategory = useCallback(async (categoryData: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Update local state with the new category
      setCategories(prev => [...prev, data]);
      
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create category');
      console.error('Error creating category:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update an existing category
  const updateCategory = useCallback(async (id: number, categoryData: Partial<Category>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/categories?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Update local state
      setCategories(prev => 
        prev.map(category => 
          category.id === id ? { ...category, ...data } : category
        )
      );
      
      // If this is the currently selected category, update it too
      if (category && category.id === id) {
        setCategory({ ...category, ...data });
      }
      
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update category');
      console.error('Error updating category:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [category]);

  // Delete a category
  const deleteCategory = useCallback(async (id: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/categories?id=${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      // Update local state by removing the deleted category
      setCategories(prev => prev.filter(category => category.id !== id));
      
      // If this is the currently selected category, clear it
      if (category && category.id === id) {
        setCategory(null);
      }
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete category');
      console.error('Error deleting category:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [category]);

  // Initial fetch of categories if initialFetch is true
  useEffect(() => {
    if (initialFetch) {
      fetchCategories();
    }
  }, [fetchCategories, initialFetch]);

  return {
    categories,
    category,
    isLoading,
    error,
    fetchCategories,
    fetchCategory,
    createCategory,
    updateCategory,
    deleteCategory,
  };
} 