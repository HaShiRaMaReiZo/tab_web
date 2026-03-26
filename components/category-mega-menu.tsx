'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { hierarchicalCategories, searchCategories } from '@/lib/hierarchical-categories';
import type { HierarchicalCategory, SubCategory, SubSubCategory } from '@/lib/types';

interface CategoryMegaMenuProps {
  className?: string;
}

export function CategoryMegaMenu({ className }: CategoryMegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMainCategory, setActiveMainCategory] = useState<HierarchicalCategory | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<SubCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveMainCategory(null);
        setActiveSubCategory(null);
        setSearchQuery('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setActiveMainCategory(null);
        setActiveSubCategory(null);
        setSearchQuery('');
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMainCategoryHover = (category: HierarchicalCategory) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMainCategory(category);
    setActiveSubCategory(null);
  };

  const handleSubCategoryHover = (subCategory: SubCategory) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveSubCategory(subCategory);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      // Don't clear if still hovering over menu
    }, 150);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    setActiveMainCategory(null);
    setActiveSubCategory(null);
    setSearchQuery('');
  };

  const searchResults = searchQuery.length >= 2 ? searchCategories(searchQuery) : null;
  const hasSearchResults = searchResults && (
    searchResults.mainCategories.length > 0 ||
    searchResults.subCategories.length > 0 ||
    searchResults.subSubCategories.length > 0
  );

  return (
    <div ref={menuRef} className={cn('relative', className)}>
      {/* Trigger Button */}
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
          isOpen
            ? 'bg-primary text-primary-foreground'
            : 'text-foreground hover:bg-primary hover:text-primary-foreground'
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        <span>All Categories</span>
      </Button>

      {/* Mega Menu Panel */}
      {isOpen && (
        <div 
          className="absolute left-0 top-full z-50 mt-1 flex min-h-[400px] w-[900px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-lg border border-border bg-card shadow-xl"
          onMouseLeave={handleMouseLeave}
        >
          {/* Search + Main Categories Column */}
          <div className="flex w-[280px] flex-col border-r border-border bg-muted/30">
            {/* Search Box */}
            <div className="border-b border-border p-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 pl-9 text-sm"
                />
              </div>
            </div>

            {/* Search Results or Main Categories */}
            <ScrollArea className="flex-1">
              {searchQuery.length >= 2 ? (
                // Search Results
                <div className="p-2">
                  {!hasSearchResults ? (
                    <p className="px-3 py-4 text-center text-sm text-muted-foreground">
                      No categories found for &quot;{searchQuery}&quot;
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {searchResults?.mainCategories.length > 0 && (
                        <div>
                          <p className="mb-2 px-3 text-xs font-semibold uppercase text-muted-foreground">
                            Main Categories
                          </p>
                          {searchResults.mainCategories.map((cat) => (
                            <Link
                              key={cat.id}
                              href={`/category/${cat.id}`}
                              onClick={handleLinkClick}
                              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                            >
                              <span className="font-medium">{cat.name}</span>
                              {cat.nameMyanmar && cat.nameMyanmar !== cat.name && (
                                <span className="text-xs text-muted-foreground">({cat.nameMyanmar})</span>
                              )}
                            </Link>
                          ))}
                        </div>
                      )}
                      {searchResults?.subCategories.length > 0 && (
                        <div>
                          <p className="mb-2 px-3 text-xs font-semibold uppercase text-muted-foreground">
                            Sub Categories
                          </p>
                          {searchResults.subCategories.slice(0, 10).map(({ parent, sub }) => (
                            <Link
                              key={sub.id}
                              href={`/category/${sub.id}`}
                              onClick={handleLinkClick}
                              className="flex flex-col rounded-md px-3 py-2 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                            >
                              <span className="font-medium">{sub.name}</span>
                              <span className="text-xs text-muted-foreground">in {parent.name}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                      {searchResults?.subSubCategories.length > 0 && (
                        <div>
                          <p className="mb-2 px-3 text-xs font-semibold uppercase text-muted-foreground">
                            Sub-Sub Categories
                          </p>
                          {searchResults.subSubCategories.slice(0, 15).map(({ mainParent, subParent, subSub }) => (
                            <Link
                              key={subSub.id}
                              href={`/category/${subSub.id}`}
                              onClick={handleLinkClick}
                              className="flex flex-col rounded-md px-3 py-2 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                            >
                              <span className="font-medium">{subSub.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {subParent.name} › {mainParent.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                // Main Categories List
                <div className="py-2">
                  {hierarchicalCategories.map((category) => (
                    <button
                      key={category.id}
                      onMouseEnter={() => handleMainCategoryHover(category)}
                      onClick={() => handleMainCategoryHover(category)}
                      className={cn(
                        'flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors',
                        activeMainCategory?.id === category.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      )}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-medium">{category.name}</div>
                        {category.nameMyanmar && category.nameMyanmar !== category.name && (
                          <div className={cn(
                            'truncate text-xs',
                            activeMainCategory?.id === category.id 
                              ? 'text-primary-foreground/80' 
                              : 'text-muted-foreground'
                          )}>
                            {category.nameMyanmar}
                          </div>
                        )}
                      </div>
                      {category.subCategories && category.subCategories.length > 0 && (
                        <ChevronRight className={cn(
                          'ml-2 h-4 w-4 flex-shrink-0',
                          activeMainCategory?.id === category.id 
                            ? 'text-primary-foreground' 
                            : 'text-muted-foreground'
                        )} />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>

          {/* Sub Categories Column */}
          {!searchQuery && activeMainCategory && activeMainCategory.subCategories && activeMainCategory.subCategories.length > 0 && (
            <div className="flex w-[280px] flex-col border-r border-border">
              <div className="border-b border-border bg-muted/50 px-4 py-3">
                <Link
                  href={`/category/${activeMainCategory.id}`}
                  onClick={handleLinkClick}
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  View All {activeMainCategory.name}
                </Link>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {activeMainCategory.bookCount.toLocaleString()} items
                </p>
              </div>
              <ScrollArea className="flex-1">
                <div className="py-2">
                  {activeMainCategory.subCategories.map((subCategory) => (
                    <button
                      key={subCategory.id}
                      onMouseEnter={() => handleSubCategoryHover(subCategory)}
                      onClick={() => handleSubCategoryHover(subCategory)}
                      className={cn(
                        'flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors',
                        activeSubCategory?.id === subCategory.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      )}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-medium">{subCategory.name}</div>
                        {subCategory.nameMyanmar && subCategory.nameMyanmar !== subCategory.name && (
                          <div className={cn(
                            'truncate text-xs',
                            activeSubCategory?.id === subCategory.id 
                              ? 'text-primary-foreground/80' 
                              : 'text-muted-foreground'
                          )}>
                            {subCategory.nameMyanmar}
                          </div>
                        )}
                      </div>
                      {subCategory.subSubCategories && subCategory.subSubCategories.length > 0 && (
                        <ChevronRight className={cn(
                          'ml-2 h-4 w-4 flex-shrink-0',
                          activeSubCategory?.id === subCategory.id 
                            ? 'text-primary-foreground' 
                            : 'text-muted-foreground'
                        )} />
                      )}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {/* Sub-Sub Categories Column */}
          {!searchQuery && activeSubCategory && activeSubCategory.subSubCategories && activeSubCategory.subSubCategories.length > 0 && (
            <div className="flex flex-1 flex-col">
              <div className="border-b border-border bg-muted/50 px-4 py-3">
                <Link
                  href={`/category/${activeSubCategory.id}`}
                  onClick={handleLinkClick}
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  View All {activeSubCategory.name}
                </Link>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {activeSubCategory.bookCount.toLocaleString()} items
                </p>
              </div>
              <ScrollArea className="flex-1">
                <div className="grid grid-cols-2 gap-1 p-3">
                  {activeSubCategory.subSubCategories.map((subSubCategory) => (
                    <Link
                      key={subSubCategory.id}
                      href={`/category/${subSubCategory.id}`}
                      onClick={handleLinkClick}
                      className="flex flex-col rounded-md px-3 py-2 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      <span className="font-medium">{subSubCategory.name}</span>
                      {subSubCategory.nameMyanmar && subSubCategory.nameMyanmar !== subSubCategory.name && (
                        <span className="text-xs text-muted-foreground group-hover:text-primary-foreground/80">
                          {subSubCategory.nameMyanmar}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {subSubCategory.bookCount.toLocaleString()} items
                      </span>
                    </Link>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {/* Empty State for Sub Categories */}
          {!searchQuery && activeMainCategory && (!activeMainCategory.subCategories || activeMainCategory.subCategories.length === 0) && (
            <div className="flex flex-1 items-center justify-center p-8">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">No subcategories available</p>
                <Link
                  href={`/category/${activeMainCategory.id}`}
                  onClick={handleLinkClick}
                  className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
                >
                  Browse {activeMainCategory.name}
                </Link>
              </div>
            </div>
          )}

          {/* Empty State for Sub-Sub Categories */}
          {!searchQuery && activeSubCategory && (!activeSubCategory.subSubCategories || activeSubCategory.subSubCategories.length === 0) && (
            <div className="flex flex-1 items-center justify-center p-8">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">No sub-subcategories available</p>
                <Link
                  href={`/category/${activeSubCategory.id}`}
                  onClick={handleLinkClick}
                  className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
                >
                  Browse {activeSubCategory.name}
                </Link>
              </div>
            </div>
          )}

          {/* Default Empty State */}
          {!searchQuery && !activeMainCategory && (
            <div className="flex flex-1 items-center justify-center p-8">
              <div className="text-center">
                <p className="mb-2 text-lg font-medium text-foreground">Browse Categories</p>
                <p className="text-sm text-muted-foreground">
                  Hover over a category to see subcategories
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
