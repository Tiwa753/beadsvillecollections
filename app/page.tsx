"use client"

import { Star } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const products = [
    {
      id: 1,
      name: "Vintage Pearl Bracelet",
      image: "/vintage-pearl-bracelet.jpg",
      price: "$42.99",
    },
    {
      id: 2,
      name: "Delicate Chain Necklace",
      image: "/delicate-chain-necklace.jpg",
      price: "$35.50",
    },
    {
      id: 3,
      name: "Statement Beaded Earrings",
      image: "/statement-beaded-earrings.jpg",
      price: "$28.99",
    },
    {
      id: 4,
      name: "Charm Link Bracelet",
      image: "/charm-link-bracelet.jpg",
      price: "$48.75",
    },
  ]

  const reviews = [
    {
      id: 1,
      name: "Emma Richardson",
      role: "Fashion Enthusiast",
      rating: 5,
      text: "The quality and attention to detail on every piece is incredible. I've received so many compliments on my necklaces. BEADSVILLE's jewelry is truly special.",
      image: "/professional-woman-portrait.png",
    },
    {
      id: 2,
      name: "Marcus Chen",
      role: "Gift Buyer",
      rating: 5,
      text: "I gift BEADSVILLE jewelry to my loved ones. Each bracelet and necklace comes beautifully presented. The craftsmanship speaks for itself.",
      image: "/professional-man-portrait.png",
    },
    {
      id: 3,
      name: "Sophie Laurent",
      role: "Jewelry Collector",
      rating: 5,
      text: "Finally found a brand that combines vintage aesthetic with modern elegance. My earrings and bracelets are everyday staples now. Highly recommend!",
      image: "/smiling-woman-portrait.png",
    },
  ]

  return (
    <div className="bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0">
              <h1 className="text-3xl font-bold tracking-wider" style={{ fontFamily: "var(--font-serif)" }}>
                BEADSVILLE
              </h1>
              <p className="text-xs text-muted-foreground tracking-widest mt-1">Handcrafted Jewelry</p>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#products" className="hover:text-muted-foreground transition-colors text-sm">
                Jewelry
              </a>
              <a href="#reviews" className="hover:text-muted-foreground transition-colors text-sm">
                Reviews
              </a>
              <a href="#about" className="hover:text-muted-foreground transition-colors text-sm">
                About
              </a>
              <button className="px-6 py-2 bg-primary text-primary-foreground hover:bg-opacity-90 transition-all">
                Shop Now
              </button>
            </nav>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {isMenuOpen && (
            <nav className="md:hidden pb-4 flex flex-col gap-4">
              <a href="#products" className="text-sm hover:text-muted-foreground">
                Jewelry
              </a>
              <a href="#reviews" className="text-sm hover:text-muted-foreground">
                Reviews
              </a>
              <a href="#about" className="text-sm hover:text-muted-foreground">
                About
              </a>
              <button className="px-6 py-2 bg-primary text-primary-foreground hover:bg-opacity-90 transition-all w-full">
                Shop Now
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm tracking-widest text-muted-foreground uppercase mb-4">Est. 2018</p>
            <h2 className="text-5xl md:text-6xl leading-tight mb-6" style={{ fontFamily: "var(--font-serif)" }}>
              Timeless Jewelry with Soul
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-md">
              Discover our handcrafted collection of bracelets, necklaces, and earrings. Each piece features carefully
              selected beads strung on delicate chains, combining vintage charm with contemporary elegance.
            </p>
            <button className="px-8 py-3 bg-primary text-primary-foreground hover:bg-opacity-90 transition-all inline-block">
              Explore Collection
            </button>
          </div>
          <div className="aspect-square bg-muted rounded-lg overflow-hidden">
            <img
              src="/jewelry-collection-hero.jpg"
              alt="BEADSVILLE handcrafted jewelry collection"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-16">
          <p className="text-sm tracking-widest text-muted-foreground uppercase mb-4">Featured</p>
          <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: "var(--font-serif)" }}>
            Our Jewelry Collections
          </h2>
          <div className="w-16 h-1 bg-primary"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-4 relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                {product.name}
              </h3>
              <div className="flex justify-between items-center">
                <p className="text-muted-foreground">{product.price}</p>
                <button className="text-sm underline hover:text-primary transition-colors">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link href="/collection">
            <button className="px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all">
              View More
            </button>
          </Link>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="mb-16">
          <p className="text-sm tracking-widest text-muted-foreground uppercase mb-4">Testimonials</p>
          <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: "var(--font-serif)" }}>
            What Our Customers Say
          </h2>
          <div className="w-16 h-1 bg-primary"></div>
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

      {/* About Section */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="aspect-square bg-muted rounded-lg overflow-hidden">
            <img
              src="/beadsville-craft-studio.jpg"
              alt="BEADSVILLE craft studio"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm tracking-widest text-muted-foreground uppercase mb-4">Our Story</p>
            <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: "var(--font-serif)" }}>
              Crafted with Passion
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Founded in 2018, BEADSVILLE emerged from a simple passion: to create beautiful, handcrafted jewelry that
              celebrates artistry and individuality. Every bracelet, necklace, and pair of earrings is thoughtfully
              designed and carefully assembled.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We combine vintage-inspired beads with quality chains to create timeless pieces that become treasured
              accessories. From delicate everyday wear to statement pieces, each creation reflects our commitment to
              craftsmanship and attention to detail.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-3xl font-bold mb-2">2K+</p>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
              <div>
                <p className="text-3xl font-bold mb-2">500+</p>
                <p className="text-sm text-muted-foreground">Unique Pieces</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-primary text-primary-foreground p-12 md:p-20 text-center rounded-lg">
          <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: "var(--font-serif)" }}>
            Find Your Perfect Piece
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Discover handcrafted bracelets, necklaces, and earrings that bring elegance to your everyday life.
          </p>
          <button className="px-8 py-3 bg-primary-foreground text-primary hover:bg-opacity-90 transition-all inline-block font-semibold">
            Shop Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                BEADSVILLE
              </h3>
              <p className="text-sm text-muted-foreground">Timeless jewelry for modern souls.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Shop</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Bracelets
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Necklaces
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Earrings
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Support</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Shipping
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Follow</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Pinterest
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Newsletter
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 BEADSVILLE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
