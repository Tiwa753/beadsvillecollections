"use client"

import { Star, Instagram, Paintbrush as Pinterest, ShoppingCart, X } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { reviews as defaultReviews, type Review } from "@/data/products"

export default function Home() {
  const [reviews, setReviews] = useState<Review[]>(defaultReviews)
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("beadsville_reviews")
    if (saved) {
      try {
        setReviews(JSON.parse(saved))
      } catch (e) {
        setReviews(defaultReviews)
      }
    }
  }, [])

  const featuredProducts = [
    {
      id: 1,
      name: "Ruby Heart Necklace",
      image: "/images/img-20251210-wa0015.jpg",
      price: 45.99,
      originalPrice: 57.49,
      description: "Romantic silver chain with striking red heart pendant",
    },
    {
      id: 2,
      name: "Garden Bloom Necklace",
      image: "/images/img-20251210-wa0021.jpg",
      price: 42.5,
      originalPrice: 53.13,
      description: "Vibrant gold chain with mixed gemstone beads",
    },
    {
      id: 3,
      name: "Celestial Dreams Necklace",
      image: "/images/img-20251210-wa0025.jpg",
      price: 48.99,
      originalPrice: 61.24,
      description: "Ethereal gold chain with colorful enamel charms",
    },
  ]

  const handleAddToCart = (product) => {
    setCart([...cart, product])
  }

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove))
  }

  const scrollToCart = () => {
    setShowCart(true)
  }

  const handleCheckout = () => {
    if (cart.length === 0) return
    const cartSummary = cart.map((p) => `${p.name} - ₦${(p.price * 450).toFixed(0)}`).join("%0A")
    const message = `Hi! I'd like to order:%0A${cartSummary}%0A%0ATotal: ₦${(cart.reduce((sum, p) => sum + p.price, 0) * 450).toFixed(0)}`
    window.open(`https://wa.me/2349067480528?text=${message}`, "_blank")
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

      <div className="text-white text-center py-3 bg-destructive">
        <p className="text-sm font-semibold tracking-wide">EXCLUSIVE: 20% OFF ALL PIECES - CHRISTMAS EDITION</p>
      </div>

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
                <p className="text-xl font-bold">₦{(product.price * 450).toFixed(0)}</p>
                <p className="text-sm text-muted-foreground line-through">
                  ₦{(product.originalPrice * 450).toFixed(0)}
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
                        <p className="text-sm text-muted-foreground">₦{(item.price * 450).toFixed(0)}</p>
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
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Total</span>
                      <p className="text-2xl font-bold">₦{(cart.reduce((sum, p) => sum + p.price, 0) * 450).toFixed(0)}</p>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                    >
                      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      Complete Order on WhatsApp
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
