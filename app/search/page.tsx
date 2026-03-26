'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BookCard } from '@/components/book-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CartProvider } from '@/lib/cart-context';
import { searchBooks, categories } from '@/lib/data';
import { Book } from '@/lib/types';
import { Search, SlidersHorizontal, Grid, List, X } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialType = searchParams.get('type') || 'all';
  
  const [query, setQuery] = useState(initialQuery);
  const [searchType, setSearchType] = useState(initialType);
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [results, setResults] = useState<Book[]>([]);

  useEffect(() => {
    const filtered = searchBooks({
      query: query,
      category: category || undefined,
      sortBy: sortBy,
    });
    setResults(filtered);
  }, [query, category, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = searchBooks({
      query: query,
      category: category || undefined,
      sortBy: sortBy,
    });
    setResults(filtered);
  };

  const clearFilters = () => {
    setQuery('');
    setCategory('');
    setSortBy('relevance');
    setSearchType('all');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-6">
          {/* Search Header */}
          <div className="mb-6">
            <h1 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
              {initialQuery ? `Search results for "${initialQuery}"` : 'Search Books'}
            </h1>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by book name, author, or keyword..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-12 pl-10 text-base"
                />
              </div>
              <Select value={searchType} onValueChange={setSearchType}>
                <SelectTrigger className="h-12 w-full sm:w-40">
                  <SelectValue placeholder="Search in" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Fields</SelectItem>
                  <SelectItem value="title">Book Name</SelectItem>
                  <SelectItem value="author">Author</SelectItem>
                  <SelectItem value="publisher">Publisher</SelectItem>
                  <SelectItem value="isbn">ISBN</SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit" className="h-12 px-6">
                Search
              </Button>
            </form>
          </div>

          {/* Filters and Results */}
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Sidebar Filters */}
            <aside
              className={`${
                showFilters ? 'block' : 'hidden'
              } w-full shrink-0 lg:block lg:w-64`}
            >
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-semibold text-foreground">Filters</h2>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                </div>

                {/* Category Filter */}
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Category
                  </label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.name}>
                          {cat.name} ({cat.bookCount.toLocaleString()})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort By */}
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Sort By
                  </label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Active Filters */}
                {(query || category) && (
                  <div className="border-t border-border pt-4">
                    <h3 className="mb-2 text-sm font-medium text-foreground">
                      Active Filters
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {query && (
                        <span className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                          {query}
                          <button onClick={() => setQuery('')}>
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      )}
                      {category && (
                        <span className="flex items-center gap-1 rounded-full bg-secondary/10 px-3 py-1 text-sm text-secondary">
                          {category}
                          <button onClick={() => setCategory('')}>
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </aside>

            {/* Results */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-muted-foreground">
                  {results.length} {results.length === 1 ? 'book' : 'books'} found
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                  <div className="flex rounded-md border border-border">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      className="rounded-r-none"
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      className="rounded-l-none"
                      onClick={() => setViewMode('list')}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Results Grid/List */}
              {results.length > 0 ? (
                viewMode === 'grid' ? (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {results.map((book) => (
                      <BookCard key={book.id} book={book} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {results.map((book) => (
                      <BookCard key={book.id} book={book} variant="horizontal" />
                    ))}
                  </div>
                )
              ) : (
                <div className="rounded-lg border border-border bg-card p-12 text-center">
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    No books found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search terms or filters
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <CartProvider>
      <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
        <SearchContent />
      </Suspense>
    </CartProvider>
  );
}
