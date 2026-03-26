'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { categories } from '@/lib/data';
import { hierarchicalCategories } from '@/lib/hierarchical-categories';
import { useCart } from '@/lib/cart-context';
import { CategoryMegaMenu } from '@/components/category-mega-menu';
import { MobileCategoryMenu } from '@/components/mobile-category-menu';

const searchTypes = [
  { value: 'all', label: 'All' },
  { value: 'title', label: 'Book Name' },
  { value: 'author', label: 'Author' },
  { value: 'category', label: 'Category' },
  { value: 'publisher', label: 'Publisher' },
  { value: 'isbn', label: 'ISBN' },
];

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { items } = useCart();

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}&type=${searchType}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <span>Welcome to TAB Book Centre Online Store</span>
            <div className="hidden items-center gap-4 md:flex">
              <Link href="/help" className="hover:underline">Help</Link>
              <Link href="/stores" className="hover:underline">Store Locations</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-card border-b border-border shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link href="/" className="flex shrink-0 items-center">
              <Image
                src="/logo.png"
                alt="TAB Book Centre"
                width={140}
                height={60}
                className="h-12 w-auto sm:h-14"
                priority
              />
            </Link>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="flex flex-1 items-center gap-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-11 rounded-r-none border-r-0 bg-muted px-3 text-sm font-medium"
                  >
                    {searchTypes.find(t => t.value === searchType)?.label}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-40">
                  {searchTypes.map((type) => (
                    <DropdownMenuItem
                      key={type.value}
                      onClick={() => setSearchType(type.value)}
                      className="cursor-pointer"
                    >
                      {type.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Input
                type="search"
                placeholder="Search books, authors, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 flex-1 rounded-none border-x-0 text-base focus-visible:ring-0"
              />
              <Button
                type="submit"
                className="h-11 rounded-l-none bg-secondary px-4 hover:bg-secondary/90"
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            </form>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <Link href="/account">
                <Button variant="ghost" size="icon" className="hidden h-11 w-11 sm:flex">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Button>
              </Link>
              <Link href="/cart" className="relative">
                <Button variant="ghost" size="icon" className="h-11 w-11">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
                      {cartItemCount}
                    </span>
                  )}
                  <span className="sr-only">Cart ({cartItemCount} items)</span>
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="h-11 w-11 md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Category navigation */}
        <nav className="hidden border-t border-border bg-muted/50 md:block">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex items-center gap-1 overflow-x-auto py-2">
              {/* Mega Menu for All Categories */}
              <CategoryMegaMenu />
              
              {/* Quick access to main categories */}
              {hierarchicalCategories.slice(0, 6).map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="whitespace-nowrap rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border bg-card md:hidden">
            <div className="px-4 py-4">
              <div className="mb-4 flex flex-col gap-2">
                <Link 
                  href="/account" 
                  className="flex items-center gap-2 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  My Account
                </Link>
                <Link 
                  href="/help" 
                  className="py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Help Center
                </Link>
                <Link 
                  href="/stores" 
                  className="py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Store Locations
                </Link>
              </div>
              <div className="border-t border-border pt-4">
                <h3 className="mb-3 font-semibold">Browse Categories</h3>
                <MobileCategoryMenu onNavigate={() => setMobileMenuOpen(false)} />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
