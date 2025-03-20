'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { Text, Box, Flex, Heading, Container, Tabs, Select, Grid } from '@radix-ui/themes';
import { useArticles } from '@/hooks/useArticles';
import { useCategories } from '@/hooks/useCategories';
import { Article } from '@/models/article';
import { BlogCard } from '@/components';


export default function PostsPage() {
  // Get all categories from API
  const { categories } = useCategories();
  
  // State for articles, filtering and sorting
  const { articles, isLoading, error } = useArticles();
  const [filteredPosts, setFilteredPosts] = useState<Article[]>([]);
  const [activeCategory, setActiveCategory] = useState('全部');
  const [sortOrder, setSortOrder] = useState('newest');

  // Generate tabs for all categories
  const categoryTabs = ['全部', ...categories.map(cat => cat.name)];

  // Filter and sort articles when they change or filter/sort options change
  useEffect(() => {
    if (!articles.length) return;

    let result = [...articles];
    
    // Apply category filter
    if (activeCategory !== '全部') {
      result = result.filter(post => 
        post.categories.some(category => category.name === activeCategory)
      );
    }
    
    // Apply sorting
    switch (sortOrder) {
      case 'newest':
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'az':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'za':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }
    
    setFilteredPosts(result);
  }, [articles, activeCategory, sortOrder]);

  // Handle category change
  const handleCategoryChange = (value: string) => {
    setActiveCategory(value);
  };

  // Handle sort order change
  const handleSortChange = (value: string) => {
    setSortOrder(value);
  };

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
        </Flex>
      </Container>
    );
  }

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
          <Tabs.Root defaultValue="全部" onValueChange={handleCategoryChange}>
            <Tabs.List>
              {categoryTabs.map(category => (
                <Tabs.Trigger key={category} value={category}>
                  {category}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </Tabs.Root>

          <Flex align="center" gap="3">
            <Text size="2" color="gray">排序方式:</Text>
            <Select.Root defaultValue="newest" onValueChange={handleSortChange}>
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
          {filteredPosts.length === 0 ? (
            <Flex direction="column" align="center" justify="center" gap="4" className="py-12">
              <Text size="5">没有找到符合条件的文章</Text>
              <Text>请尝试其他筛选条件</Text>
            </Flex>
          ) : (
            <Grid columns={{ initial: '1', md: '2', lg: '3' }} gap="6">
              {filteredPosts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </Grid>
          )}
        </Box>

        {/* Pagination - Only show if we have items */}
        {filteredPosts.length > 0 && (
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
        )}
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
