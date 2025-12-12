"use client"
import Link from "next/link"
import { useState } from "react"
import { Instagram, Paintbrush as Pinterest, ShoppingCart, X, Check, Upload } from "lucide-react"

export default function CollectionPage() {
  const [filter, setFilter] = useState("all")
  const [cart, setCart] = useState([])
  const [showNotification, setShowNotification] = useState(false)
  const [notificationProduct, setNotificationProduct] = useState("")
  const [customOrder, setCustomOrder] = useState({
    type: "necklace",
    description: "",
    images: [],
  })

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
      id: 6,
      name: "Sacred Soul Necklace",
      category: "necklaces",
      image: "/images/img-20251210-wa0018.jpg",
      price: 50.5,
      originalPrice: 63.13,
      description: "Spiritual black and silver necklace with protective gothic accents.",
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
    {
      id: 9,
      name: "Floral Charm Necklace",
      category: "necklaces",
      image: "/images/img-20251210-wa0029.jpg",
      price: 47.99,
      originalPrice: 59.99,
      description: "Stunning gold chain featuring starburst, flower, and vintage medallion charms.",
    },
    {
      id: 10,
      name: "Gothic Cross Necklace",
      category: "necklaces",
      image: "/images/img-20251210-wa0024.jpg",
      price: 51.5,
      originalPrice: 64.38,
      description: "Monochrome silver and black beaded necklace with cross details and hexagonal pendant.",
    },
    {
      id: 11,
      name: "Divine Faith Necklace",
      category: "necklaces",
      image: "/images/img-20251210-wa0022.jpg",
      price: 54.99,
      originalPrice: 68.74,
      description: "Gothic rosary-style necklace with skull beads, pearls, and ornate crucifix pendant.",
    },
    {
      id: 12,
      name: "Barbed Heart Necklace",
      category: "necklaces",
      image: "/images/img-20251210-wa0016.jpg",
      price: 46.75,
      originalPrice: 58.44,
      description: "Edgy silver barbed wire chain with black heart sunburst pendant.",
    },
  ]

  const filteredProducts = filter === "all" ? allProducts : allProducts.filter((p) => p.category === filter)

  const handleAddToCart = (product) => {
    setCart([...cart, product])
    setNotificationProduct(product.name)
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
    }, 3000)
  }

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove))
  }

  const scrollToCart = () => {
    const cartSection = document.getElementById("cart-summary")
    if (cartSection) {
      cartSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const handleCheckout = () => {
    if (cart.length === 0) return
    const cartSummary = cart.map((p) => `${p.name} - ₦${(p.price * 450).toFixed(0)}`).join("%0A")
    const message = `Hi! I'd like to order:%0A${cartSummary}%0A%0ATotal: ₦${(cart.reduce((sum, p) => sum + p.price, 0) * 450).toFixed(0)}`
    window.open(`https://wa.me/2349067480528?text=${message}`, "_blank")
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const imageUrls = files.map((file) => URL.createObjectURL(file))
    setCustomOrder({ ...customOrder, images: [...customOrder.images, ...imageUrls] })
  }

  const removeImage = (indexToRemove) => {
    setCustomOrder({
      ...customOrder,
      images: customOrder.images.filter((_, index) => index !== indexToRemove),
    })
  }

  const handleCustomOrder = () => {
    if (!customOrder.description.trim()) {
      alert("Please describe your custom order")
      return
    }
    const message = `Hi! I'd like to place a custom order:%0A%0AType: ${customOrder.type.charAt(0).toUpperCase() + customOrder.type.slice(1)}%0ADescription: ${customOrder.description}%0A%0A${customOrder.images.length > 0 ? `I have ${customOrder.images.length} reference image(s) to share.` : ""}`
    window.open(`https://wa.me/2349067480528?text=${message}`, "_blank")
    setCustomOrder({ type: "necklace", description: "", images: [] })
  }

  return (
    <div className="bg-background text-foreground">
      {showNotification && (
        <div className="fixed top-20 right-4 z-50 bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-top">
          <Check size={20} />
          <span className="font-semibold">{notificationProduct} added to cart!</span>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <Link href="/">
              <div className="flex-shrink-0 cursor-pointer">
                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/beadsville%20logo%202-AVVceonxZQf3bh1N0tn1UnL0Sb63oD.png" alt="BEADSVILLE - Your Lucky Charm" className="h-20 w-auto" />
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm hover:text-muted-foreground transition-colors">
                Home
              </Link>
              <a href="#collection" className="text-sm hover:text-muted-foreground transition-colors">
                Collection
              </a>
              <div className="relative cursor-pointer" onClick={scrollToCart}>
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
                className="w-full px-4 py-2 bg-primary text-primary-foreground hover:bg-opacity-90 transition-all text-sm font-semibold active:scale-95"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-muted p-8 rounded-lg">
          <div className="text-center mb-8">
            <p className="text-sm tracking-widest text-muted-foreground uppercase mb-4">Personalized</p>
            <h2 className="text-4xl mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              Custom Orders
            </h2>
            <p className="text-muted-foreground">Have something special in mind? Let us create it for you.</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-3">Choose Type</label>
              <div className="grid grid-cols-3 gap-4">
                {["necklace", "earrings", "bracelet"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setCustomOrder({ ...customOrder, type })}
                    className={`px-6 py-3 border-2 transition-all capitalize ${
                      customOrder.type === type
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border hover:border-primary"
                    }`}
                  >
                    {type === "earrings" ? "Earrings" : type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-3">Describe Your Order</label>
              <textarea
                value={customOrder.description}
                onChange={(e) => setCustomOrder({ ...customOrder, description: e.target.value })}
                placeholder="Tell us about colors, style, size, special requests..."
                className="w-full px-4 py-3 border-2 border-border bg-background rounded-lg focus:border-primary focus:outline-none min-h-[120px] resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-3">Upload Reference Images (Optional)</label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="mx-auto mb-3 text-muted-foreground" size={32} />
                  <p className="text-sm text-muted-foreground">Click to upload images or drag and drop</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
                </label>
              </div>

              {customOrder.images.length > 0 && (
                <div className="grid grid-cols-4 gap-3 mt-4">
                  {customOrder.images.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`Reference ${idx + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleCustomOrder}
              className="w-full px-6 py-3 bg-black text-white hover:bg-opacity-90 transition-all font-semibold"
            >
              Send Custom Order Request
            </button>
          </div>
        </div>
      </section>

      {cart.length > 0 && (
        <section id="cart-summary" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-muted p-8 rounded-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold" style={{ fontFamily: "var(--font-serif)" }}>
                Cart Summary
              </h3>
              <p className="text-2xl font-bold">₦{(cart.reduce((sum, p) => sum + p.price, 0) * 450).toFixed(0)}</p>
            </div>
            <div className="mb-6 space-y-3">
              {cart.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between bg-background p-3 rounded">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">₦{(item.price * 450).toFixed(0)}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(idx)}
                    className="ml-4 p-1 hover:bg-muted rounded-full transition-colors"
                    aria-label="Remove item"
                  >
                    <X size={18} className="text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
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
