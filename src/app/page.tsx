'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Text, Box, Flex, Heading, Container } from '@radix-ui/themes';
import { useArticles } from '@/hooks/useArticles';
import { Article } from '@/models/article';
import { BlogCardHome, FeaturedCarousel } from '@/components';

export default function Home() {
  const { articles, isLoading, error, fetchArticles } = useArticles();
  const [featuredPosts, setFeaturedPosts] = useState<Article[]>([]);
  const [recentPosts, setRecentPosts] = useState<Article[]>([]);

  useEffect(() => {
    if (articles.length > 0) {
      // Filter featured posts
      const featured = articles.filter(article => article.is_featured);
      setFeaturedPosts(featured);
      
      // Get recent posts that aren't featured
      const recent = articles
        .filter(article => !article.is_featured)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 6); // Limit to 6 recent posts
      setRecentPosts(recent);
    }
  }, [articles]);

  if (isLoading) {
    return (
      <Container size="3" className="py-20 px-4">
        <Flex direction="column" align="center" gap="4">
          <Heading size="6">加载中...</Heading>
          <Text>正在获取博客文章数据</Text>
        </Flex>
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="3" className="py-20 px-4">
        <Flex direction="column" align="center" gap="4">
          <Heading size="6" className="text-red-500">出错了</Heading>
          <Text>{error}</Text>
          <Box>
            <button 
              onClick={() => fetchArticles()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              重试
            </button>
          </Box>
        </Flex>
      </Container>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <Box className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <Container size="3" className="pt-20 pb-10 px-4">
          <Flex direction="column" align="center" gap="4" className="text-center py-10">
            <Heading size="9" className="text-gray-900 dark:text-white">Welcome here</Heading>
            <Text size="5" className="text-gray-600 dark:text-gray-300 max-w-xl">
              分享我的思考、经历与见解，记录生活中的点滴感悟与成长
            </Text>
          </Flex>
        </Container>
      </Box>

      {/* Featured Posts Carousel */}
      {featuredPosts.length > 0 && (
        <FeaturedCarousel featuredPosts={featuredPosts} />
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <Box className="bg-gray-50 dark:bg-gray-900">
          <Container size="3" className="px-4 py-16">
            <Flex justify="between" align="center" className="mb-6">
              <Heading size="6">最新文章</Heading>
              <Link href="/posts" className="text-blue-600 hover:text-blue-700 font-medium">
                查看全部 &rarr;
              </Link>
            </Flex>
            
            <Flex wrap="wrap" gap="6">
              {recentPosts.map(post => (
                <BlogCardHome key={post.id} post={post} />
              ))}
            </Flex>
          </Container>
        </Box>
      )}

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