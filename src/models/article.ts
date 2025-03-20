import { Category } from './category';

interface Article {
    id: string;
    title: string;
    content: string;
    description: string;
    date: string;
    image: string;
    categories: Category[];
    is_featured: boolean;
    createdAt: Date;
    updatedAt: Date;
}


export type { Article };