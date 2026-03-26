'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Menu, X, Search, FolderOpen, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { hierarchicalCategories, searchCategories } from '@/lib/hierarchical-categories';
import type { HierarchicalCategory, SubCategory } from '@/lib/types';

interface CategoryMegaMenuProps {
  className?: string;
}

export function CategoryMegaMenu({ className }: CategoryMegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMain, setExpandedMain] = useState<Set<string>>(new Set());
  const [expandedSub, setExpandedSub] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
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
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleMainCategory = (id: string) => {
    setExpandedMain((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        // Also collapse all sub-categories under this main category
        const mainCat = hierarchicalCategories.find(c => c.id === id);
        mainCat?.subCategories?.forEach(sub => {
          expandedSub.delete(sub.id);
        });
        setExpandedSub(new Set(expandedSub));
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleSubCategory = (id: string) => {
    setExpandedSub((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    setSearchQuery('');
  };

  const collapseAll = () => {
    setExpandedMain(new Set());
    setExpandedSub(new Set());
  };

  const expandAll = () => {
    const allMainIds = new Set(hierarchicalCategories.map(c => c.id));
    const allSubIds = new Set<string>();
    hierarchicalCategories.forEach(main => {
      main.subCategories?.forEach(sub => {
        allSubIds.add(sub.id);
      });
    });
    setExpandedMain(allMainIds);
    setExpandedSub(allSubIds);
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

      {/* Expandable Tree Panel */}
      {isOpen && (
        <div 
          className="absolute left-0 top-full z-50 mt-1 w-[420px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-lg border border-border bg-card shadow-xl"
        >
          {/* Header with Search */}
          <div className="border-b border-border bg-muted/30 p-3">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Browse Categories</h3>
                <p className="text-xs text-muted-foreground">
                  {hierarchicalCategories.length} main categories, {totalSubSub} sub-categories
                </p>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={expandAll}
                  className="h-7 px-2 text-xs"
                >
                  Expand All
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={collapseAll}
                  className="h-7 px-2 text-xs"
                >
                  Collapse
                </Button>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search all categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 pl-9 text-sm"
              />
            </div>
          </div>

          {/* Tree Content */}
          <ScrollArea className="h-[400px]">
            {searchQuery.length >= 2 ? (
              // Search Results
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
                            onClick={handleLinkClick}
                            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                          >
                            <Folder className="h-4 w-4" />
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
                        <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
                          Sub-Sub Categories
                        </p>
                        {searchResults.subSubCategories.slice(0, 20).map(({ mainParent, subParent, subSub }) => (
                          <Link
                            key={subSub.id}
                            href={`/category/${subSub.id}`}
                            onClick={handleLinkClick}
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
            ) : (
              // Expandable Tree
              <div className="p-2">
                {hierarchicalCategories.map((mainCategory) => (
                  <TreeItem
                    key={mainCategory.id}
                    category={mainCategory}
                    isExpanded={expandedMain.has(mainCategory.id)}
                    expandedSub={expandedSub}
                    onToggle={() => toggleMainCategory(mainCategory.id)}
                    onToggleSub={toggleSubCategory}
                    onLinkClick={handleLinkClick}
                    level={0}
                  />
                ))}
              </div>
            )}
          </ScrollArea>

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

// Tree Item Component for Main Categories
interface TreeItemProps {
  category: HierarchicalCategory;
  isExpanded: boolean;
  expandedSub: Set<string>;
  onToggle: () => void;
  onToggleSub: (id: string) => void;
  onLinkClick: () => void;
  level: number;
}

function TreeItem({ 
  category, 
  isExpanded, 
  expandedSub,
  onToggle, 
  onToggleSub,
  onLinkClick,
  level 
}: TreeItemProps) {
  const hasChildren = category.subCategories && category.subCategories.length > 0;
  const Icon = isExpanded ? FolderOpen : Folder;

  return (
    <div className="select-none">
      {/* Main Category Row */}
      <div 
        className={cn(
          'group flex items-center gap-1 rounded-md transition-colors',
          'hover:bg-muted'
        )}
      >
        {/* Expand/Collapse Toggle */}
        <button
          onClick={onToggle}
          className={cn(
            'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded transition-colors',
            hasChildren ? 'hover:bg-muted-foreground/10' : 'cursor-default opacity-0'
          )}
          disabled={!hasChildren}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
        >
          <ChevronRight 
            className={cn(
              'h-4 w-4 text-muted-foreground transition-transform duration-200',
              isExpanded && 'rotate-90'
            )} 
          />
        </button>

        {/* Category Link */}
        <Link
          href={`/category/${category.id}`}
          onClick={onLinkClick}
          className="flex flex-1 items-center gap-2 py-2 pr-3"
        >
          <Icon className="h-4 w-4 text-primary" />
          <div className="min-w-0 flex-1">
            <span className="font-medium text-foreground">{category.name}</span>
            {category.nameMyanmar && category.nameMyanmar !== category.name && (
              <span className="ml-2 text-xs text-muted-foreground">
                {category.nameMyanmar}
              </span>
            )}
          </div>
          <span className="flex-shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            {category.bookCount.toLocaleString()}
          </span>
        </Link>
      </div>

      {/* Sub Categories (Expanded) */}
      {isExpanded && hasChildren && (
        <div className="ml-4 border-l border-border pl-2">
          {category.subCategories!.map((subCategory) => (
            <SubTreeItem
              key={subCategory.id}
              subCategory={subCategory}
              isExpanded={expandedSub.has(subCategory.id)}
              onToggle={() => onToggleSub(subCategory.id)}
              onLinkClick={onLinkClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Sub Tree Item Component for Sub Categories
interface SubTreeItemProps {
  subCategory: SubCategory;
  isExpanded: boolean;
  onToggle: () => void;
  onLinkClick: () => void;
}

function SubTreeItem({ 
  subCategory, 
  isExpanded, 
  onToggle, 
  onLinkClick 
}: SubTreeItemProps) {
  const hasChildren = subCategory.subSubCategories && subCategory.subSubCategories.length > 0;

  return (
    <div className="select-none">
      {/* Sub Category Row */}
      <div 
        className={cn(
          'group flex items-center gap-1 rounded-md transition-colors',
          'hover:bg-muted'
        )}
      >
        {/* Expand/Collapse Toggle */}
        <button
          onClick={onToggle}
          className={cn(
            'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded transition-colors',
            hasChildren ? 'hover:bg-muted-foreground/10' : 'cursor-default opacity-0'
          )}
          disabled={!hasChildren}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
        >
          <ChevronRight 
            className={cn(
              'h-3.5 w-3.5 text-muted-foreground transition-transform duration-200',
              isExpanded && 'rotate-90'
            )} 
          />
        </button>

        {/* Sub Category Link */}
        <Link
          href={`/category/${subCategory.id}`}
          onClick={onLinkClick}
          className="flex flex-1 items-center gap-2 py-1.5 pr-3 text-sm"
        >
          <div className="min-w-0 flex-1">
            <span className="text-foreground">{subCategory.name}</span>
            {subCategory.nameMyanmar && subCategory.nameMyanmar !== subCategory.name && (
              <span className="ml-2 text-xs text-muted-foreground">
                {subCategory.nameMyanmar}
              </span>
            )}
          </div>
          <span className="flex-shrink-0 text-xs text-muted-foreground">
            {subCategory.bookCount.toLocaleString()}
          </span>
        </Link>
      </div>

      {/* Sub-Sub Categories (Expanded) */}
      {isExpanded && hasChildren && (
        <div className="ml-4 border-l border-border/50 pl-2">
          {subCategory.subSubCategories!.map((subSubCategory) => (
            <Link
              key={subSubCategory.id}
              href={`/category/${subSubCategory.id}`}
              onClick={onLinkClick}
              className="flex items-center gap-2 rounded-md py-1.5 pl-2 pr-3 text-sm transition-colors hover:bg-muted"
            >
              <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted-foreground/40" />
              <span className="min-w-0 flex-1 text-muted-foreground hover:text-foreground">
                {subSubCategory.name}
              </span>
              <span className="flex-shrink-0 text-xs text-muted-foreground">
                {subSubCategory.bookCount.toLocaleString()}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
