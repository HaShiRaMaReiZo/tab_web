import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CartProvider } from '@/lib/cart-context';
import { categories } from '@/lib/data';
import Link from 'next/link';
import { 
  BookOpen, 
  Lightbulb, 
  Heart, 
  Clock, 
  Users, 
  TrendingUp,
  GraduationCap,
  Baby,
  Stethoscope,
  Scale,
  Monitor,
  PenTool
} from 'lucide-react';

const categoryIcons: Record<string, typeof BookOpen> = {
  'Fiction': BookOpen,
  'Non-Fiction': Lightbulb,
  'Religion & Spirituality': Heart,
  'History': Clock,
  'Politics': Users,
  'Self-Help': TrendingUp,
  'Business & Economics': TrendingUp,
  'Children & Youth': Baby,
  'Health & Medicine': Stethoscope,
  'Law': Scale,
  'IT & Technology': Monitor,
  'Literature & Poetry': PenTool,
};

export default function CategoriesPage() {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 py-8">
            <div className="mb-8">
              <h1 className="mb-2 text-3xl font-bold text-foreground">
                Browse All Categories
              </h1>
              <p className="text-muted-foreground">
                Explore our collection of 89 categories with over 68,000 books
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {categories.map((category) => {
                const Icon = categoryIcons[category.name] || GraduationCap;
                return (
                  <Link
                    key={category.id}
                    href={`/category/${category.id}`}
                    className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
                  >
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-7 w-7 text-primary group-hover:text-primary-foreground" />
                    </div>
                    <h2 className="mb-1 text-lg font-semibold text-foreground group-hover:text-primary">
                      {category.name}
                    </h2>
                    {category.nameMyanmar && (
                      <p className="mb-2 text-sm text-muted-foreground">
                        {category.nameMyanmar}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      {category.bookCount.toLocaleString()} books
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
