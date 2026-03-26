'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BookSection } from '@/components/book-section';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CartProvider, useCart } from '@/lib/cart-context';
import { allBooks, formatPrice, featuredBooks } from '@/lib/data';
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  ChevronRight,
  Home,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  Check,
} from 'lucide-react';

interface BookPageProps {
  params: Promise<{ id: string }>;
}

function BookDetailContent({ bookId }: { bookId: string }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const book = allBooks.find((b) => b.id === bookId);
  const relatedBooks = featuredBooks.filter(
    (b) => b.id !== bookId && b.category === book?.category
  );

  if (!book) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="mb-2 text-2xl font-bold">Book Not Found</h1>
            <p className="text-muted-foreground">
              The book you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/"
              className="mt-4 inline-block text-primary hover:underline"
            >
              Back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const discount = book.originalPrice
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(book);
    }
  };

  return (
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
            <Link
              href={`/search?category=${encodeURIComponent(book.category)}`}
              className="hover:text-primary"
            >
              {book.category}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="line-clamp-1 text-foreground">{book.title}</span>
          </nav>

          {/* Book Details */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Book Image */}
            <div className="relative">
              <div className="sticky top-24">
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  {discount > 0 && (
                    <Badge className="absolute right-4 top-4 bg-destructive text-destructive-foreground text-lg px-3 py-1">
                      -{discount}%
                    </Badge>
                  )}
                  {book.isNew && (
                    <Badge className="absolute left-4 top-4 bg-secondary text-secondary-foreground">
                      New
                    </Badge>
                  )}
                  {book.isBestseller && !book.isNew && (
                    <Badge className="absolute left-4 top-4 bg-primary text-primary-foreground">
                      Bestseller
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Book Info */}
            <div>
              <h1 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
                {book.title}
              </h1>
              <p className="mb-4 text-lg text-muted-foreground">
                by{' '}
                <Link
                  href={`/search?author=${encodeURIComponent(book.author)}`}
                  className="text-primary hover:underline"
                >
                  {book.author}
                </Link>
              </p>

              {/* Rating */}
              <div className="mb-4 flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(book.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-muted text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium text-foreground">{book.rating}</span>
                <span className="text-muted-foreground">
                  ({book.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6 rounded-lg bg-muted/50 p-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-primary">
                    {formatPrice(book.price)}
                  </span>
                  {book.originalPrice && (
                    <>
                      <span className="text-lg text-muted-foreground line-through">
                        {formatPrice(book.originalPrice)}
                      </span>
                      <Badge variant="secondary" className="bg-secondary/20 text-secondary">
                        Save {formatPrice(book.originalPrice - book.price)}
                      </Badge>
                    </>
                  )}
                </div>
                <p className="mt-2 flex items-center gap-2 text-sm text-secondary">
                  <Check className="h-4 w-4" />
                  In Stock - Ready to Ship
                </p>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="mb-6 flex flex-wrap items-center gap-4">
                <div className="flex items-center rounded-lg border border-border">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-12 w-12 items-center justify-center text-foreground hover:bg-muted"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="flex h-12 w-12 items-center justify-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex h-12 w-12 items-center justify-center text-foreground hover:bg-muted"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <Button
                  size="lg"
                  className="flex-1 h-12 bg-secondary hover:bg-secondary/90"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant={isWishlisted ? 'default' : 'outline'}
                  className={`h-12 ${isWishlisted ? 'bg-destructive hover:bg-destructive/90' : ''}`}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart
                    className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`}
                  />
                </Button>
                <Button size="lg" variant="outline" className="h-12">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Features */}
              <div className="mb-6 grid gap-3 sm:grid-cols-3">
                <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <Truck className="h-5 w-5 text-secondary" />
                  <div>
                    <p className="text-sm font-medium">Free Delivery</p>
                    <p className="text-xs text-muted-foreground">
                      Orders over 50,000 Ks
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <Shield className="h-5 w-5 text-secondary" />
                  <div>
                    <p className="text-sm font-medium">Secure Payment</p>
                    <p className="text-xs text-muted-foreground">
                      100% secure
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <RotateCcw className="h-5 w-5 text-secondary" />
                  <div>
                    <p className="text-sm font-medium">Easy Returns</p>
                    <p className="text-xs text-muted-foreground">
                      7 day return policy
                    </p>
                  </div>
                </div>
              </div>

              {/* Book Details */}
              <div className="rounded-lg border border-border">
                <h2 className="border-b border-border p-4 font-semibold text-foreground">
                  Book Details
                </h2>
                <div className="p-4">
                  <dl className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm text-muted-foreground">Category</dt>
                      <dd className="font-medium text-foreground">
                        {book.category}
                      </dd>
                    </div>
                    {book.publisher && (
                      <div>
                        <dt className="text-sm text-muted-foreground">
                          Publisher
                        </dt>
                        <dd className="font-medium text-foreground">
                          {book.publisher}
                        </dd>
                      </div>
                    )}
                    {book.isbn && (
                      <div>
                        <dt className="text-sm text-muted-foreground">ISBN</dt>
                        <dd className="font-medium text-foreground">
                          {book.isbn}
                        </dd>
                      </div>
                    )}
                    {book.pages && (
                      <div>
                        <dt className="text-sm text-muted-foreground">Pages</dt>
                        <dd className="font-medium text-foreground">
                          {book.pages}
                        </dd>
                      </div>
                    )}
                    {book.language && (
                      <div>
                        <dt className="text-sm text-muted-foreground">
                          Language
                        </dt>
                        <dd className="font-medium text-foreground">
                          {book.language}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>

              {/* Description */}
              {book.description && (
                <div className="mt-6">
                  <h2 className="mb-3 font-semibold text-foreground">
                    About this book
                  </h2>
                  <p className="leading-relaxed text-muted-foreground">
                    {book.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Related Books */}
          {relatedBooks.length > 0 && (
            <BookSection
              title="Related Books"
              subtitle={`More books in ${book.category}`}
              books={relatedBooks}
              viewAllLink={`/search?category=${encodeURIComponent(book.category)}`}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function BookPage({ params }: BookPageProps) {
  const { id } = use(params);
  return (
    <CartProvider>
      <BookDetailContent bookId={id} />
    </CartProvider>
  );
}
