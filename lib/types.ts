export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  coverImage: string;
  category: string;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestseller?: boolean;
  publisher?: string;
  isbn?: string;
  description?: string;
  publishedDate?: string;
  pages?: number;
  language?: string;
}

export interface Category {
  id: string;
  name: string;
  nameMyanmar?: string;
  icon?: string;
  bookCount: number;
}

// Hierarchical category structure for mega menu
export interface SubSubCategory {
  id: string;
  name: string;
  nameMyanmar?: string;
  bookCount: number;
}

export interface SubCategory {
  id: string;
  name: string;
  nameMyanmar?: string;
  bookCount: number;
  subSubCategories?: SubSubCategory[];
}

export interface HierarchicalCategory {
  id: string;
  name: string;
  nameMyanmar?: string;
  icon?: string;
  bookCount: number;
  subCategories?: SubCategory[];
}

export interface Author {
  id: string;
  name: string;
  bookCount: number;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface SearchFilters {
  query?: string;
  category?: string;
  author?: string;
  publisher?: string;
  priceRange?: [number, number];
  sortBy?: 'relevance' | 'price-low' | 'price-high' | 'newest' | 'rating';
}
