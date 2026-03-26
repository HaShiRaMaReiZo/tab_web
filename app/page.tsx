import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HeroBanner } from '@/components/hero-banner';
import { BookSection } from '@/components/book-section';
import { CategoryGrid } from '@/components/category-grid';
import { CartProvider } from '@/lib/cart-context';
import { featuredBooks, newArrivals, bestsellers } from '@/lib/data';

export default function HomePage() {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <HeroBanner />
          
          <div className="mx-auto max-w-7xl px-4">
            {/* Featured Books */}
            <BookSection
              title="This Week's Special"
              subtitle="Handpicked books at special prices"
              books={featuredBooks}
              viewAllLink="/featured"
            />

            {/* Categories */}
            <CategoryGrid />

            {/* Bestsellers */}
            <BookSection
              title="Bestsellers"
              subtitle="Most popular books among readers"
              books={bestsellers}
              viewAllLink="/bestsellers"
            />

            {/* New Arrivals */}
            <BookSection
              title="New Arrivals"
              subtitle="Fresh books just added to our collection"
              books={newArrivals}
              viewAllLink="/new-arrivals"
            />

            {/* Recommended Section */}
            <section className="py-8">
              <div className="rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 p-6 md:p-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h2 className="mb-2 text-2xl font-bold text-foreground">
                      Personalized for You
                    </h2>
                    <p className="mb-4 text-muted-foreground">
                      Sign in to get personalized book recommendations based on your interests
                      and reading history.
                    </p>
                    <div className="flex gap-3">
                      <a
                        href="/login"
                        className="rounded-lg bg-primary px-6 py-2.5 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                      >
                        Sign In
                      </a>
                      <a
                        href="/register"
                        className="rounded-lg border border-primary bg-transparent px-6 py-2.5 font-medium text-primary transition-colors hover:bg-primary/10"
                      >
                        Create Account
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-2">
                      {featuredBooks.slice(0, 3).map((book) => (
                        <div
                          key={book.id}
                          className="aspect-[3/4] w-20 overflow-hidden rounded-lg bg-muted shadow-lg md:w-24"
                        >
                          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 text-xs text-muted-foreground">
                            Book Cover
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Search Options */}
            <section className="py-8">
              <h2 className="mb-6 text-2xl font-bold text-foreground">Quick Search</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <a
                  href="/search?type=author"
                  className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-md"
                >
                  <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary">
                    Search by Author
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Browse books from 4,518 authors
                  </p>
                </a>
                <a
                  href="/search?type=publisher"
                  className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-md"
                >
                  <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary">
                    Search by Publisher
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Find books from 1,336 publishers
                  </p>
                </a>
                <a
                  href="/search?type=isbn"
                  className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-md"
                >
                  <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary">
                    Search by ISBN
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Look up books with ISBN numbers
                  </p>
                </a>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
