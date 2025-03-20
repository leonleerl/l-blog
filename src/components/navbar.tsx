import React from 'react'
import { Text, Box, Flex, Link } from '@radix-ui/themes';

function Navbar() {
  return (
    <Box
    className="fixed top-0 left-0 right-0 backdrop-blur-md bg-white/70 dark:bg-gray-800/70 shadow-sm z-10"
  >
    <Flex
      justify="between"
      align="center"
      className="container mx-auto px-4 py-4"
    >
      <Text size="6" weight="bold">
        我的博客
      </Text>
      <Flex gap="6">
        <Link href="/">
          <Text className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            首页
          </Text>
        </Link>
        <Link href="/about">
          <Text className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            关于我
          </Text>
        </Link>
        <Link href="/contact">
          <Text className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            联系方式
          </Text>
        </Link>
      </Flex>
    </Flex>
  </Box>
  )
}

export { Navbar };