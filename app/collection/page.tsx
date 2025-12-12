"use client"
import Link from "next/link"
import { useState } from "react"
import { Instagram, Paintbrush as Pinterest, ShoppingCart } from "lucide-react"

export default function CollectionPage() {
  const [filter, setFilter] = useState("all")
  const [cart, setCart] = useState([])

  const allProducts = [
    {
      id: 1,
      name: "Ruby Heart Necklace",
      category: "necklaces",
      image: "/images/img-20251210-wa0015.jpg",
      price: 45.99,
      originalPrice: 57.49,
      description: "Romantic silver chain necklace featuring a striking red heart pendant with golden spikes.",
    },
    {
      id: 2,
      name: "Garden Bloom Necklace",
      category: "necklaces",
      image: "/images/img-20251210-wa0021.jpg",
      price: 42.5,
      originalPrice: 53.13,
      description: "Vibrant gold chain necklace with mixed gemstone beads in yellow, navy, and green.",
    },
    {
      id: 3,
      name: "Celestial Dreams Necklace",
      category: "necklaces",
      image: "/images/img-20251210-wa0025.jpg",
      price: 48.99,
      originalPrice: 61.24,
      description: "Ethereal gold chain with colorful enamel charms featuring dreamy celestial designs.",
    },
    {
      id: 4,
      name: "Tiger's Eye Protection Necklace",
      category: "necklaces",
      image: "/images/img-20251210-wa0028.jpg",
      price: 52.75,
      originalPrice: 65.94,
      description: "Bold black beaded necklace with natural tiger's eye stone pendant.",
    },
    {
      id: 5,
      name: "Sunshine Harmony Necklace",
      category: "necklaces",
      image: "/images/img-20251210-wa0027.jpg",
      price: 44.25,
      originalPrice: 55.31,
      description: "Cheerful gold chain with yellow, navy, and clear crystal beads.",
    },
    {
      id: 6,
      name: "Sacred Soul Necklace",
      category: "necklaces",
      image: "/images/img-20251210-wa0018.jpg",
      price: 50.5,
      originalPrice: 63.13,
      description: "Spiritual black and silver necklace with protective gothic accents.",
    },
    {
      id: 7,
      name: "Modern Cross Necklace",
      category: "necklaces",
      image: "/images/img-20251210-wa0024.jpg",
      price: 46.99,
      originalPrice: 58.74,
      description: "Contemporary silver chain with intricate cross details and crystal accents.",
    },
    {
      id: 8,
      name: "Golden Medallion Necklace",
      category: "necklaces",
      image: "/images/img-20251210-wa0020.jpg",
      price: 49.75,
      originalPrice: 62.19,
      description: "Elegant gold chain with timeless gold coin medallion pendant.",
    },
  ]

  const filteredProducts = filter === "all" ? allProducts : allProducts.filter((p) => p.category === filter)

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
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <Link href="/">
              <div className="flex-shrink-0 cursor-pointer">
                <img src="/beadsville-logo.jpg" alt="BEADSVILLE - Your Lucky Charm" className="h-20 w-auto" />
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm hover:text-muted-foreground transition-colors">
                Home
              </Link>
              <a href="#collection" className="text-sm hover:text-muted-foreground transition-colors">
                Collection
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

      <div className="bg-black text-white text-center py-3">
        <p className="text-sm font-semibold tracking-wide">EXCLUSIVE: 20% OFF ALL PIECES</p>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <p className="text-sm tracking-widest text-muted-foreground uppercase mb-4">Complete Collection</p>
          <h1 className="text-6xl md:text-7xl leading-tight mb-6" style={{ fontFamily: "var(--font-serif)" }}>
            Explore All Pieces
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Our complete range of handcrafted bracelets, necklaces, and earrings—each meticulously designed with premium
            beads and delicate chains.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap gap-4 justify-center">
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
            onClick={() => setFilter("necklaces")}
            className={`px-6 py-2 border-2 transition-all ${
              filter === "necklaces"
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-foreground hover:border-primary"
            }`}
          >
            Necklaces
          </button>
        </div>
      </section>

      {/* Products Grid */}
      <section id="collection" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-4 relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 text-xs font-semibold">-20%</div>
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                {product.name}
              </h3>
              <p className="text-muted-foreground mb-3 text-sm">{product.description}</p>
              <div className="flex items-center gap-2 mb-4">
                <p className="font-bold">₦{(product.price * 450).toFixed(0)}</p>
                <p className="text-xs text-muted-foreground line-through">
                  ₦{(product.originalPrice * 450).toFixed(0)}
                </p>
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full px-4 py-2 bg-primary text-primary-foreground hover:bg-opacity-90 transition-all text-sm font-semibold"
              >
                Add to Cart
              </button>
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
              Complete Order on WhatsApp
            </button>
          </div>
        </section>
      )}

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
                  <a href="#" className="hover:text-foreground transition-colors">
                    Necklaces
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Bracelets
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
