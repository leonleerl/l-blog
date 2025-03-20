interface Article {
    id: string;
    title: string;
    content: string;
    description: string;
    date: string;
    image: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}

// {
//     id: 1,
//     title: '我的第一篇博客',
//     description: '这是我的第一篇博客，欢迎阅读。这里可以放一段较长的介绍，让读者对文章内容有更深入的了解。',
//     date: '2025-03-20',
//     image: '/images/yellow.jpeg',
//     category: '个人日记'
//   },

export type { Article };