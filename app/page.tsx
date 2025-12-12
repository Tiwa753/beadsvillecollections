"use client"

import { Star, Instagram, Paintbrush as Pinterest, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Home() {
  const [cart, setCart] = useState([])

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

  const reviews = [
    {
      id: 1,
      name: "Emma Richardson",
      role: "Fashion Enthusiast",
      rating: 5,
      text: "The quality and attention to detail on every piece is incredible. I've received so many compliments on my necklaces.",
      image: "/professional-woman-portrait.png",
    },
    {
      id: 2,
      name: "Marcus Chen",
      role: "Gift Buyer",
      rating: 5,
      text: "I gift BEADSVILLE jewelry to my loved ones. Each bracelet and necklace comes beautifully presented.",
      image: "/professional-man-portrait.png",
    },
    {
      id: 3,
      name: "Sophie Laurent",
      role: "Jewelry Collector",
      rating: 5,
      text: "Finally found a brand that combines vintage aesthetic with modern elegance. Highly recommend!",
      image: "/smiling-woman-portrait.png",
    },
  ]

  const handleAddToCart = (product) => {
    setCart([...cart, product])
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

            <nav className="hidden md:flex items-center gap-8">
              <a href="#products" className="text-sm hover:text-muted-foreground transition-colors">
                Collection
              </a>
              <a href="#reviews" className="text-sm hover:text-muted-foreground transition-colors">
                Reviews
              </a>
              <a href="#about" className="text-sm hover:text-muted-foreground transition-colors">
                About
              </a>
              <div className="relative">
                <ShoppingCart size={20} className="cursor-pointer" />
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

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
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
          <Link href="/collection">
            <button className="px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all font-semibold">
              View More
            </button>
          </Link>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="mb-16 text-center">
          <p className="text-sm tracking-widest text-muted-foreground uppercase mb-4">Testimonials</p>
          <h2 className="text-5xl mb-6" style={{ fontFamily: "var(--font-serif)" }}>
            Loved by Customers
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="border border-border p-8 hover:border-primary transition-colors">
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed italic">"{review.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
                  <img
                    src={review.image || "/placeholder.svg"}
                    alt={review.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {cart.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-muted p-8 rounded-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold" style={{ fontFamily: "var(--font-serif)" }}>
                Cart Summary
              </h3>
              <p className="text-2xl font-bold">₦{(cart.reduce((sum, p) => sum + p.price, 0) * 450).toFixed(0)}</p>
            </div>
            <div className="mb-6 space-y-2">
              {cart.map((item, idx) => (
                <p key={idx} className="text-sm text-muted-foreground">
                  {item.name} - ₦{(item.price * 450).toFixed(0)}
                </p>
              ))}
            </div>
            <button
              onClick={handleCheckout}
              className="w-full px-6 py-3 bg-black text-white hover:bg-opacity-90 transition-all font-semibold"
            >
              Proceed to WhatsApp
            </button>
          </div>
        </section>
      )}

      {/* About Section */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm tracking-widest text-muted-foreground uppercase mb-6">Our Story</p>
          <h2 className="text-5xl mb-8" style={{ fontFamily: "var(--font-serif)" }}>
            Crafted with Purpose
          </h2>
          <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
            BEADSVILLE is a Nigerian brand dedicated to creating handcrafted jewelry that celebrates artistry and
            individuality. Every piece is thoughtfully designed and carefully assembled with premium beads and delicate
            chains.
          </p>
          <p className="text-muted-foreground leading-relaxed text-lg">
            We believe in creating timeless accessories that become treasured possessions—combining vintage charm with
            contemporary elegance, one piece at a time.
          </p>
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
                  <a href="#" className="hover:text-foreground transition-colors">
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
