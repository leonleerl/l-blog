import Image from 'next/image';
import Link from 'next/link';
import { Card, Text, Box, Flex, Heading, Badge, Container, Tabs, Select, Grid } from '@radix-ui/themes';

export default function PostsPage() {
  // Categories for filter
  const categories = ['全部', '个人日记', '旅行', '技术', '摄影', '读书'];
  
  // All blog posts
  const allPosts = [
    {
      id: 1,
      title: '我的第一篇博客',
      description: '这是我的第一篇博客，欢迎阅读。这里可以放一段较长的介绍，让读者对文章内容有更深入的了解。',
      date: '2025-03-20',
      image: '/images/yellow.jpeg',
      category: '个人日记'
    },
    {
      id: 2,
      title: '旅行的意义',
      description: '记录一些旅行中的感悟与美景。在旅途中，我们不仅能看到不同的风景，还能遇见不同的人，体验不同的文化。',
      date: '2025-03-18',
      image: '/images/yellow.jpeg',
      category: '旅行'
    },
    {
      id: 3,
      title: 'React学习心得',
      description: '分享最近学习React的一些经验。从组件化思想到状态管理，React提供了一种全新的构建用户界面的方式。',
      date: '2025-03-15',
      image: '/images/yellow.jpeg',
      category: '技术'
    },
    {
      id: 4,
      title: '摄影技巧分享',
      description: '一些实用的摄影技巧和心得体会。好的构图可以让照片更有吸引力，适当的光线处理能够提升照片的质感。',
      date: '2025-03-10',
      image: '/images/yellow.jpeg',
      category: '摄影'
    },
    {
      id: 5,
      title: '读书笔记：《活着》',
      description: '读完余华的《活着》后的一些思考。这部作品以其朴实无华的叙事风格，展现了生命的韧性与人性的复杂。',
      date: '2025-03-05',
      image: '/images/yellow.jpeg',
      category: '读书'
    },
    {
      id: 6,
      title: '春季旅行推荐地点',
      description: '分享几个适合春季旅行的好去处，包括自然风光和人文景观。春天是旅行的好季节，万物复苏，处处生机盎然。',
      date: '2025-02-28',
      image: '/images/yellow.jpeg',
      category: '旅行'
    },
    {
      id: 7,
      title: 'TypeScript入门教程',
      description: '写给初学者的TypeScript指南，从基础语法到高级特性。TypeScript作为JavaScript的超集，增加了静态类型检查。',
      date: '2025-02-20',
      image: '/images/yellow.jpeg',
      category: '技术'
    },
    {
      id: 8,
      title: '生活随笔：城市的夜',
      description: '关于城市夜生活的一些观察和感想。霓虹灯下的城市有着白天所没有的魅力，人们在夜色中展现出不同的一面。',
      date: '2025-02-15',
      image: '/images/yellow.jpeg',
      category: '个人日记'
    },
    {
      id: 9,
      title: '手机摄影的艺术',
      description: '如何用手机拍出专业级的照片，从构图到后期处理的全套技巧。现代智能手机的相机功能越来越强大。',
      date: '2025-02-10',
      image: '/images/yellow.jpeg',
      category: '摄影'
    },
    {
      id: 10,
      title: '读书笔记：《百年孤独》',
      description: '关于马尔克斯的《百年孤独》的读书心得。这部魔幻现实主义的经典作品，讲述了布恩迪亚家族七代人的故事。',
      date: '2025-02-05',
      image: '/images/yellow.jpeg',
      category: '读书'
    },
  ];

  return (
    <>
      {/* Page Header */}
      <Box className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <Container size="3" className="py-16 px-4">
          <Flex direction="column" align="center" className="text-center">
            <Heading size="8" className="text-gray-900 dark:text-white mb-3">所有文章</Heading>
            <Text size="4" className="text-gray-600 dark:text-gray-300 max-w-xl">
              探索我的所有博客文章，按照你的兴趣发现更多内容
            </Text>
          </Flex>
        </Container>
      </Box>

      {/* Filters and Content */}
      <Container size="3" className="px-4 py-12">
        {/* Filter Controls */}
        <Flex 
          justify="between" 
          align={{ initial: 'start', sm: 'center' }}
          direction={{ initial: 'column', sm: 'row' }}
          gap="4"
          className="mb-8"
        >
          <Tabs.Root defaultValue="全部">
            <Tabs.List>
              {categories.map(category => (
                <Tabs.Trigger key={category} value={category}>
                  {category}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </Tabs.Root>

          <Flex align="center" gap="3">
            <Text size="2" color="gray">排序方式:</Text>
            <Select.Root defaultValue="newest">
              <Select.Trigger />
              <Select.Content>
                <Select.Item value="newest">最新发布</Select.Item>
                <Select.Item value="oldest">最早发布</Select.Item>
                <Select.Item value="az">按标题 (A-Z)</Select.Item>
                <Select.Item value="za">按标题 (Z-A)</Select.Item>
              </Select.Content>
            </Select.Root>
          </Flex>
        </Flex>

        {/* Posts Grid */}
        <Box className="mb-12">
          <Grid columns={{ initial: '1', md: '2', lg: '3' }} gap="6">
            {allPosts.map(post => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <Box className="aspect-[16/9] relative">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <Badge 
                    variant="solid" 
                    radius="full" 
                    className="absolute top-3 right-3 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200"
                  >
                    {post.category}
                  </Badge>
                </Box>
                <Box className="p-5">
                  <Text size="2" className="text-gray-500 dark:text-gray-400 mb-2">
                    {new Date(post.date).toLocaleDateString()}
                  </Text>
                  <Heading size="4" className="mb-2 line-clamp-2">
                    <Link href={`/posts/${post.id}`} className="hover:text-blue-600 transition-colors">
                      {post.title}
                    </Link>
                  </Heading>
                  <Text className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {post.description}
                  </Text>
                  <Link 
                    href={`/posts/${post.id}`} 
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center gap-1"
                  >
                    阅读全文 &rarr;
                  </Link>
                </Box>
              </Card>
            ))}
          </Grid>
        </Box>

        {/* Pagination */}
        <Flex justify="center" gap="3" className="mb-8">
          <Box className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md text-gray-500 dark:text-gray-400 cursor-not-allowed">
            上一页
          </Box>
          <Box className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition-colors">
            1
          </Box>
          <Box className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            2
          </Box>
          <Box className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            下一页
          </Box>
        </Flex>
      </Container>

      {/* Footer */}
      <Box className="bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
        <Container size="3" className="px-4 py-12">
          <Flex direction="column" align="center" gap="4">
            <Heading size="5">我的博客</Heading>
            <Flex gap="6">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">首页</Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">关于我</Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">联系方式</Link>
            </Flex>
            <Text size="2" className="text-gray-400 mt-4">
              © {new Date().getFullYear()} 我的博客 | 保留所有权利
            </Text>
          </Flex>
        </Container>
      </Box>
    </>
  );
}
