'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Text, Box, Flex, Heading, Badge, Container, Card, Separator, Grid, Button, ScrollArea } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import { useArticles } from '@/hooks/useArticles';
import { Article } from '@/models/article';

const TableOfContents = ({ headings }: { headings: { id: string; text: string; level: number }[] }) => {
  if (headings.length === 0) return null;
  
  return (
    <Card className="hidden lg:block sticky top-8 border border-gray-200 dark:border-gray-700 p-4 my-6">
      <Heading size="4" className="mb-4 text-gray-800 dark:text-gray-200">目录</Heading>
      <ScrollArea className="max-h-[60vh]">
        <Box className="flex flex-col gap-1">
          {headings.map((heading, index) => (
            <Link
              key={`toc-${heading.id || index}`}
              href={`#${heading.id}`}
              className={`
                text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors
                py-1 
                ${heading.level === 2 ? 'pl-0' : ''}
                ${heading.level === 3 ? 'pl-4' : ''}
                ${heading.level > 3 ? 'pl-6' : ''}
              `}
            >
              {heading.text}
            </Link>
          ))}
        </Box>
      </ScrollArea>
    </Card>
  );
};

export default function PostDetail() {
  const params = useParams();
  const postId = params.id as string;
  
  const { article, isLoading, error, fetchArticle, articles } = useArticles();
  const [post, setPost] = useState<Article | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Article[]>([]);
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

  // Extract headings from the content
  useEffect(() => {
    if (post?.content) {
      const extractedHeadings: { id: string; text: string; level: number }[] = [];
      const lines = post.content.split('\n');
      
      lines.forEach(line => {
        // Match headings (## Heading)
        const match = line.match(/^(#{1,6})\s+(.+)$/);
        if (match) {
          const level = match[1].length;
          const text = match[2].trim();
          // Generate ID from text (for anchor links)
          const id = text
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-');
          
          extractedHeadings.push({ id, text, level });
        }
      });
      
      setHeadings(extractedHeadings);
    }
  }, [post]);

  useEffect(() => {
    if (postId) {
      fetchArticle(postId);
    }
  }, [postId, fetchArticle]);

  useEffect(() => {
    if (article) {
      setPost(article);
      
      // Find related posts that share at least one category with the current post
      if (articles.length > 0 && article.categories?.length > 0) {
        const categoryIds = article.categories.map(cat => cat.id);
        
        const related = articles
          .filter(a => a.id !== article.id && a.categories?.some(cat => categoryIds.includes(cat.id)))
          .sort(() => 0.5 - Math.random()) // Random shuffle
          .slice(0, 3); // Get up to 3 related posts
          
        setRelatedPosts(related);
      }
    }
  }, [article, articles]);

  // Share post function
  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.description,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    }
  };

  if (isLoading) {
    return (
      <Container size="3" className="py-20 px-4">
        <Flex direction="column" align="center" gap="4">
          <Heading size="6">加载中...</Heading>
          <Text>正在获取文章内容</Text>
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
            <Button 
              onClick={() => fetchArticle(postId)}
              variant="solid"
              color="blue"
            >
              重试
            </Button>
          </Box>
        </Flex>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container size="3" className="py-20 px-4">
        <Flex direction="column" align="center" gap="4">
          <Heading size="6" className="text-gray-500">未找到文章</Heading>
          <Text>该文章可能已被删除或不存在</Text>
          <Link href="/posts" className="text-blue-600 hover:text-blue-700 font-medium">
            返回文章列表
          </Link>
        </Flex>
      </Container>
    );
  }

  // Format date in a way that avoids hydration mismatch
  const formattedDate = new Date(post.date).toISOString().split('T')[0];

  return (
    <>
      {/* Hero Section with Featured Image */}
      <Box className="relative w-full h-[50vh] min-h-[400px]">
        <Image 
          src={post.image} 
          alt={post.title}
          fill
          priority
          className="object-cover"
        />
        <Box className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <Container size="3" className="relative z-10 pb-12 pt-20 px-4">
            <Box className="mb-4 flex gap-2 flex-wrap">
              {post.categories.map((category, index) => (
                <Badge 
                  key={`hero-category-${category.id || index}`}
                  variant="solid" 
                  radius="full" 
                  className="bg-white/80 text-gray-800 dark:bg-gray-800/80 dark:text-gray-100"
                >
                  {category.name}
                </Badge>
              ))}
            </Box>
            <Heading size="9" className="text-white mb-4 max-w-3xl">
              {post.title}
            </Heading>
            <Flex align="center" gap="3" className="text-white/80">
              <Text size="3">{formattedDate}</Text>
              {post.is_featured && (
                <Badge variant="solid" color="yellow" radius="full">精选</Badge>
              )}
            </Flex>
          </Container>
        </Box>
      </Box>

      {/* Article Content */}
      <Box className="bg-white dark:bg-gray-900">
        <Container size="3" className="px-4 py-12">
          <Flex gap="8">
            {/* Table of Contents */}
            <Box className="w-1/4 hidden lg:block">
              <TableOfContents headings={headings} />
            </Box>
            
            {/* Main Content */}
            <Box className="w-full lg:w-3/4">
              <Card className="p-6 md:p-10">
                {/* Article Description/Summary */}
                <Box className="mb-8">
                  <Text size="5" weight="medium" className="text-gray-700 dark:text-gray-300 italic">
                    {post.description}
                  </Text>
                </Box>

                <Separator size="4" className="my-6" />

                {/* Social Share Buttons */}
                <Flex gap="3" className="mb-6">
                  <Button 
                    size="2" 
                    variant="soft" 
                    color="blue" 
                    className="flex gap-1 items-center"
                    onClick={sharePost}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Z" />
                    </svg>
                    分享
                  </Button>
                </Flex>

                {/* Mobile Table of Contents Toggle */}
                <Box className="lg:hidden mb-6">
                  <details className="border border-gray-200 dark:border-gray-700 rounded-md">
                    <summary className="p-3 text-blue-600 dark:text-blue-400 cursor-pointer font-medium">
                      查看目录
                    </summary>
                    <Box className="p-3 pt-0 border-t border-gray-200 dark:border-gray-700">
                      <Box className="flex flex-col gap-1">
                        {headings.map((heading, index) => (
                          <Link
                            key={`toc-mobile-${heading.id || index}`}
                            href={`#${heading.id}`}
                            className={`
                              text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors
                              py-1 
                              ${heading.level === 2 ? 'pl-0' : ''}
                              ${heading.level === 3 ? 'pl-4' : ''}
                              ${heading.level > 3 ? 'pl-6' : ''}
                            `}
                          >
                            {heading.text}
                          </Link>
                        ))}
                      </Box>
                    </Box>
                  </details>
                </Box>

                {/* Markdown Content */}
                <Box className="prose prose-lg dark:prose-invert max-w-none">
                  <ReactMarkdown
                    rehypePlugins={[rehypeRaw, rehypeSanitize]}
                    remarkPlugins={[remarkGfm]}
                    components={{
                      // Using custom components to apply styles
                      p: ({node, children}) => {
                        // Check if paragraph contains only an image
                        const hasOnlyImg = 
                          node?.children?.length === 1 && 
                          node?.children[0]?.type === 'element' && 
                          node?.children[0]?.tagName === 'img';
                        
                        // If it has only image, don't render paragraph wrapper
                        if (hasOnlyImg) {
                          return <>{children}</>;
                        }
                        
                        return (
                          <p className="my-4 text-gray-700 dark:text-gray-300 leading-relaxed">{children}</p>
                        );
                      },
                      h1: ({children}) => {
                        const id = children?.toString()
                          ?.toLowerCase()
                          ?.replace(/[^a-z0-9\s-]/g, '')
                          ?.replace(/\s+/g, '-') || `heading-${Math.random().toString(36).substring(2, 9)}`;
                        return (
                          <h1 id={id} className="text-3xl font-bold mt-10 mb-6 text-gray-900 dark:text-white">
                            {children}
                          </h1>
                        );
                      },
                      h2: ({children}) => {
                        const id = children?.toString()
                          ?.toLowerCase()
                          ?.replace(/[^a-z0-9\s-]/g, '')
                          ?.replace(/\s+/g, '-') || `heading-${Math.random().toString(36).substring(2, 9)}`;
                        return (
                          <h2 id={id} className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-100">
                            {children}
                          </h2>
                        );
                      },
                      h3: ({children}) => {
                        const id = children?.toString()
                          ?.toLowerCase()
                          ?.replace(/[^a-z0-9\s-]/g, '')
                          ?.replace(/\s+/g, '-') || `heading-${Math.random().toString(36).substring(2, 9)}`;
                        return (
                          <h3 id={id} className="text-xl font-bold mt-6 mb-3 text-gray-800 dark:text-gray-200">
                            {children}
                          </h3>
                        );
                      },
                      ul: ({children}) => (
                        <ul className="list-disc ml-6 my-4 text-gray-700 dark:text-gray-300">{children}</ul>
                      ),
                      ol: ({children}) => (
                        <ol className="list-decimal ml-6 my-4 text-gray-700 dark:text-gray-300">{children}</ol>
                      ),
                      li: ({children}) => (
                        <li className="mb-2 leading-relaxed">{children}</li>
                      ),
                      a: ({href, children}) => (
                        <a href={href} className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">{children}</a>
                      ),
                      blockquote: ({children}) => (
                        <blockquote className="border-l-4 border-blue-500 pl-4 py-1 my-6 italic bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300">{children}</blockquote>
                      ),
                      code: ({className, children}) => {
                        const match = /language-(\w+)/.exec(className || '');
                        const isInline = !className;
                        return isInline ? (
                          <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded font-mono text-sm text-gray-800 dark:text-gray-200">
                            {children}
                          </code>
                        ) : (
                          <pre className="block bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-6 overflow-x-auto">
                            <code className={match ? `language-${match[1]} text-sm font-mono` : 'text-sm font-mono'}>
                              {children}
                            </code>
                          </pre>
                        );
                      },
                      img: ({src, alt}) => (
                        <Box className="my-8">
                          <img src={src} alt={alt || ""} className="rounded-md w-full max-w-3xl mx-auto shadow-md" />
                          {alt && <Text size="1" className="text-center text-gray-500 mt-2 italic">{alt}</Text>}
                        </Box>
                      ),
                      em: ({children}) => (
                        <em className="italic text-gray-700 dark:text-gray-300">{children}</em>
                      ),
                      strong: ({children}) => (
                        <strong className="font-bold text-gray-900 dark:text-white">{children}</strong>
                      ),
                      hr: () => (
                        <hr className="my-8 border-gray-200 dark:border-gray-700" />
                      )
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                </Box>

                {/* Article Tags and Share Again */}
                <Flex justify="between" align="center" className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Flex gap="2" wrap="wrap">
                    {post.categories.map((category, index) => (
                      <Badge
                        key={`footer-category-${category.id || index}`}
                        variant="soft"
                        radius="full"
                      >
                        {category.name}
                      </Badge>
                    ))}
                  </Flex>
                  <Button 
                    size="2" 
                    variant="soft" 
                    color="blue" 
                    className="flex gap-1 items-center"
                    onClick={sharePost}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Z" />
                    </svg>
                    分享
                  </Button>
                </Flex>
              </Card>

              {/* Article Metadata */}
              <Flex justify="between" align="center" className="mt-8">
                <Flex gap="2" align="center">
                  <Text size="2" className="text-gray-500">
                    发布于 {new Date(post.createdAt).toISOString().split('T')[0]}
                  </Text>
                  {post.updatedAt > post.createdAt && (
                    <Text size="2" className="text-gray-500">
                      · 更新于 {new Date(post.updatedAt).toISOString().split('T')[0]}
                    </Text>
                  )}
                </Flex>
                <Link href="/posts" className="text-blue-600 hover:text-blue-700 font-medium">
                  返回文章列表
                </Link>
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Related Articles Section */}
      {relatedPosts.length > 0 && (
        <Box className="bg-gray-50 dark:bg-gray-800">
          <Container size="3" className="px-4 py-12">
            <Heading size="6" className="mb-6">相关文章</Heading>
            
            <Grid columns={{ initial: '1', md: '2', lg: '3' }} gap="6">
              {relatedPosts.map((relatedPost, index) => (
                <Card key={`related-${relatedPost.id || index}`} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <Box className="aspect-[16/9] relative">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      className="object-cover"
                    />
                  </Box>
                  <Box className="p-5">
                    <Text size="2" className="text-gray-500 dark:text-gray-400 mb-2">
                      {new Date(relatedPost.date).toISOString().split('T')[0]}
                    </Text>
                    <Heading size="4" className="mb-2 line-clamp-2">
                      <Link href={`/posts/${relatedPost.id}`} className="hover:text-blue-600 transition-colors">
                        {relatedPost.title}
                      </Link>
                    </Heading>
                    <Text className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {relatedPost.description}
                    </Text>
                    <Link 
                      href={`/posts/${relatedPost.id}`} 
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center gap-1"
                    >
                      阅读全文 &rarr;
                    </Link>
                  </Box>
                </Card>
              ))}
            </Grid>
            
            <Box className="mt-8 text-center">
              <Link href="/posts" className="text-blue-600 hover:text-blue-700 font-medium">
                查看更多文章 &rarr;
              </Link>
            </Box>
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
              <Link href="/posts" className="text-gray-600 hover:text-blue-600 transition-colors">文章</Link>
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