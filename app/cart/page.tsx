'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { CartProvider, useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/data';
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  Truck,
  ShieldCheck,
} from 'lucide-react';

function CartContent() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart();
  const subtotal = getTotalPrice();
  const deliveryFee = subtotal >= 50000 ? 0 : 3000;
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="px-4 text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="mb-2 text-2xl font-bold text-foreground">
              Your cart is empty
            </h1>
            <p className="mb-6 text-muted-foreground">
              Looks like you haven&apos;t added any books to your cart yet.
            </p>
            <Link href="/">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">
              Shopping Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
            </h1>
            <Button variant="ghost" onClick={clearCart} className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Clear Cart
            </Button>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-border bg-card">
                {items.map((item, index) => (
                  <div
                    key={item.book.id}
                    className={`flex gap-4 p-4 ${
                      index !== items.length - 1 ? 'border-b border-border' : ''
                    }`}
                  >
                    {/* Book Image */}
                    <Link
                      href={`/book/${item.book.id}`}
                      className="relative h-32 w-24 shrink-0 overflow-hidden rounded-lg bg-muted"
                    >
                      <Image
                        src={item.book.coverImage}
                        alt={item.book.title}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </Link>

                    {/* Book Details */}
                    <div className="flex flex-1 flex-col">
                      <div className="flex-1">
                        <Link
                          href={`/book/${item.book.id}`}
                          className="font-semibold text-foreground hover:text-primary"
                        >
                          {item.book.title}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          by {item.book.author}
                        </p>
                        <p className="mt-1 text-lg font-bold text-primary">
                          {formatPrice(item.book.price)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center rounded-lg border border-border">
                          <button
                            onClick={() =>
                              updateQuantity(item.book.id, item.quantity - 1)
                            }
                            className="flex h-9 w-9 items-center justify-center text-foreground hover:bg-muted"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="flex h-9 w-10 items-center justify-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.book.id, item.quantity + 1)
                            }
                            className="flex h-9 w-9 items-center justify-center text-foreground hover:bg-muted"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-semibold text-foreground">
                            {formatPrice(item.book.price * item.quantity)}
                          </span>
                          <button
                            onClick={() => removeItem(item.book.id)}
                            className="text-muted-foreground hover:text-destructive"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/" className="mt-4 inline-flex items-center text-primary hover:underline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div>
              <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
                <h2 className="mb-4 text-xl font-bold text-foreground">
                  Order Summary
                </h2>

                <div className="space-y-3 border-b border-border pb-4">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery</span>
                    <span>
                      {deliveryFee === 0 ? (
                        <span className="text-secondary">Free</span>
                      ) : (
                        formatPrice(deliveryFee)
                      )}
                    </span>
                  </div>
                  {deliveryFee > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Free delivery on orders over 50,000 Kyats
                    </p>
                  )}
                </div>

                <div className="my-4 flex justify-between text-lg font-bold text-foreground">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-secondary hover:bg-secondary/90"
                >
                  Proceed to Checkout
                </Button>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Truck className="h-5 w-5 text-secondary" />
                    <span>Fast delivery across Myanmar</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <ShieldCheck className="h-5 w-5 text-secondary" />
                    <span>Secure checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function CartPage() {
  return (
    <CartProvider>
      <CartContent />
    </CartProvider>
  );
}
