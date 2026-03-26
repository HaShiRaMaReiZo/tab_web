'use client';

import { use } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BookCard } from '@/components/book-card';
import { CartProvider } from '@/lib/cart-context';
import { categories, allBooks } from '@/lib/data';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{ id: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { id } = use(params);
  const category = categories.find((c) => c.id === id);
  const categoryBooks = allBooks.filter(
    (book) => category && book.category === category.name
  );

  if (!category) {
    return (
      <CartProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <h1 className="mb-2 text-2xl font-bold">Category Not Found</h1>
              <p className="text-muted-foreground">
                The category you&apos;re looking for doesn&apos;t exist.
              </p>
              <Link
                href="/categories"
                className="mt-4 inline-block text-primary hover:underline"
              >
                Browse all categories
              </Link>
            </div>
          </main>
          <Footer />
        </div>
      </CartProvider>
    );
  }

  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 py-6">
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="flex items-center hover:text-primary">
                <Home className="h-4 w-4" />
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/categories" className="hover:text-primary">
                Categories
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{category.name}</span>
            </nav>

            {/* Category Header */}
            <div className="mb-8">
              <h1 className="mb-2 text-3xl font-bold text-foreground">
                {category.name}
              </h1>
              {category.nameMyanmar && (
                <p className="mb-2 text-lg text-muted-foreground">
                  {category.nameMyanmar}
                </p>
              )}
              <p className="text-muted-foreground">
                {category.bookCount.toLocaleString()} books available in this
                category
              </p>
            </div>

            {/* Books Grid */}
            {categoryBooks.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {categoryBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-border bg-card p-12 text-center">
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  No books in this category yet
                </h3>
                <p className="text-muted-foreground">
                  Check back soon for new additions!
                </p>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
