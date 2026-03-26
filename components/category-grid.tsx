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
import { Card, CardContent } from '@/components/ui/card';
import { categories } from '@/lib/data';

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

export function CategoryGrid() {
  return (
    <section className="py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Browse by Category</h2>
        <p className="mt-1 text-muted-foreground">
          Find books across 89 different categories
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {categories.map((category) => {
          const Icon = categoryIcons[category.name] || GraduationCap;
          return (
            <Link key={category.id} href={`/category/${category.id}`}>
              <Card className="h-full transition-all hover:border-primary hover:shadow-md">
                <CardContent className="flex flex-col items-center p-4 text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-sm font-medium text-foreground">{category.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {category.bookCount.toLocaleString()} books
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
