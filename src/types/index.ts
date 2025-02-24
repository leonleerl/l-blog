export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  published: boolean;
  featured: boolean;
  authorId: string;
  categoryId: string;
  tags: string[];
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  bio: string;
  avatarUrl: string | null;
  socialLinks: {
    twitter?: string;
    github?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  parentId: string | null;
  postCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  postCount: number;
}

export interface Comment {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  parentId: string | null;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}
