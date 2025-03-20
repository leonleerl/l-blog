import { NextResponse } from 'next/server';
import { Article } from '@/models/article';
import { Category } from '@/models/category';

// Get categories from the mock database (in a real app, would use a database)
const getCategory = (name: string): Category => {
  const categories = [
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
  
  return categories.find(cat => cat.name === name) || {
    id: 99,
    name: '未分类',
    description: '未分类的文章',
    createdAt: new Date(),
    updatedAt: new Date()
  };
};

// Mock database
const articles: Article[] = [
  {
    id: '1',
    title: '我的第一篇博客',
    description: '这是我的第一篇博客，欢迎阅读。这里可以放一段较长的介绍，让读者对文章内容有更深入的了解。',
    content: `
# 欢迎来到我的博客

这是我的第一篇博客文章。在这里，我将分享我的想法、经验和见解。

## 为什么要写博客？

写博客有很多好处：

1. **记录思考**: 把想法写下来有助于整理思绪
2. **分享知识**: 帮助他人学习新知识
3. **建立社区**: 与志同道合的人建立联系

## 我将写些什么？

我计划涵盖以下主题：

- 技术教程和经验分享
- 旅行见闻和摄影作品
- 读书笔记和个人感悟

> 知识就像一座花园，需要精心培育，同时也需要与他人分享才能更加茂盛。

### 代码示例

这是一个简单的JavaScript函数：

\`\`\`javascript
function sayHello(name) {
  return \`Hello, \${name}!\`;
}

console.log(sayHello('读者'));
\`\`\`

感谢您阅读我的第一篇博客！希望我们能一起在知识的海洋中畅游。

![思考](https://images.unsplash.com/photo-1456324504439-367cee3b3c32)
    `,
    date: '2025-03-20',
    image: '/images/yellow.jpeg',
    categories: [getCategory('个人日记'), getCategory('旅行')],
    is_featured: true,
    createdAt: new Date('2025-03-20'),
    updatedAt: new Date('2025-03-20')
  },
  {
    id: '2',
    title: '旅行的意义',
    description: '记录一些旅行中的感悟与美景。',
    content: `
# 旅行的意义

旅行对每个人来说意义各不相同。对我而言，旅行是一种探索未知、拓展视野的方式。

## 旅行教会我的事

### 1. 适应力

在陌生的环境中，我们必须快速适应不同的文化、语言和生活方式。这种能力在现实生活中也非常重要。

### 2. 开阔视野

> 世界那么大，我想去看看。

旅行让我看到了不同的风景、文化和生活方式，让我意识到世界的多样性和丰富性。

### 3. 自我认知

远离熟悉的环境，我们有更多机会反思自己的生活和价值观。旅行往往是一次自我发现之旅。

## 一些旅行照片

![山脉](https://images.unsplash.com/photo-1464822759023-fed622ff2c3b)

*阿尔卑斯山的日出*

![海滩](https://images.unsplash.com/photo-1507525428034-b723cf961d3e)

*热带海滩的宁静*

## 旅行小贴士

1. **轻装上阵**: 只带必需品
2. **提前规划**: 做好行程安排，但也预留自由探索的时间
3. **融入当地**: 尝试当地美食，了解当地文化
4. **记录感受**: 拍照、写日记，记录下珍贵的瞬间

旅行不仅是到达目的地，更是一个发现自我和世界的过程。希望每个人都能找到属于自己的旅行意义。
    `,
    date: '2025-03-18',
    image: '/images/yellow.jpeg',
    categories: [getCategory('旅行')],
    is_featured: true,
    createdAt: new Date('2025-03-18'),
    updatedAt: new Date('2025-03-18')
  },
  {
    id: '3',
    title: 'React学习心得',
    description: '分享最近学习React的一些经验。',
    content: `
# React学习心得

React是一个用于构建用户界面的JavaScript库，其核心思想是组件化和单向数据流。在学习React的过程中，我积累了一些经验和教训，希望分享给大家。

## React的核心概念

### 组件（Components）

React应用由组件构成。组件可以是：

- **函数组件**：简单、直观
- **类组件**：功能更丰富（虽然现在大多使用hooks实现）

示例函数组件：

\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
\`\`\`

### 状态（State）和属性（Props）

- **Props**: 父组件传递给子组件的数据
- **State**: 组件内部的可变数据

### Hooks

React 16.8引入了Hooks，让我们可以在函数组件中使用状态和其他React特性。

\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  // 声明一个新的状态变量，我们将其称为 "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## 学习路径建议

1. **掌握JavaScript基础**：特别是ES6语法
2. **理解React核心概念**：组件、JSX、props、state
3. **学习React Router**：处理前端路由
4. **状态管理**：Context API或Redux
5. **构建工具**：了解webpack、Babel等

## 常见困难和解决方案

### 组件重新渲染问题

使用 \`React.memo\`、\`useMemo\` 和 \`useCallback\` 来优化性能。

### 状态管理复杂性

对于小型应用，Context API足够；大型应用考虑使用Redux。

> "学习曲线陡峭，但回报丰厚。" - 关于React的学习感悟

希望这些经验能帮助你更顺利地学习React。祝编程愉快！
    `,
    date: '2025-03-15',
    image: '/images/yellow.jpeg',
    categories: [getCategory('技术')],
    is_featured: true,
    createdAt: new Date('2025-03-15'),
    updatedAt: new Date('2025-03-15')
  },
  {
    id: '4',
    title: '摄影技巧分享',
    description: '一些实用的摄影技巧和心得体会。',
    content: `
# 摄影技巧分享

摄影不仅仅是按下快门那么简单，它是捕捉光与影的艺术。今天我想分享一些基本但实用的摄影技巧，帮助你提升摄影水平。

## 构图的基本原则

### 三分法则

想象画面被两条水平线和两条垂直线平均分成九个部分，将主体放在这些线的交叉点上，通常会产生更加平衡和吸引人的构图。

![三分法则示例](https://images.unsplash.com/photo-1552168324-d612d77725e3)

### 引导线

利用道路、河流、栅栏等自然线条引导观众的视线到照片的主体。

### 对称与平衡

对称构图给人一种和谐感，特别适合建筑和风景摄影。

## 光线运用

> "摄影"的词源就是"用光绘画"。

### 黄金时刻

日出后和日落前的一小时，光线柔和，颜色丰富，是户外摄影的黄金时间。

### 顺光与逆光

- **顺光**：光源在摄影师背后，主体照明均匀
- **逆光**：光源在主体后面，可以创造剪影效果或光晕效果

## 技术参数设置

### 光圈、快门速度与ISO的关系

\`\`\`
光圈：控制景深
快门速度：控制动态模糊
ISO：控制感光度（和噪点）
\`\`\`

要获得正确曝光，这三个参数需要相互平衡：

1. **大光圈**（小f值）= 浅景深，背景模糊
2. **快速快门** = 冻结动作
3. **低ISO** = 减少噪点，提高图像质量

## 后期处理

现代摄影中，后期处理是创作过程的重要部分。

### 基本调整

- 曝光
- 对比度
- 色温
- 裁剪

### 使用软件

Lightroom、Photoshop或手机上的Snapseed等应用都是不错的选择。

## 练习方法

1. **每日一拍**：坚持才能进步
2. **主题挑战**：给自己设定主题
3. **研究大师作品**：学习他们的构图和用光

记住，摄影最重要的是讲述故事和表达情感。技巧只是工具，创意才是核心。

希望这些技巧对你有所帮助！
    `,
    date: '2025-03-10',
    image: '/images/yellow.jpeg',
    categories: [getCategory('摄影')],
    is_featured: false,
    createdAt: new Date('2025-03-10'),
    updatedAt: new Date('2025-03-10')
  },
  {
    id: '5',
    title: '读书笔记：《活着》',
    description: '读完余华的《活着》后的一些思考。',
    content: `
# 读书笔记：《活着》

## 作品简介

《活着》是中国作家余华的代表作之一，通过讲述农民福贵的人生坎坷，展现了中国近现代历史变迁中普通人的生存状态。

> "活着本身就是人生最大的意义。" —— 《活着》

## 人物分析

### 福贵

福贵的一生经历了从地主少爷到贫农的转变，他的人生充满了苦难：家道中落、妻子早逝、儿女先他而去。但他始终坚强地活着，这种生命的顽强令人动容。

### 家珍

福贵的妻子，温柔贤惠，对生活充满希望。尽管生活艰辛，她依然以乐观的态度面对一切，是福贵生命中的重要精神支柱。

## 主题探讨

### 生存的意义

《活着》提出了一个核心问题：在苦难面前，生存本身有什么意义？

福贵的回答是：**活着**。

无论经历多少苦难，活着就是对生命最大的尊重和对苦难最有力的反抗。

### 命运与选择

书中人物的命运常常不由自主，但他们如何面对命运却是可以选择的。福贵选择了接受和坚持，而不是放弃。

### 历史的无情

小说通过福贵一家的遭遇，折射出特定历史时期普通人的生存困境，展现了历史洪流中个体的无力感。

## 文学技巧分析

余华采用了平实、朴素的叙事风格，却蕴含着深刻的情感和思考。他通过"讲故事"的方式，让读者在不知不觉中被带入那个苦难的世界。

\`\`\`
"我对自己说，人是为了活着本身而活着的，而不是为了活着之外的任何事物所活着。"
\`\`\`

## 个人感悟

阅读《活着》，让我重新思考生命的价值和意义。在当今社会，我们常常为各种欲望所困，忘记了生命本身的珍贵。

福贵的故事提醒我们：

1. 珍惜当下的幸福
2. 面对苦难时保持坚韧
3. 记住生命本身的价值

无论生活多么艰难，我们依然要带着尊严和勇气，继续活着。

![生命力](https://images.unsplash.com/photo-1531353826977-0941b4779a1c)

*顽强生长的植物，象征着生命的力量*

《活着》是一部令人深思的作品，值得每个人在不同人生阶段重读，都会有新的感悟。
    `,
    date: '2025-03-05',
    image: '/images/yellow.jpeg',
    categories: [getCategory('读书')],
    is_featured: false,
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

    // Handle categories
    let articleCategories: Category[] = [];
    if (body.categories) {
      if (Array.isArray(body.categories)) {
        // If categories are already objects with ids
        if (typeof body.categories[0] === 'object' && body.categories[0].id) {
          articleCategories = body.categories;
        } else {
          // If categories are strings
          articleCategories = body.categories.map((name: string) => getCategory(name));
        }
      } else if (typeof body.categories === 'string') {
        // If a single category string is provided
        articleCategories = [getCategory(body.categories)];
      }
    } else if (body.category) {
      // Backward compatibility with old field name
      articleCategories = [getCategory(body.category)];
    }

    // Create new article
    const newArticle: Article = {
      id: (articles.length + 1).toString(),
      title: body.title,
      description: body.description,
      content: body.content,
      date: body.date || new Date().toISOString().split('T')[0],
      image: body.image || '/images/yellow.jpeg',
      categories: articleCategories.length > 0 ? articleCategories : [getCategory('未分类')],
      is_featured: body.is_featured || false,
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
