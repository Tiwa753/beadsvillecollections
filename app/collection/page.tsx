"use client"
import Link from "next/link"
import { useState } from "react"
import { Instagram, Paintbrush as Pinterest } from "lucide-react"

export default function CollectionPage() {
  const [filter, setFilter] = useState("all")

  const allProducts = [
    {
      id: 1,
      name: "Ruby Heart Necklace",
      category: "necklaces",
      image: "/images/img-20251210-wa0015.jpg",
      price: "$45.99",
      description:
        "Romantic silver chain necklace featuring a striking red heart pendant with golden spikes and delicate star charm.",
    },
    {
      id: 2,
      name: "Garden Bloom Necklace",
      category: "necklaces",
      image: "/images/img-20251210-wa0021.jpg",
      price: "$42.50",
      description:
        "Vibrant gold chain necklace with mixed gemstone beads in yellow, navy, and green tones, topped with a charming green flower pendant.",
    },
    {
      id: 3,
      name: "Celestial Dreams Necklace",
      category: "necklaces",
      image: "/images/img-20251210-wa0025.jpg",
      price: "$48.99",
      description:
        "Ethereal gold chain necklace with colorful enamel charms featuring dreamy celestial designs in coral, pink, and turquoise.",
    },
    {
      id: 4,
      name: "Tiger's Eye Protection Necklace",
      category: "necklaces",
      image: "/images/img-20251210-wa0028.jpg",
      price: "$52.75",
      description:
        "Bold black beaded necklace with gold accents and natural tiger's eye stone pendant, perfect for grounding energy.",
    },
    {
      id: 5,
      name: "Sunshine Harmony Necklace",
      category: "necklaces",
      image: "/images/img-20251210-wa0027.jpg",
      price: "$44.25",
      description:
        "Cheerful gold chain necklace with yellow, navy, and clear crystal beads plus dual green flower accents for an optimistic touch.",
    },
    {
      id: 6,
      name: "Sacred Soul Necklace",
      category: "necklaces",
      image: "/images/img-20251210-wa0018.jpg",
      price: "$50.50",
      description:
        "Spiritual black and silver necklace featuring cross charms, hematite beads, and gothic metal accents with a protective aura.",
    },
    {
      id: 7,
      name: "Modern Cross Necklace",
      category: "necklaces",
      image: "/images/img-20251210-wa0024.jpg",
      price: "$46.99",
      description:
        "Contemporary silver chain with intricate cross details, hematite spacers, and crystal accents for a sophisticated spiritual statement.",
    },
    {
      id: 8,
      name: "Golden Medallion Necklace",
      category: "necklaces",
      image: "/images/img-20251210-wa0020.jpg",
      price: "$49.75",
      description:
        "Elegant gold chain necklace with yellow jasper and clear crystal beads, finished with a timeless gold coin medallion pendant.",
    },
    {
      id: 9,
      name: "Pearl Drop Earrings",
      category: "earrings",
      image: "/pearl-drop-earrings.png",
      price: "$32.50",
      description: "Classic pearl drop earrings with delicate silver findings.",
    },
    {
      id: 10,
      name: "Boho Beaded Bracelet",
      category: "bracelets",
      image: "/boho-beaded-bracelet.jpg",
      price: "$40.25",
      description: "Colorful beaded bracelet with vintage charm.",
    },
    {
      id: 11,
      name: "Silver Pendant Necklace",
      category: "necklaces",
      image: "/silver-pendant.jpg",
      price: "$44.50",
      description: "Minimalist silver necklace with small pendant.",
    },
    {
      id: 12,
      name: "Chandelier Earrings",
      category: "earrings",
      image: "/chandelier-earrings.jpg",
      price: "$41.99",
      description: "Statement chandelier earrings with intricate details.",
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
                <img src="/beadsville-logo.jpg" alt="BEADSVILLE - Your Lucky Charm" className="h-16 w-auto" />
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
              <p className="text-muted-foreground mb-2">{product.description}</p>
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
