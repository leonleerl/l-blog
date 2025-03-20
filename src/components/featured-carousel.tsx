'use client';

import React, { useEffect, useState } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { FeaturedCard } from './featured-card';
import { Article } from '@/models';
import { Box, Container, Heading } from '@radix-ui/themes';

interface FeaturedCarouselProps {
  featuredPosts: Article[];
}

export function FeaturedCarousel({ featuredPosts }: FeaturedCarouselProps) {
  const [mounted, setMounted] = useState(false);

  // To prevent hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !featuredPosts.length) return null;

  return (
    <Container size="3" className="px-4 py-16">
      <Heading size="6" className="mb-6">精选文章</Heading>
      <Carousel className="w-full">
        <CarouselContent>
          {featuredPosts.map((post) => (
            <CarouselItem key={post.id}>
              <FeaturedCard post={post} hideHeading />
            </CarouselItem>
          ))}
        </CarouselContent>
        <Box className="flex justify-center gap-2 mt-4">
          <CarouselPrevious className="relative static sm:absolute left-0 top-1/2" />
          <CarouselNext className="relative static sm:absolute right-0 top-1/2" />
        </Box>
      </Carousel>
    </Container>
  );
} 