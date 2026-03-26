'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, BookOpen, Truck, CreditCard, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';

const slides = [
  {
    id: 1,
    image: '/banners/s1.jpg',
    title: 'Welcome to TAB Book Centre',
    subtitle: 'Myanmar\'s Trusted Bookstore Since 1995',
    description: 'Discover over 68,000 books from 4,500+ authors across 89 categories',
    ctaText: 'Start Shopping',
    ctaLink: '/categories',
  },
  {
    id: 2,
    image: '/banners/s2.jpg',
    title: 'New Arrivals This Week',
    subtitle: 'Fresh Books Just Added',
    description: 'Check out the latest books from your favorite authors',
    ctaText: 'View New Books',
    ctaLink: '/search?sort=newest',
  },
  {
    id: 3,
    image: '/banners/s3.jpg',
    title: 'Bestsellers Collection',
    subtitle: 'Most Loved by Readers',
    description: 'Join thousands of readers who love these popular titles',
    ctaText: 'See Bestsellers',
    ctaLink: '/search?sort=popular',
  },
  {
    id: 4,
    image: '/banners/s4.jpg',
    title: 'Special Promotions',
    subtitle: 'Great Deals Await',
    description: 'Save big on selected titles and collections',
    ctaText: 'Shop Now',
    ctaLink: '/search',
  },
];

const features = [
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'On orders over 50,000 Kyats',
  },
  {
    icon: CreditCard,
    title: 'Easy Payment',
    description: 'Multiple payment options',
  },
  {
    icon: BookOpen,
    title: '68,000+ Books',
    description: 'Huge selection available',
  },
  {
    icon: Headphones,
    title: 'Customer Support',
    description: 'Helpful & friendly team',
  },
];

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  return (
    <section>
      {/* Main Banner */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="relative min-w-full"
            >
              {/* Background Image */}
              <div className="relative h-[280px] w-full md:h-[380px] lg:h-[450px]">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={slide.id === 1}
                />
                {/* Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-transparent" />
              </div>
              
              {/* Content overlay */}
              <div className="absolute inset-0 flex items-center">
                <div className="mx-auto w-full max-w-7xl px-4">
                  <div className="max-w-xl">
                    <p className="mb-2 text-sm font-medium uppercase tracking-wide text-white/90 md:text-base">
                      {slide.subtitle}
                    </p>
                    <h1 className="mb-3 text-2xl font-bold leading-tight text-white drop-shadow-md md:mb-4 md:text-4xl lg:text-5xl">
                      {slide.title}
                    </h1>
                    <p className="mb-4 text-sm text-white/90 drop-shadow md:mb-6 md:text-lg">{slide.description}</p>
                    <Link href={slide.ctaLink}>
                      <Button
                        size="lg"
                        className="bg-secondary text-secondary-foreground shadow-lg hover:bg-secondary/90"
                      >
                        {slide.ctaText}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/30 p-2 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-white/50 md:left-4 md:p-3"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/30 p-2 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-white/50 md:right-4 md:p-3"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2.5 rounded-full shadow transition-all ${
                index === currentSlide
                  ? 'w-8 bg-secondary'
                  : 'w-2.5 bg-white/60 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Features bar */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 gap-4 py-4 md:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
