import { Category } from './category';

interface Article {
    id: string;
    title: string;
    content: string;
    description: string;
    date: string;
    image: string;
    categories: Category[];
    createdAt: Date;
    updatedAt: Date;
}


export type { Article };