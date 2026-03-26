'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Book } from '@/lib/types';
import { formatPrice } from '@/lib/data';
import { useCart } from '@/lib/cart-context';

interface BookCardProps {
  book: Book;
  variant?: 'default' | 'compact' | 'horizontal';
}

export function BookCard({ book, variant = 'default' }: BookCardProps) {
  const { addItem } = useCart();
  const discount = book.originalPrice
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(book);
  };

  if (variant === 'horizontal') {
    return (
      <Card className="overflow-hidden transition-shadow hover:shadow-lg">
        <Link href={`/book/${book.id}`} className="flex">
          <div className="relative h-48 w-32 shrink-0 bg-muted">
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              className="object-cover"
              sizes="128px"
            />
            {book.isNew && (
              <Badge className="absolute left-2 top-2 bg-secondary text-secondary-foreground">
                New
              </Badge>
            )}
            {book.isBestseller && (
              <Badge className="absolute left-2 top-2 bg-primary text-primary-foreground">
                Bestseller
              </Badge>
            )}
          </div>
          <CardContent className="flex flex-1 flex-col justify-between p-4">
            <div>
              <h3 className="mb-1 line-clamp-2 font-semibold text-foreground">{book.title}</h3>
              <p className="mb-2 text-sm text-muted-foreground">by {book.author}</p>
              <div className="mb-2 flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(book.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-muted text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({book.reviewCount})</span>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-lg font-bold text-primary">{formatPrice(book.price)}</p>
                {book.originalPrice && (
                  <p className="text-sm text-muted-foreground line-through">
                    {formatPrice(book.originalPrice)}
                  </p>
                )}
              </div>
              <Button size="sm" onClick={handleAddToCart} className="bg-secondary hover:bg-secondary/90">
                <ShoppingCart className="mr-1 h-4 w-4" />
                Add
              </Button>
            </div>
          </CardContent>
        </Link>
      </Card>
    );
  }

  if (variant === 'compact') {
    return (
      <Link href={`/book/${book.id}`} className="group block">
        <Card className="overflow-hidden transition-shadow hover:shadow-lg">
          <div className="relative aspect-[3/4] bg-muted">
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
            />
          </div>
          <CardContent className="p-3">
            <h3 className="line-clamp-1 text-sm font-medium">{book.title}</h3>
            <p className="text-sm font-bold text-primary">{formatPrice(book.price)}</p>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/book/${book.id}`} className="group block">
      <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
        <div className="relative aspect-[3/4] bg-muted">
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 250px"
          />
          {discount > 0 && (
            <Badge className="absolute right-2 top-2 bg-destructive text-destructive-foreground">
              -{discount}%
            </Badge>
          )}
          {book.isNew && (
            <Badge className="absolute left-2 top-2 bg-secondary text-secondary-foreground">
              New
            </Badge>
          )}
          {book.isBestseller && !book.isNew && (
            <Badge className="absolute left-2 top-2 bg-primary text-primary-foreground">
              Bestseller
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="mb-1 line-clamp-2 min-h-[2.5rem] font-semibold text-foreground group-hover:text-primary">
            {book.title}
          </h3>
          <p className="mb-2 text-sm text-muted-foreground">by {book.author}</p>
          <div className="mb-3 flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(book.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'fill-muted text-muted'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({book.reviewCount})</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-lg font-bold text-primary">{formatPrice(book.price)}</p>
              {book.originalPrice && (
                <p className="text-sm text-muted-foreground line-through">
                  {formatPrice(book.originalPrice)}
                </p>
              )}
            </div>
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="bg-secondary hover:bg-secondary/90"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="sr-only">Add to cart</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
