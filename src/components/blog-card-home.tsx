import React from 'react'
import Image from 'next/image'
import { Card, Text, Box, Flex, Heading, Badge, Link } from '@radix-ui/themes';
import { Article } from '@/models';


function BlogCardHome({ post }: { post: Article }) {
  return (
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
          {post.categories && post.categories.length > 0 && (
            <Badge variant="soft" radius="full">
              {post.categories[0].name}
            </Badge>
          )}
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
  )
}

export { BlogCardHome }
