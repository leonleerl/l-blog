import { NextResponse } from 'next/server';
import { Category } from '@/models/category';

// Mock database for categories
const categories: Category[] = [
  {
    id: 1,
    name: '个人日记',
    description: '记录个人生活、思考和感悟的文章',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01')
  },
  {
    id: 2,
    name: '旅行',
    description: '旅行经历、景点推荐和旅游攻略',
    createdAt: new Date('2025-01-02'),
    updatedAt: new Date('2025-01-02')
  },
  {
    id: 3,
    name: '技术',
    description: '编程、开发和技术学习相关内容',
    createdAt: new Date('2025-01-03'),
    updatedAt: new Date('2025-01-03')
  },
  {
    id: 4,
    name: '摄影',
    description: '摄影技巧、作品和心得分享',
    createdAt: new Date('2025-01-04'),
    updatedAt: new Date('2025-01-04')
  },
  {
    id: 5,
    name: '读书',
    description: '读书笔记、书评和阅读心得',
    createdAt: new Date('2025-01-05'),
    updatedAt: new Date('2025-01-05')
  }
];

// GET all categories or a single category by ID
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const idNumber = parseInt(id);
    const category = categories.find(category => category.id === idNumber);
    
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json(category);
  }
  
  return NextResponse.json(categories);
}

// POST - Create a new category
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name) {
      return NextResponse.json(
        { error: 'Category name is required' }, 
        { status: 400 }
      );
    }

    // Create new category
    const newCategory: Category = {
      id: Math.max(0, ...categories.map(c => c.id)) + 1,
      name: body.name,
      description: body.description || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Add to "database"
    categories.push(newCategory);

    return NextResponse.json(newCategory, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' }, 
      { status: 400 }
    );
  }
}

// PUT - Update an existing category
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Category ID is required' }, 
        { status: 400 }
      );
    }

    const idNumber = parseInt(id);
    const body = await request.json();
    const categoryIndex = categories.findIndex(category => category.id === idNumber);

    if (categoryIndex === -1) {
      return NextResponse.json(
        { error: 'Category not found' }, 
        { status: 404 }
      );
    }

    // Update category
    const updatedCategory = {
      ...categories[categoryIndex],
      ...body,
      updatedAt: new Date()
    };

    categories[categoryIndex] = updatedCategory;

    return NextResponse.json(updatedCategory);
  } catch {
    return NextResponse.json(
      { error: 'Failed to update category' }, 
      { status: 500 }
    );
  }
}

// DELETE - Remove a category
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json(
      { error: 'Category ID is required' }, 
      { status: 400 }
    );
  }

  const idNumber = parseInt(id);
  const categoryIndex = categories.findIndex(category => category.id === idNumber);
  
  if (categoryIndex === -1) {
    return NextResponse.json(
      { error: 'Category not found' }, 
      { status: 404 }
    );
  }

  // Remove category
  categories.splice(categoryIndex, 1);

  return NextResponse.json(
    { message: 'Category deleted successfully' }, 
    { status: 200 }
  );
}
