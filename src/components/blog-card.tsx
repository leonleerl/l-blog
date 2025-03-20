import React from 'react'
import { Article } from '@/models'
import Image from 'next/image'
import { Card, Text, Box, Heading, Badge, Link } from '@radix-ui/themes';


function BlogCard({post}: {post: Article}) {
  return (
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
  )
}

export {BlogCard}
