import Image from 'next/image';
import Link from 'next/link';
import { Card, Text, Box, Flex, Heading, Badge, Container } from '@radix-ui/themes';

export default function Home() {
  const featuredPost = {
    id: 1,
    title: '我的第一篇博客',
    description: '这是我的第一篇博客，欢迎阅读。这里可以放一段较长的介绍，让读者对文章内容有更深入的了解。',
    date: '2025-03-20',
    image: '/images/yellow.jpeg',
    category: '个人日记'
  };

  const posts = [
    {
      id: 2,
      title: '旅行的意义',
      description: '记录一些旅行中的感悟与美景。',
      date: '2025-03-18',
      image: '/images/yellow.jpeg',
      category: '旅行'
    },
    {
      id: 3,
      title: 'React学习心得',
      description: '分享最近学习React的一些经验。',
      date: '2025-03-15',
      image: '/images/yellow.jpeg',
      category: '技术'
    },
    {
      id: 4,
      title: '摄影技巧分享',
      description: '一些实用的摄影技巧和心得体会。',
      date: '2025-03-10',
      image: '/images/yellow.jpeg',
      category: '摄影'
    },
    {
      id: 5,
      title: '读书笔记：《活着》',
      description: '读完余华的《活着》后的一些思考。',
      date: '2025-03-05',
      image: '/images/yellow.jpeg',
      category: '读书'
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Box className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <Container size="3" className="py-20 px-4">
          <Flex direction="column" align="center" gap="4" className="text-center">
            <Heading size="9" className="text-gray-900 dark:text-white">我的博客空间</Heading>
            <Text size="5" className="text-gray-600 dark:text-gray-300 max-w-xl">
              分享我的思考、经历与见解，记录生活中的点滴感悟与成长
            </Text>
          </Flex>
        </Container>
      </Box>

      {/* Featured Post */}
      <Container size="3" className="px-4 py-16">
        <Heading size="6" className="mb-6">精选文章</Heading>
        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <Flex direction={{ initial: 'column', md: 'row' }} className="h-full">
            <Box className="md:w-1/2 relative" style={{ minHeight: '400px' }}>
              <Image 
                src={featuredPost.image} 
                alt={featuredPost.title}
                fill
                className="object-cover"
              />
            </Box>
            <Flex 
              direction="column" 
              justify="between" 
              className="p-8 md:w-1/2"
            >
              <Box>
                <Flex gap="2" align="center" className="mb-3">
                  <Badge variant="soft" radius="full">{featuredPost.category}</Badge>
                  <Text size="2" className="text-gray-400">
                    {new Date(featuredPost.date).toLocaleDateString()}
                  </Text>
                </Flex>
                <Heading size="6" className="mb-4">
                  <Link href={`/posts/${featuredPost.id}`} className="hover:text-blue-600 transition-colors">
                    {featuredPost.title}
                  </Link>
                </Heading>
                <Text className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                  {featuredPost.description}
                </Text>
              </Box>
              <Link 
                href={`/posts/${featuredPost.id}`} 
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                阅读更多 &rarr;
              </Link>
            </Flex>
          </Flex>
        </Card>
      </Container>

      {/* Recent Posts */}
      <Box className="bg-gray-50 dark:bg-gray-900">
        <Container size="3" className="px-4 py-16">
          <Flex justify="between" align="center" className="mb-6">
            <Heading size="6">最新文章</Heading>
            <Link href="/posts" className="text-blue-600 hover:text-blue-700 font-medium">
              查看全部 &rarr;
            </Link>
          </Flex>
          
          <Flex wrap="wrap" gap="6">
            {posts.map(post => (
              <Box key={post.id} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                <Card 
                  className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
                >
                  <Box className="aspect-video relative">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </Box>
                  <Flex direction="column" className="p-6 flex-grow">
                    <Flex gap="2" align="center" className="mb-3">
                      <Badge variant="soft" radius="full">{post.category}</Badge>
                      <Text size="2" className="text-gray-400">
                        {new Date(post.date).toLocaleDateString()}
                      </Text>
                    </Flex>
                    <Heading size="4" className="mb-2">
                      <Link href={`/posts/${post.id}`} className="hover:text-blue-600 transition-colors">
                        {post.title}
                      </Link>
                    </Heading>
                    <Text className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 flex-grow">
                      {post.description}
                    </Text>
                    <Link 
                      href={`/posts/${post.id}`} 
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      阅读更多 &rarr;
                    </Link>
                  </Flex>
                </Card>
              </Box>
            ))}
          </Flex>
        </Container>
      </Box>

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