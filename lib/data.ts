import { Book, Category, Author } from './types';

export const categories: Category[] = [
  { id: '1', name: 'Fiction', nameMyanmar: 'ဝတ္ထု', bookCount: 12500 },
  { id: '2', name: 'Non-Fiction', nameMyanmar: 'သုတစာအုပ်', bookCount: 8900 },
  { id: '3', name: 'Religion & Spirituality', nameMyanmar: 'ဘာသာရေး', bookCount: 5600 },
  { id: '4', name: 'History', nameMyanmar: 'သမိုင်း', bookCount: 3200 },
  { id: '5', name: 'Politics', nameMyanmar: 'နိုင်ငံရေး', bookCount: 2100 },
  { id: '6', name: 'Self-Help', nameMyanmar: 'ကိုယ်တိုင်တိုးတက်ရေး', bookCount: 4500 },
  { id: '7', name: 'Business & Economics', nameMyanmar: 'စီးပွားရေး', bookCount: 3800 },
  { id: '8', name: 'Children & Youth', nameMyanmar: 'ကလေးစာအုပ်', bookCount: 6200 },
  { id: '9', name: 'Health & Medicine', nameMyanmar: 'ကျန်းမာရေး', bookCount: 2800 },
  { id: '10', name: 'Law', nameMyanmar: 'ဥပဒေ', bookCount: 1500 },
  { id: '11', name: 'IT & Technology', nameMyanmar: 'အိုင်တီ', bookCount: 1900 },
  { id: '12', name: 'Literature & Poetry', nameMyanmar: 'စာပေ', bookCount: 4100 },
];

export const authors: Author[] = [
  { id: '1', name: 'Thingyan Sayar', bookCount: 45 },
  { id: '2', name: 'Dagon Nat Shin', bookCount: 38 },
  { id: '3', name: 'Min Thu Wun', bookCount: 52 },
  { id: '4', name: 'Mya Than Tint', bookCount: 67 },
  { id: '5', name: 'Journal Kyaw Ma Ma Lay', bookCount: 34 },
];

export const featuredBooks: Book[] = [
  {
    id: '1',
    title: 'The Art of Living',
    author: 'Thingyan Sayar',
    price: 6500,
    originalPrice: 8000,
    coverImage: '/books/book-1.jpg',
    category: 'Self-Help',
    rating: 4.8,
    reviewCount: 234,
    isBestseller: true,
    publisher: 'TAB Publishing',
    description: 'A comprehensive guide to mindful living and personal growth.',
  },
  {
    id: '2',
    title: 'Myanmar History Chronicles',
    author: 'Dagon Nat Shin',
    price: 12000,
    coverImage: '/books/book-2.jpg',
    category: 'History',
    rating: 4.9,
    reviewCount: 189,
    isNew: true,
    publisher: 'Heritage Books',
  },
  {
    id: '3',
    title: 'Business Mindset',
    author: 'Min Thu Wun',
    price: 8500,
    originalPrice: 10000,
    coverImage: '/books/book-3.jpg',
    category: 'Business & Economics',
    rating: 4.6,
    reviewCount: 156,
    publisher: 'Success Press',
  },
  {
    id: '4',
    title: 'Tales from the Golden Land',
    author: 'Mya Than Tint',
    price: 5500,
    coverImage: '/books/book-4.jpg',
    category: 'Fiction',
    rating: 4.7,
    reviewCount: 312,
    isBestseller: true,
    publisher: 'TAB Publishing',
  },
  {
    id: '5',
    title: 'Digital Future',
    author: 'Tech Myanmar',
    price: 15000,
    coverImage: '/books/book-5.jpg',
    category: 'IT & Technology',
    rating: 4.5,
    reviewCount: 87,
    isNew: true,
    publisher: 'Digital Books',
  },
  {
    id: '6',
    title: 'Peaceful Mind',
    author: 'Sayardaw U Pandita',
    price: 4500,
    coverImage: '/books/book-6.jpg',
    category: 'Religion & Spirituality',
    rating: 4.9,
    reviewCount: 456,
    isBestseller: true,
    publisher: 'Dhamma Press',
  },
];

export const newArrivals: Book[] = [
  {
    id: '7',
    title: 'Modern Leadership',
    author: 'Dr. Aung Kyaw',
    price: 9500,
    coverImage: '/books/book-7.jpg',
    category: 'Business & Economics',
    rating: 4.4,
    reviewCount: 45,
    isNew: true,
    publisher: 'Leadership Press',
  },
  {
    id: '8',
    title: 'Children\'s Adventure Stories',
    author: 'Ma Sandar',
    price: 3500,
    coverImage: '/books/book-8.jpg',
    category: 'Children & Youth',
    rating: 4.8,
    reviewCount: 128,
    isNew: true,
    publisher: 'Kids Books',
  },
  {
    id: '9',
    title: 'Legal Rights Guide',
    author: 'Advocate U Win',
    price: 11000,
    coverImage: '/books/book-9.jpg',
    category: 'Law',
    rating: 4.6,
    reviewCount: 67,
    isNew: true,
    publisher: 'Law Publications',
  },
  {
    id: '10',
    title: 'Health & Wellness',
    author: 'Dr. Myint Swe',
    price: 7500,
    coverImage: '/books/book-10.jpg',
    category: 'Health & Medicine',
    rating: 4.7,
    reviewCount: 198,
    isNew: true,
    publisher: 'Health Books',
  },
];

export const bestsellers: Book[] = [
  ...featuredBooks.filter(book => book.isBestseller),
  {
    id: '11',
    title: 'Political Analysis',
    author: 'U Thant Myint',
    price: 8000,
    coverImage: '/books/book-11.jpg',
    category: 'Politics',
    rating: 4.5,
    reviewCount: 234,
    isBestseller: true,
    publisher: 'Political Press',
  },
  {
    id: '12',
    title: 'Poetry Collection',
    author: 'Tin Moe',
    price: 5000,
    coverImage: '/books/book-12.jpg',
    category: 'Literature & Poetry',
    rating: 4.9,
    reviewCount: 567,
    isBestseller: true,
    publisher: 'Literary House',
  },
];

export const allBooks: Book[] = [...featuredBooks, ...newArrivals, ...bestsellers.slice(3)];

export function searchBooks(filters: {
  query?: string;
  category?: string;
  author?: string;
  sortBy?: string;
}): Book[] {
  let results = [...allBooks];

  if (filters.query) {
    const query = filters.query.toLowerCase();
    results = results.filter(
      book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.category.toLowerCase().includes(query)
    );
  }

  if (filters.category) {
    results = results.filter(book => book.category === filters.category);
  }

  if (filters.author) {
    results = results.filter(book => book.author === filters.author);
  }

  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price-low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        results = results.filter(book => book.isNew).concat(results.filter(book => !book.isNew));
        break;
    }
  }

  return results;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-MM', {
    style: 'decimal',
    minimumFractionDigits: 0,
  }).format(price) + ' Kyats';
}
