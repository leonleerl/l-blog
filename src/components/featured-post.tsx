import React from 'react'
import Image from 'next/image'
import { Card, Text, Box, Flex, Heading, Badge, Container,Link } from '@radix-ui/themes';
import { Article } from '@/models';

function FeaturedPost({post}: {post: Article}) {
  return (
    <Container size="3" className="px-4 py-16">
    <Heading size="6" className="mb-6">精选文章</Heading>
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Flex direction={{ initial: 'column', md: 'row' }} className="h-full">
        <Box className="md:w-1/2 relative" style={{ minHeight: '400px' }}>
          <Image 
            src={post.image} 
            alt={post.title}
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
              <Badge variant="soft" radius="full">{post.category}</Badge>
              <Text size="2" className="text-gray-400">
                {new Date(post.date).toLocaleDateString()}
              </Text>
            </Flex>
            <Heading size="6" className="mb-4">
              <Link href={`/posts/${post.id}`} className="hover:text-blue-600 transition-colors">
                {post.title}
              </Link>
            </Heading>
            <Text className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
              {post.description}
            </Text>
          </Box>
          <Link 
            href={`/posts/${post.id}`} 
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            阅读更多 &rarr;
          </Link>
        </Flex>
      </Flex>
    </Card>
  </Container>
  )
}

export {FeaturedPost}
