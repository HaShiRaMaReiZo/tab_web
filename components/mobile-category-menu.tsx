'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Search, FolderOpen, Folder } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { hierarchicalCategories, searchCategories } from '@/lib/hierarchical-categories';
import type { HierarchicalCategory, SubCategory } from '@/lib/types';

interface MobileCategoryMenuProps {
  onNavigate?: () => void;
}

export function MobileCategoryMenu({ onNavigate }: MobileCategoryMenuProps) {
  const [expandedMain, setExpandedMain] = useState<Set<string>>(new Set());
  const [expandedSub, setExpandedSub] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

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
    onNavigate?.();
  };

  const searchResults = searchQuery.length >= 2 ? searchCategories(searchQuery) : null;
  const hasSearchResults = searchResults && (
    searchResults.mainCategories.length > 0 ||
    searchResults.subCategories.length > 0 ||
    searchResults.subSubCategories.length > 0
  );

  return (
    <div className="flex flex-col">
      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 pl-9"
          />
        </div>
      </div>

      <ScrollArea className="max-h-[60vh]">
        {searchQuery.length >= 2 ? (
          // Search Results
          <div className="space-y-4">
            {!hasSearchResults ? (
              <p className="py-4 text-center text-sm text-muted-foreground">
                No categories found for &quot;{searchQuery}&quot;
              </p>
            ) : (
              <>
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
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
                      >
                        <Folder className="h-4 w-4 text-primary" />
                        <span className="font-medium">{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
                {searchResults?.subCategories.length > 0 && (
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
                      Sub Categories
                    </p>
                    {searchResults.subCategories.slice(0, 10).map(({ parent, sub }) => (
                      <Link
                        key={sub.id}
                        href={`/category/${sub.id}`}
                        onClick={handleLinkClick}
                        className="flex flex-col rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
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
                    {searchResults.subSubCategories.slice(0, 15).map(({ mainParent, subParent, subSub }) => (
                      <Link
                        key={subSub.id}
                        href={`/category/${subSub.id}`}
                        onClick={handleLinkClick}
                        className="flex flex-col rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
                      >
                        <span className="font-medium">{subSub.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {subParent.name} &rsaquo; {mainParent.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          // Expandable Tree
          <div className="space-y-1">
            {hierarchicalCategories.map((mainCategory) => (
              <MobileTreeItem
                key={mainCategory.id}
                category={mainCategory}
                isExpanded={expandedMain.has(mainCategory.id)}
                expandedSub={expandedSub}
                onToggle={() => toggleMainCategory(mainCategory.id)}
                onToggleSub={toggleSubCategory}
                onLinkClick={handleLinkClick}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

// Mobile Tree Item Component
interface MobileTreeItemProps {
  category: HierarchicalCategory;
  isExpanded: boolean;
  expandedSub: Set<string>;
  onToggle: () => void;
  onToggleSub: (id: string) => void;
  onLinkClick: () => void;
}

function MobileTreeItem({ 
  category, 
  isExpanded, 
  expandedSub,
  onToggle, 
  onToggleSub,
  onLinkClick 
}: MobileTreeItemProps) {
  const hasChildren = category.subCategories && category.subCategories.length > 0;
  const Icon = isExpanded ? FolderOpen : Folder;

  return (
    <div className="border-b border-border last:border-0">
      {/* Main Category Row */}
      <div className="flex items-center">
        {/* Expand/Collapse Toggle */}
        {hasChildren && (
          <button
            onClick={onToggle}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center"
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
        )}

        {/* Category Link */}
        <Link
          href={`/category/${category.id}`}
          onClick={onLinkClick}
          className={cn(
            'flex flex-1 items-center gap-2 py-3 pr-3',
            !hasChildren && 'pl-10'
          )}
        >
          <Icon className="h-4 w-4 text-primary" />
          <span className="flex-1 font-medium text-foreground">{category.name}</span>
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            {category.bookCount.toLocaleString()}
          </span>
        </Link>
      </div>

      {/* Sub Categories (Expanded) */}
      {isExpanded && hasChildren && (
        <div className="mb-2 ml-6 border-l border-border pl-2">
          {category.subCategories!.map((subCategory) => (
            <MobileSubTreeItem
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

// Mobile Sub Tree Item Component
interface MobileSubTreeItemProps {
  subCategory: SubCategory;
  isExpanded: boolean;
  onToggle: () => void;
  onLinkClick: () => void;
}

function MobileSubTreeItem({ 
  subCategory, 
  isExpanded, 
  onToggle, 
  onLinkClick 
}: MobileSubTreeItemProps) {
  const hasChildren = subCategory.subSubCategories && subCategory.subSubCategories.length > 0;

  return (
    <div>
      {/* Sub Category Row */}
      <div className="flex items-center">
        {/* Expand/Collapse Toggle */}
        {hasChildren && (
          <button
            onClick={onToggle}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center"
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
        )}

        {/* Sub Category Link */}
        <Link
          href={`/category/${subCategory.id}`}
          onClick={onLinkClick}
          className={cn(
            'flex flex-1 items-center gap-2 py-2 pr-3 text-sm',
            !hasChildren && 'pl-9'
          )}
        >
          <span className="flex-1 text-foreground">{subCategory.name}</span>
          <span className="text-xs text-muted-foreground">
            {subCategory.bookCount.toLocaleString()}
          </span>
        </Link>
      </div>

      {/* Sub-Sub Categories (Expanded) */}
      {isExpanded && hasChildren && (
        <div className="mb-2 ml-6 border-l border-border/50 pl-2">
          {subCategory.subSubCategories!.map((subSubCategory) => (
            <Link
              key={subSubCategory.id}
              href={`/category/${subSubCategory.id}`}
              onClick={onLinkClick}
              className="flex items-center gap-2 py-2 pl-2 pr-3 text-sm"
            >
              <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted-foreground/40" />
              <span className="flex-1 text-muted-foreground">
                {subSubCategory.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {subSubCategory.bookCount.toLocaleString()}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
