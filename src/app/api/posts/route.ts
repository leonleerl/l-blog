import { NextResponse } from 'next/server';
import { Article } from '@/models/article';

// Mock database
const articles: Article[] = [
  {
    id: '1',
    title: '我的第一篇博客',
    description: '这是我的第一篇博客，欢迎阅读。这里可以放一段较长的介绍，让读者对文章内容有更深入的了解。',
    content: '这是我的第一篇博客的详细内容。这里可以放更多的文字，图片和其他内容。作为我的第一篇博客，我想分享一些关于为什么我开始写博客的想法。写博客不仅可以记录自己的思考，还能与他人分享知识和经验。希望我的文章能够对读者有所帮助或启发。',
    date: '2025-03-20',
    image: '/images/yellow.jpeg',
    category: '个人日记',
    createdAt: new Date('2025-03-20'),
    updatedAt: new Date('2025-03-20')
  },
  {
    id: '2',
    title: '旅行的意义',
    description: '记录一些旅行中的感悟与美景。',
    content: '旅行对每个人的意义可能都不同。对我来说，旅行是一种探索未知、拓展视野的方式。在旅途中，我们会遇到不同的人、不同的文化，这些经历会丰富我们的人生阅历。同时，旅行也是一种放松身心的方式，让我们暂时脱离日常生活的压力，重新审视自己的生活和目标。',
    date: '2025-03-18',
    image: '/images/yellow.jpeg',
    category: '旅行',
    createdAt: new Date('2025-03-18'),
    updatedAt: new Date('2025-03-18')
  },
  {
    id: '3',
    title: 'React学习心得',
    description: '分享最近学习React的一些经验。',
    content: 'React是一个用于构建用户界面的JavaScript库，它的核心思想是组件化和单向数据流。在学习React的过程中，我发现理解其核心概念是非常重要的，例如JSX、组件、props、state等。特别是状态管理，是React开发中的关键部分。此外，React生态系统也非常丰富，有很多优秀的库可以配合使用，如Redux、React Router等。',
    date: '2025-03-15',
    image: '/images/yellow.jpeg',
    category: '技术',
    createdAt: new Date('2025-03-15'),
    updatedAt: new Date('2025-03-15')
  },
  {
    id: '4',
    title: '摄影技巧分享',
    description: '一些实用的摄影技巧和心得体会。',
    content: '摄影是捕捉光与影的艺术。好的摄影作品不仅仅是技术的体现，更是情感和视角的表达。在这篇文章中，我想分享一些基本但实用的摄影技巧，例如构图的原则、光线的运用、快门速度与光圈的关系等。此外，后期处理也是现代摄影不可或缺的一部分，适当的后期调整可以让照片更具表现力。',
    date: '2025-03-10',
    image: '/images/yellow.jpeg',
    category: '摄影',
    createdAt: new Date('2025-03-10'),
    updatedAt: new Date('2025-03-10')
  },
  {
    id: '5',
    title: '读书笔记：《活着》',
    description: '读完余华的《活着》后的一些思考。',
    content: '余华的《活着》是一部展现中国农村生活和人性的作品。通过福贵的一生，余华向我们展示了在时代变迁中个人命运的沉浮。这本书让我思考了很多关于生命意义、苦难与希望的问题。尽管福贵经历了无数的不幸和痛苦，但他仍然选择活着，这种坚韧和生命力是令人敬佩的。',
    date: '2025-03-05',
    image: '/images/yellow.jpeg',
    category: '读书',
    createdAt: new Date('2025-03-05'),
    updatedAt: new Date('2025-03-05')
  }
];

// GET all articles
export async function GET(request: Request) {
  // Get URL to handle query parameters
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  // If id is provided, return a single article
  if (id) {
    const article = articles.find(article => article.id === id);
    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }
    return NextResponse.json(article);
  }
  
  // Return all articles
  return NextResponse.json(articles);
}

// POST - Create a new article
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.description || !body.content) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }

    // Create new article
    const newArticle: Article = {
      id: (articles.length + 1).toString(),
      title: body.title,
      description: body.description,
      content: body.content,
      date: body.date || new Date().toISOString().split('T')[0],
      image: body.image || '/images/yellow.jpeg',
      category: body.category || '未分类',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Add to "database"
    articles.push(newArticle);

    return NextResponse.json(newArticle, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' }, 
      { status: 400 }
    );
  }
}

// PUT - Update an existing article
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Article ID is required' }, 
        { status: 400 }
      );
    }

    const body = await request.json();
    const articleIndex = articles.findIndex(article => article.id === id);

    if (articleIndex === -1) {
      return NextResponse.json(
        { error: 'Article not found' }, 
        { status: 404 }
      );
    }

    // Update article
    const updatedArticle = {
      ...articles[articleIndex],
      ...body,
      updatedAt: new Date()
    };

    articles[articleIndex] = updatedArticle;

    return NextResponse.json(updatedArticle);
  } catch {
    return NextResponse.json(
      { error: 'Failed to update article' }, 
      { status: 500 }
    );
  }
}

// DELETE - Remove an article
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json(
      { error: 'Article ID is required' }, 
      { status: 400 }
    );
  }

  const articleIndex = articles.findIndex(article => article.id === id);
  
  if (articleIndex === -1) {
    return NextResponse.json(
      { error: 'Article not found' }, 
      { status: 404 }
    );
  }

  // Remove article
  articles.splice(articleIndex, 1);

  return NextResponse.json(
    { message: 'Article deleted successfully' }, 
    { status: 200 }
  );
}
