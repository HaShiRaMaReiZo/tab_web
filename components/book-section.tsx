'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookCard } from '@/components/book-card';
import { Book } from '@/lib/types';

interface BookSectionProps {
  title: string;
  subtitle?: string;
  books: Book[];
  viewAllLink?: string;
  variant?: 'carousel' | 'grid';
}

export function BookSection({
  title,
  subtitle,
  books,
  viewAllLink,
  variant = 'carousel',
}: BookSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (variant === 'grid') {
    return (
      <section className="py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{title}</h2>
            {subtitle && <p className="mt-1 text-muted-foreground">{subtitle}</p>}
          </div>
          {viewAllLink && (
            <Link href={viewAllLink}>
              <Button variant="ghost" className="gap-1 text-primary">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          {subtitle && <p className="mt-1 text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('left')}
            className="hidden h-9 w-9 sm:flex"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('right')}
            className="hidden h-9 w-9 sm:flex"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
          {viewAllLink && (
            <Link href={viewAllLink}>
              <Button variant="ghost" className="gap-1 text-primary">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="scrollbar-hide flex gap-4 overflow-x-auto pb-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {books.map((book) => (
            <div
              key={book.id}
              className="w-[180px] flex-shrink-0 sm:w-[200px] lg:w-[220px]"
              style={{ scrollSnapAlign: 'start' }}
            >
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
