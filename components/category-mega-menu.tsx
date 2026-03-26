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
  const [hoveredMain, setHoveredMain] = useState<HierarchicalCategory | null>(null);
  const [selectedSub, setSelectedSub] = useState<SubCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        resetHoverState();
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
        resetHoverState();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const resetHoverState = () => {
    setHoveredMain(null);
    setSelectedSub(null);
  };

  const handleMainCategoryHover = (category: HierarchicalCategory) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoveredMain(category);
    setSelectedSub(null);
  };

  const handleSubCategoryHover = (subCategory: SubCategory) => {
    setSelectedSub(subCategory);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    setSearchQuery('');
    resetHoverState();
  };

  const searchResults = searchQuery.length >= 2 ? searchCategories(searchQuery) : null;
  const hasSearchResults = searchResults && (
    searchResults.mainCategories.length > 0 ||
    searchResults.subCategories.length > 0 ||
    searchResults.subSubCategories.length > 0
  );

  // Calculate total categories
  const totalSubSub = hierarchicalCategories.reduce((acc, main) => {
    return acc + (main.subCategories?.reduce((subAcc, sub) => {
      return subAcc + (sub.subSubCategories?.length || 0);
    }, 0) || 0);
  }, 0);

  return (
    <div ref={menuRef} className={cn('relative', className)}>
      {/* Trigger Button */}
      <Button
        variant="ghost"
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) resetHoverState();
        }}
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

      {/* Multi-Column Flyout Menu */}
      {isOpen && (
        <div 
          className="absolute left-0 top-full z-50 mt-1 overflow-hidden rounded-lg border border-border bg-card shadow-xl"
        >
          {/* Header with Search */}
          <div className="border-b border-border bg-muted/30 p-3">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Browse Categories</h3>
                <p className="text-xs text-muted-foreground">
                  {hierarchicalCategories.length} main categories, {totalSubSub} sub-categories
                </p>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search all categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 w-72 pl-9 text-sm"
              />
            </div>
          </div>

          {/* Content Area */}
          {searchQuery.length >= 2 ? (
            // Search Results
            <SearchResults 
              searchResults={searchResults}
              hasSearchResults={hasSearchResults}
              searchQuery={searchQuery}
              onLinkClick={handleLinkClick}
            />
          ) : (
            // Hover-based Multi-Column Navigation
            <div className="flex">
              {/* Column 1: Main Categories */}
              <div className="w-56 border-r border-border bg-muted/20">
                <ScrollArea className="h-[420px]">
                  <div className="p-2">
                    {hierarchicalCategories.map((category) => (
                      <MainCategoryItem
                        key={category.id}
                        category={category}
                        isHovered={hoveredMain?.id === category.id}
                        onHover={() => handleMainCategoryHover(category)}
                        onLinkClick={handleLinkClick}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Column 2: Sub Categories (appears on main category hover) */}
              {hoveredMain && hoveredMain.subCategories && hoveredMain.subCategories.length > 0 && (
                <div className="w-64 border-r border-border bg-card">
                  <div className="border-b border-border bg-muted/30 px-3 py-2">
                    <p className="text-xs font-semibold text-muted-foreground">
                      {hoveredMain.name}
                    </p>
                  </div>
                  <ScrollArea className="h-[388px]">
                    <div className="p-2">
                      {hoveredMain.subCategories.map((subCategory) => (
                        <SubCategoryItem
                          key={subCategory.id}
                          subCategory={subCategory}
                          isSelected={selectedSub?.id === subCategory.id}
                          onHover={() => handleSubCategoryHover(subCategory)}
                          onLinkClick={handleLinkClick}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}

              {/* Column 3: Sub-Sub Categories (appears on sub category select) */}
              {selectedSub && selectedSub.subSubCategories && selectedSub.subSubCategories.length > 0 && (
                <div className="w-72 bg-card">
                  <div className="border-b border-border bg-muted/30 px-3 py-2">
                    <p className="text-xs font-semibold text-muted-foreground">
                      {selectedSub.name}
                    </p>
                  </div>
                  <ScrollArea className="h-[388px]">
                    <div className="grid grid-cols-1 gap-1 p-2">
                      {selectedSub.subSubCategories.map((subSubCategory) => (
                        <SubSubCategoryItem
                          key={subSubCategory.id}
                          subSubCategory={subSubCategory}
                          onLinkClick={handleLinkClick}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}

              {/* Placeholder when no main category is hovered */}
              {!hoveredMain && (
                <div className="flex w-64 items-center justify-center bg-muted/10 p-8 text-center">
                  <div>
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                      <ChevronRight className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Hover over a category to see sub-categories
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-border bg-muted/30 p-3">
            <Link
              href="/categories"
              onClick={handleLinkClick}
              className="flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              View All Categories Page
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

// Main Category Item Component
interface MainCategoryItemProps {
  category: HierarchicalCategory;
  isHovered: boolean;
  onHover: () => void;
  onLinkClick: () => void;
}

function MainCategoryItem({ category, isHovered, onHover, onLinkClick }: MainCategoryItemProps) {
  const hasChildren = category.subCategories && category.subCategories.length > 0;

  return (
    <div
      className={cn(
        'group flex items-center gap-2 rounded-md px-3 py-2.5 transition-colors cursor-pointer',
        isHovered ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
      )}
      onMouseEnter={onHover}
    >
      {/* Category Icon */}
      {category.icon && (
        <span className="flex-shrink-0 text-base">{category.icon}</span>
      )}
      
      {/* Category Name */}
      <Link
        href={`/category/${category.id}`}
        onClick={onLinkClick}
        className="min-w-0 flex-1"
      >
        <span className={cn(
          'block truncate text-sm font-medium',
          isHovered ? 'text-primary-foreground' : 'text-foreground'
        )}>
          {category.name}
        </span>
        {category.nameMyanmar && category.nameMyanmar !== category.name && (
          <span className={cn(
            'block truncate text-xs',
            isHovered ? 'text-primary-foreground/80' : 'text-muted-foreground'
          )}>
            {category.nameMyanmar}
          </span>
        )}
      </Link>

      {/* Arrow indicator for sub-categories */}
      {hasChildren && (
        <ChevronRight className={cn(
          'h-4 w-4 flex-shrink-0 transition-colors',
          isHovered ? 'text-primary-foreground' : 'text-muted-foreground'
        )} />
      )}
    </div>
  );
}

// Sub Category Item Component
interface SubCategoryItemProps {
  subCategory: SubCategory;
  isSelected: boolean;
  onHover: () => void;
  onLinkClick: () => void;
}

function SubCategoryItem({ subCategory, isSelected, onHover, onLinkClick }: SubCategoryItemProps) {
  const hasChildren = subCategory.subSubCategories && subCategory.subSubCategories.length > 0;

  return (
    <div
      className={cn(
        'group flex items-center gap-2 rounded-md px-3 py-2 transition-colors cursor-pointer',
        isSelected ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
      )}
      onMouseEnter={onHover}
    >
      {/* Sub Category Name */}
      <Link
        href={`/category/${subCategory.id}`}
        onClick={onLinkClick}
        className="min-w-0 flex-1"
      >
        <span className={cn(
          'block truncate text-sm',
          isSelected ? 'font-medium text-primary' : 'text-foreground'
        )}>
          {subCategory.name}
        </span>
        {subCategory.nameMyanmar && subCategory.nameMyanmar !== subCategory.name && (
          <span className="block truncate text-xs text-muted-foreground">
            {subCategory.nameMyanmar}
          </span>
        )}
      </Link>

      {/* Book count */}
      <span className={cn(
        'flex-shrink-0 text-xs',
        isSelected ? 'text-primary' : 'text-muted-foreground'
      )}>
        {subCategory.bookCount}
      </span>

      {/* Arrow indicator for sub-sub-categories */}
      {hasChildren && (
        <ChevronRight className={cn(
          'h-4 w-4 flex-shrink-0 transition-colors',
          isSelected ? 'text-primary' : 'text-muted-foreground'
        )} />
      )}
    </div>
  );
}

// Sub-Sub Category Item Component
interface SubSubCategoryItemProps {
  subSubCategory: SubSubCategory;
  onLinkClick: () => void;
}

function SubSubCategoryItem({ subSubCategory, onLinkClick }: SubSubCategoryItemProps) {
  return (
    <Link
      href={`/category/${subSubCategory.id}`}
      onClick={onLinkClick}
      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
    >
      <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/40" />
      <span className="min-w-0 flex-1 truncate text-foreground">
        {subSubCategory.name}
      </span>
      <span className="flex-shrink-0 text-xs text-muted-foreground">
        {subSubCategory.bookCount}
      </span>
    </Link>
  );
}

// Search Results Component
interface SearchResultsProps {
  searchResults: ReturnType<typeof searchCategories> | null;
  hasSearchResults: boolean | undefined;
  searchQuery: string;
  onLinkClick: () => void;
}

function SearchResults({ searchResults, hasSearchResults, searchQuery, onLinkClick }: SearchResultsProps) {
  return (
    <ScrollArea className="h-[420px] w-[500px]">
      <div className="p-3">
        {!hasSearchResults ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No categories found for &quot;{searchQuery}&quot;
          </p>
        ) : (
          <div className="space-y-4">
            {searchResults?.mainCategories.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
                  Main Categories
                </p>
                {searchResults.mainCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.id}`}
                    onClick={onLinkClick}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    {cat.icon && <span>{cat.icon}</span>}
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
                <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
                  Sub Categories
                </p>
                {searchResults.subCategories.slice(0, 15).map(({ parent, sub }) => (
                  <Link
                    key={sub.id}
                    href={`/category/${sub.id}`}
                    onClick={onLinkClick}
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
                <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
                  Sub-Sub Categories
                </p>
                {searchResults.subSubCategories.slice(0, 20).map(({ mainParent, subParent, subSub }) => (
                  <Link
                    key={subSub.id}
                    href={`/category/${subSub.id}`}
                    onClick={onLinkClick}
                    className="flex flex-col rounded-md px-3 py-2 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    <span className="font-medium">{subSub.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {subParent.name} &rsaquo; {mainParent.name}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
