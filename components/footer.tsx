import Link from 'next/link';
import { BookOpen, MapPin, Phone, Mail, Facebook, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold">TAB Book Centre</h3>
                <p className="text-sm opacity-80">Since 1995</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed opacity-90">
              Myanmar&apos;s leading bookstore with thousands of books, stationery, 
              and educational materials. Serving readers for over 30 years.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categories" className="opacity-90 hover:opacity-100 hover:underline">
                  Browse Categories
                </Link>
              </li>
              <li>
                <Link href="/bestsellers" className="opacity-90 hover:opacity-100 hover:underline">
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="opacity-90 hover:opacity-100 hover:underline">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/authors" className="opacity-90 hover:opacity-100 hover:underline">
                  Browse by Author
                </Link>
              </li>
              <li>
                <Link href="/publishers" className="opacity-90 hover:opacity-100 hover:underline">
                  Browse by Publisher
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="mb-4 font-semibold">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="opacity-90 hover:opacity-100 hover:underline">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="opacity-90 hover:opacity-100 hover:underline">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link href="/returns" className="opacity-90 hover:opacity-100 hover:underline">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/payment" className="opacity-90 hover:opacity-100 hover:underline">
                  Payment Options
                </Link>
              </li>
              <li>
                <Link href="/faq" className="opacity-90 hover:opacity-100 hover:underline">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-semibold">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span className="opacity-90">
                  Taw Win Center, 3rd Floor, Pyay Road, Dagon Township, Yangon
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span className="opacity-90">01-8600042, 01-8600043</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <span className="opacity-90">info@tabbookcenter.com</span>
              </li>
            </ul>
            <div className="mt-4 flex gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
                aria-label="Viber"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-primary-foreground/20 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-sm sm:flex-row">
            <p className="opacity-80">
              &copy; {new Date().getFullYear()} TAB Book Centre. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="/privacy" className="opacity-80 hover:opacity-100 hover:underline">
                Privacy Policy
              </Link>
              <Link href="/terms" className="opacity-80 hover:opacity-100 hover:underline">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
