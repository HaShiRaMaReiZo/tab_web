'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { hierarchicalCategories, searchCategories } from '@/lib/hierarchical-categories';

interface MobileCategoryMenuProps {
  onNavigate?: () => void;
}

export function MobileCategoryMenu({ onNavigate }: MobileCategoryMenuProps) {
  const [expandedMain, setExpandedMain] = useState<string | null>(null);
  const [expandedSub, setExpandedSub] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleMainToggle = (id: string) => {
    setExpandedMain(expandedMain === id ? null : id);
    setExpandedSub(null);
  };

  const handleSubToggle = (id: string) => {
    setExpandedSub(expandedSub === id ? null : id);
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
                          {subParent.name} › {mainParent.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          // Accordion Category List
          <div className="space-y-1">
            {hierarchicalCategories.map((mainCategory) => (
              <div key={mainCategory.id} className="border-b border-border last:border-0">
                {/* Main Category */}
                <div className="flex items-center">
                  <Link
                    href={`/category/${mainCategory.id}`}
                    onClick={handleLinkClick}
                    className="flex-1 py-3 text-sm font-medium"
                  >
                    {mainCategory.name}
                    {mainCategory.nameMyanmar && mainCategory.nameMyanmar !== mainCategory.name && (
                      <span className="ml-2 text-xs text-muted-foreground">
                        ({mainCategory.nameMyanmar})
                      </span>
                    )}
                  </Link>
                  {mainCategory.subCategories && mainCategory.subCategories.length > 0 && (
                    <button
                      onClick={() => handleMainToggle(mainCategory.id)}
                      className="p-3"
                      aria-expanded={expandedMain === mainCategory.id}
                    >
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 transition-transform',
                          expandedMain === mainCategory.id && 'rotate-180'
                        )}
                      />
                    </button>
                  )}
                </div>

                {/* Sub Categories */}
                {expandedMain === mainCategory.id && mainCategory.subCategories && (
                  <div className="mb-2 ml-4 space-y-1 border-l border-border pl-4">
                    {mainCategory.subCategories.map((subCategory) => (
                      <div key={subCategory.id}>
                        <div className="flex items-center">
                          <Link
                            href={`/category/${subCategory.id}`}
                            onClick={handleLinkClick}
                            className="flex-1 py-2 text-sm"
                          >
                            {subCategory.name}
                          </Link>
                          {subCategory.subSubCategories && subCategory.subSubCategories.length > 0 && (
                            <button
                              onClick={() => handleSubToggle(subCategory.id)}
                              className="p-2"
                              aria-expanded={expandedSub === subCategory.id}
                            >
                              <ChevronRight
                                className={cn(
                                  'h-4 w-4 transition-transform',
                                  expandedSub === subCategory.id && 'rotate-90'
                                )}
                              />
                            </button>
                          )}
                        </div>

                        {/* Sub-Sub Categories */}
                        {expandedSub === subCategory.id && subCategory.subSubCategories && (
                          <div className="mb-2 ml-4 space-y-1 border-l border-border pl-4">
                            {subCategory.subSubCategories.map((subSubCategory) => (
                              <Link
                                key={subSubCategory.id}
                                href={`/category/${subSubCategory.id}`}
                                onClick={handleLinkClick}
                                className="block py-1.5 text-sm text-muted-foreground hover:text-foreground"
                              >
                                {subSubCategory.name}
                                <span className="ml-2 text-xs">
                                  ({subSubCategory.bookCount.toLocaleString()})
                                </span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
