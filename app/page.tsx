"use client"

import { Star, Instagram, Paintbrush as Pinterest, ShoppingCart, X, Loader } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { reviews as defaultReviews, type Review } from "@/data/products"
import { subscribeToProducts } from "@/lib/firebase-service"
import { createCheckoutSession } from "@/lib/stripe-service"

export default function Home() {
  const [reviews, setReviews] = useState<Review[]>(defaultReviews)
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [currency, setCurrency] = useState("NGN")
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem("beadsville_reviews")
    if (saved) {
      try {
        setReviews(JSON.parse(saved))
      } catch (e) {
        setReviews(defaultReviews)
      }
    }

    // Subscribe to Firebase products in real-time
    const unsubscribe = subscribeToProducts((products) => {
      // Get only first 3 for featured section
      setFeaturedProducts(products.slice(0, 3))
      setLoadingProducts(false)
    })

    return () => unsubscribe()
  }, [])

  const handleAddToCart = (product) => {
    setCart([...cart, product])
  }

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove))
  }

  const scrollToCart = () => {
    setShowCart(true)
  }

  const handleCheckout = async () => {
    if (cart.length === 0) return
    setIsCheckingOut(true)
    try {
      const checkoutItems = cart.map(item => ({
        id: item.id || item.name,
        name: item.name,
        price: item.price,
        quantity: 1,
        currency: currency
      }))
      
      const { url } = await createCheckoutSession(checkoutItems, currency)
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error("Checkout failed:", error)
      alert("Checkout failed. Please try again.")
    } finally {
      setIsCheckingOut(false)
    }
  }

  return (
    <div className="bg-background text-foreground">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex-shrink-0">
              <img
                src="/images/beadsville-20logo-202.png"
                alt="BEADSVILLE - Your Lucky Charm"
                className="h-20 w-auto"
              />
            </div>

            <nav className="flex items-center gap-4 md:gap-8">
              <a href="#products" className="text-xs md:text-sm hover:text-muted-foreground transition-colors">
                Collection
              </a>
              <a href="#reviews" className="text-xs md:text-sm hover:text-muted-foreground transition-colors">
                Reviews
              </a>
              <a href="#about" className="text-xs md:text-sm hover:text-muted-foreground transition-colors">
                About
              </a>
              <div className="relative cursor-pointer ml-auto md:ml-0" onClick={scrollToCart}>
                <ShoppingCart size={20} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>

      

      <section className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
        <img
          src="/images/img-20251210-wa0014.jpg"
          alt="We Make It, You Wear It - BEADSVILLE Collection"
          className="w-full h-full object-cover"
        />
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 marblely-gradient rounded-2xl my-12">
        <div className="text-center space-y-8">
          <p className="text-sm tracking-widest text-muted-foreground uppercase">Handcrafted Excellence</p>
          <h1 className="text-6xl md:text-7xl leading-tight px-8" style={{ fontFamily: "var(--font-serif)" }}>
            Your Lucky Charm
          </h1>
          <div className="max-w-2xl mx-auto px-8 py-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Discover BEADSVILLE's collection of handcrafted bracelets, necklaces, and earrings—each piece a
              celebration of artistry and elegance, made with pride in Nigeria.
            </p>
          </div>
        </div>
      </section>

      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-16 text-center">
          <p className="text-sm tracking-widest text-muted-foreground uppercase mb-4">Featured Pieces</p>
          <h2 className="text-5xl mb-6" style={{ fontFamily: "var(--font-serif)" }}>
            Curated Collection
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-6 relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 text-xs font-semibold">-20%</div>
              </div>
              <h3 className="text-2xl font-semibold mb-3" style={{ fontFamily: "var(--font-serif)" }}>
                {product.name}
              </h3>
              <p className="text-muted-foreground mb-4 text-sm">{product.description}</p>
              <div className="flex items-center gap-3 mb-6">
                <p className="text-xl font-bold">₦{product.price.toFixed(0)}</p>
                <p className="text-sm text-muted-foreground line-through">
                  ₦{(product.originalPrice).toFixed(0)}
                </p>
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full px-6 py-3 bg-primary text-primary-foreground hover:bg-opacity-90 transition-all text-sm font-semibold"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <a href="/collection">
            <button className="px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all font-semibold">
              View More
            </button>
          </a>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 marblely-gradient rounded-2xl">
        <div className="mb-16 text-center">
          <p className="text-sm tracking-widest text-muted-foreground uppercase mb-4">Testimonials</p>
          <h2 className="text-5xl mb-6" style={{ fontFamily: "var(--font-serif)" }}>
            Loved by Customers
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-background border border-border rounded-xl p-8 hover:border-primary transition-colors">
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed italic">"{review.text}"</p>
              <p className="font-semibold text-sm">{review.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cart Modal */}
      {showCart && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setShowCart(false)}
        >
          <div
            className="bg-background rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cart Header */}
            <div className="bg-primary text-primary-foreground p-6 sticky top-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-3 rounded-full">
                    <ShoppingCart size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold" style={{ fontFamily: "var(--font-serif)" }}>
                      Your Cart
                    </h3>
                    <p className="text-sm opacity-90">
                      {cart.length} item{cart.length !== 1 ? "s" : ""} selected
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCart(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Cart Items or Empty State */}
            <div className="p-6">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingCart size={64} className="mx-auto text-muted-foreground mb-4 opacity-50" />
                  <h4 className="text-2xl font-bold mb-3" style={{ fontFamily: "var(--font-serif)" }}>
                    Your cart is empty
                  </h4>
                  <p className="text-lg text-muted-foreground mb-8">
                    <span className="font-light tracking-wide">Shop BEADSVILLE and</span>
                    <br />
                    <span className="text-2xl font-serif italic text-foreground bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                      look especial
                    </span>
                  </p>
                  <button
                    onClick={() => setShowCart(false)}
                    className="px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all font-semibold rounded-lg"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-muted rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-lg" style={{ fontFamily: "var(--font-serif)" }}>
                          {item.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">₦{item.price.toFixed(0)}</p>
                      </div>

                      <button
                        onClick={() => removeFromCart(idx)}
                        className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-full transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}

                  {/* Cart Footer */}
                  <div className="border-t border-border pt-6 mt-6 space-y-4">
                    <div className="mb-4">
                      <label className="text-sm font-semibold mb-2 block">Currency</label>
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                      >
                        <option value="NGN">Nigerian Naira (₦)</option>
                        <option value="USD">US Dollar ($)</option>
                        <option value="EUR">Euro (€)</option>
                        <option value="GBP">British Pound (£)</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-muted-foreground">Total</span>
                      <p className="text-2xl font-bold">{currency === "NGN" ? "₦" : currency === "USD" ? "$" : currency === "EUR" ? "€" : "£"}{(cart.reduce((sum, p) => sum + p.price, 0)).toFixed(2)}</p>
                    </div>
                    <button
                      onClick={handleCheckout}
                      disabled={isCheckingOut}
                      className="w-full py-4 bg-primary hover:bg-opacity-90 disabled:opacity-50 text-primary-foreground font-bold text-lg rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    >
                      {isCheckingOut ? (
                        <>
                          <Loader size={20} className="animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={20} />
                          Pay Securely with Stripe
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* About Section */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="marblely-gradient rounded-2xl p-12 md:p-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <p className="text-sm tracking-widest text-muted-foreground uppercase mb-6">Our Story</p>
              <h2 className="text-5xl mb-8" style={{ fontFamily: "var(--font-serif)" }}>
                Crafted with Purpose
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                BEADSVILLE is a Nigerian brand dedicated to creating handcrafted jewelry that celebrates artistry and
                individuality. Every piece is thoughtfully designed and carefully assembled with premium beads and
                delicate chains.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                We believe in creating timeless accessories that become treasured possessions—combining vintage charm with
                contemporary elegance, one piece at a time.
              </p>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="w-72 h-72 md:w-80 md:h-80 rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20251214-WA0044-AF14G4Guj6o67pVzz5ZP5QvtXcuwCl.jpg"
                  alt="BEADSVILLE Workshop - Where the magic happens"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                BEADSVILLE
              </h3>
              <p className="text-sm text-muted-foreground">Your Lucky Charm — Made in Nigeria</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Shop</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>
                  <Link href="/collection" className="hover:text-foreground transition-colors">
                    Bracelets
                  </Link>
                </li>
                <li>
                  <Link href="/collection" className="hover:text-foreground transition-colors">
                    Necklaces
                  </Link>
                </li>
                <li>
                  <Link href="/collection" className="hover:text-foreground transition-colors">
                    Earrings
                  </Link>
                </li>
                <li>
                  <Link href="/collection" className="hover:text-foreground transition-colors">
                    Phone Charms
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Contact</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>
                  <a
                    href="https://wa.me/2349067480528"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href="mailto:beadsville569@gmail.com" className="hover:text-foreground transition-colors">
                    Email
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Follow</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>
                  <a
                    href="https://www.instagram.com/beadsville_beaditt/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <Instagram size={16} />
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://in.pinterest.com/BEADSVILLE/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <Pinterest size={16} />
                    Pinterest
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.tiktok.com/@beadsville?_r=1&_t=ZS-92D87RPYnxZ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                    TikTok
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 BEADSVILLE - Your Lucky Charm. Made in Nigeria with love.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
