"use client"
import Link from "next/link"
import { useState } from "react"

export default function CollectionPage() {
  const [filter, setFilter] = useState("all")

  const allProducts = [
    {
      id: 1,
      name: "Vintage Pearl Bracelet",
      category: "bracelets",
      image: "/vintage-pearl-bracelet.jpg",
      price: "$42.99",
    },
    {
      id: 2,
      name: "Delicate Chain Necklace",
      category: "necklaces",
      image: "/delicate-chain-necklace.jpg",
      price: "$35.50",
    },
    {
      id: 3,
      name: "Statement Beaded Earrings",
      category: "earrings",
      image: "/statement-beaded-earrings.jpg",
      price: "$28.99",
    },
    {
      id: 4,
      name: "Charm Link Bracelet",
      category: "bracelets",
      image: "/charm-link-bracelet.jpg",
      price: "$48.75",
    },
    {
      id: 5,
      name: "Minimalist Gold Chain",
      category: "necklaces",
      image: "/minimalist-gold-chain.jpg",
      price: "$39.99",
    },
    {
      id: 6,
      name: "Pearl Drop Earrings",
      category: "earrings",
      image: "/pearl-drop-earrings.jpg",
      price: "$32.50",
    },
    {
      id: 7,
      name: "Beaded Stretch Bracelet",
      category: "bracelets",
      image: "/beaded-stretch-bracelet.jpg",
      price: "$45.00",
    },
    {
      id: 8,
      name: "Layered Chain Necklace",
      category: "necklaces",
      image: "/layered-chain-necklace.jpg",
      price: "$52.99",
    },
    {
      id: 9,
      name: "Vintage Hoop Earrings",
      category: "earrings",
      image: "/vintage-hoop-earrings.jpg",
      price: "$36.75",
    },
    {
      id: 10,
      name: "Boho Beaded Bracelet",
      category: "bracelets",
      image: "/boho-beaded-bracelet.jpg",
      price: "$40.25",
    },
    {
      id: 11,
      name: "Silver Pendant Necklace",
      category: "necklaces",
      image: "/silver-pendant-necklace.jpg",
      price: "$44.50",
    },
    {
      id: 12,
      name: "Chandelier Earrings",
      category: "earrings",
      image: "/chandelier-earrings.jpg",
      price: "$41.99",
    },
  ]

  const filteredProducts = filter === "all" ? allProducts : allProducts.filter((p) => p.category === filter)

  return (
    <div className="bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/">
              <div className="flex-shrink-0 cursor-pointer">
                <h1 className="text-3xl font-bold tracking-wider" style={{ fontFamily: "var(--font-serif)" }}>
                  BEADSVILLE
                </h1>
                <p className="text-xs text-muted-foreground tracking-widest mt-1">Handcrafted Jewelry</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="hover:text-muted-foreground transition-colors text-sm">
                Home
              </Link>
              <a href="#collection" className="hover:text-muted-foreground transition-colors text-sm">
                Collection
              </a>
              <Link href="/" className="hover:text-muted-foreground transition-colors text-sm">
                About
              </Link>
              <button className="px-6 py-2 bg-primary text-primary-foreground hover:bg-opacity-90 transition-all">
                Shop Now
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div>
          <p className="text-sm tracking-widest text-muted-foreground uppercase mb-4">Complete Collection</p>
          <h1 className="text-5xl md:text-6xl leading-tight mb-6" style={{ fontFamily: "var(--font-serif)" }}>
            Our Full Jewelry Collection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Explore our entire range of handcrafted bracelets, necklaces, and earrings. Each piece is meticulously
            designed and crafted with premium beads and delicate chains.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2 border-2 transition-all ${
              filter === "all"
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-foreground hover:border-primary"
            }`}
          >
            All Items
          </button>
          <button
            onClick={() => setFilter("bracelets")}
            className={`px-6 py-2 border-2 transition-all ${
              filter === "bracelets"
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-foreground hover:border-primary"
            }`}
          >
            Bracelets
          </button>
          <button
            onClick={() => setFilter("necklaces")}
            className={`px-6 py-2 border-2 transition-all ${
              filter === "necklaces"
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-foreground hover:border-primary"
            }`}
          >
            Necklaces
          </button>
          <button
            onClick={() => setFilter("earrings")}
            className={`px-6 py-2 border-2 transition-all ${
              filter === "earrings"
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-foreground hover:border-primary"
            }`}
          >
            Earrings
          </button>
        </div>
      </section>

      {/* Products Grid */}
      <section id="collection" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-4">
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
      </section>

      {/* Back to Home */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <Link href="/">
            <button className="px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all">
              Back to Home
            </button>
          </Link>
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
