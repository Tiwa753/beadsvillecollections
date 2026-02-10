"use client"
import Link from "next/link"
import type React from "react"

import { useState, useEffect } from "react"
import { Instagram, Paintbrush as Pinterest, ShoppingCart, X, Check, Upload, ChevronLeft, ChevronRight, Plus, Minus, Sparkles, Package } from "lucide-react"
import { products as defaultProducts, type Product } from "@/data/products"

interface CartItem extends Product {
  quantity: number
}

export default function CollectionPage() {
  const [allProducts, setAllProducts] = useState<Product[]>(defaultProducts)
  const [filter, setFilter] = useState("all")
  const [cart, setCart] = useState<CartItem[]>([])
  const [showNotification, setShowNotification] = useState(false)
  const [notificationProduct, setNotificationProduct] = useState("")

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const [customOrder, setCustomOrder] = useState({
    type: "necklace",
    description: "",
    images: [] as string[],
    imageFiles: [] as File[],
  })

  useEffect(() => {
    const saved = localStorage.getItem("beadsville_products")
    if (saved) {
      try {
        setAllProducts(JSON.parse(saved))
      } catch (e) {
        setAllProducts(defaultProducts)
      }
    }
  }, [])

  const filteredProducts = filter === "all" ? allProducts : allProducts.filter((p) => p.category === filter)

  const handleAddToCart = (product: Product, qty = 1) => {
    const existingIndex = cart.findIndex((item) => item.id === product.id)
    if (existingIndex >= 0) {
      const newCart = [...cart]
      newCart[existingIndex].quantity += qty
      setCart(newCart)
    } else {
      setCart([...cart, { ...product, quantity: qty }])
    }
    setNotificationProduct(`${qty}x ${product.name}`)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
    setSelectedProduct(null)
    setQuantity(1)
    setCurrentImageIndex(0)
  }

  const removeFromCart = (indexToRemove: number) => {
    setCart(cart.filter((_, index) => index !== indexToRemove))
  }

  const updateCartQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(index)
    } else {
      const newCart = [...cart]
      newCart[index].quantity = newQty
      setCart(newCart)
    }
  }

  const scrollToCart = () => {
    const cartSection = document.getElementById("cart-summary")
    if (cartSection) {
      cartSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const getTotalItems = () => cart.reduce((sum, item) => sum + item.quantity, 0)
  const getTotalPrice = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = () => {
    if (cart.length === 0) return
    const cartSummary = cart.map((p) => `${p.quantity}x ${p.name} - ₦${(p.price * p.quantity).toFixed(0)}`).join("%0A")
    const message = `Hi! I'd like to order:%0A${cartSummary}%0A%0ATotal: ₦${getTotalPrice().toFixed(0)}`
    window.open(`https://wa.me/2349067480528?text=${message}`, "_blank")
  }

  const nextImage = () => {
    if (selectedProduct?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProduct.images!.length)
    }
  }

  const prevImage = () => {
    if (selectedProduct?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProduct.images!.length) % selectedProduct.images!.length)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const imageUrls = files.map((file) => URL.createObjectURL(file))
    setCustomOrder({
      ...customOrder,
      images: [...customOrder.images, ...imageUrls],
      imageFiles: [...customOrder.imageFiles, ...files],
    })
  }

  const removeImage = (indexToRemove: number) => {
    setCustomOrder({
      ...customOrder,
      images: customOrder.images.filter((_, index) => index !== indexToRemove),
      imageFiles: customOrder.imageFiles.filter((_, index) => index !== indexToRemove),
    })
  }

  const handleCustomOrder = async () => {
    if (!customOrder.description.trim()) {
      alert("Please describe your custom order")
      return
    }

    let message = `Hi! I'd like to place a custom order:%0A%0AType: ${customOrder.type.charAt(0).toUpperCase() + customOrder.type.slice(1)}%0ADescription: ${customOrder.description}`

    if (customOrder.imageFiles.length > 0) {
      message += `%0A%0AReference Images: ${customOrder.imageFiles.length} image(s) attached`
    }

    window.open(`https://wa.me/2349067480528?text=${message}`, "_blank")

    setTimeout(() => {
      if (customOrder.images.length > 0) {
        alert(
          `Your custom order message has been sent! Please send the ${customOrder.images.length} reference image(s) in the WhatsApp conversation.`,
        )
      }
      setCustomOrder({ type: "necklace", description: "", images: [], imageFiles: [] })
    }, 1000)
  }

  return (
    <div className="bg-background text-foreground">
      {showNotification && (
        <div className="fixed top-20 right-4 z-50 bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-top">
          <Check size={20} />
          <span className="font-semibold">{notificationProduct} added to cart!</span>
        </div>
      )}

      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => {
            setSelectedProduct(null)
            setQuantity(1)
            setCurrentImageIndex(0)
          }}
        >
          <div
            className="bg-background rounded-2xl max-w-sm w-full max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Slideshow */}
            <div className="relative aspect-square bg-muted flex-shrink-0">
              <img
                src={selectedProduct.images?.[currentImageIndex] || selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />

              {/* Slideshow Navigation */}
              {selectedProduct.images && selectedProduct.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>

                  {/* Image Indicators */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {selectedProduct.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Close Button */}
              <button
                onClick={() => {
                  setSelectedProduct(null)
                  setQuantity(1)
                  setCurrentImageIndex(0)
                }}
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-colors"
              >
                <X size={18} />
              </button>

              {/* Discount Badge */}
              <div className="absolute top-3 left-3 bg-destructive text-white px-2 py-1 text-xs font-bold rounded">
                -20% OFF
              </div>
            </div>

            {/* Product Details - Scrollable */}
            <div className="p-5 overflow-y-auto flex-1">
              <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                {selectedProduct.name}
              </h2>
              <p className="text-muted-foreground mb-3 text-sm">{selectedProduct.description}</p>

              <div className="flex items-center gap-2 mb-5">
                <span className="text-2xl font-bold">₦{selectedProduct.price.toFixed(0)}</span>
                <span className="text-sm text-muted-foreground line-through">
                  ₦{(selectedProduct.originalPrice * 450).toFixed(0)}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-5">
                <span className="text-sm font-semibold">Qty:</span>
                <div className="flex items-center gap-2 bg-muted rounded-lg p-0.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 hover:bg-background rounded transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center font-bold text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 hover:bg-background rounded transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(selectedProduct, quantity)}
                className="w-full py-3 bg-primary text-primary-foreground font-bold text-sm hover:bg-opacity-90 transition-all rounded-lg flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <Link href="/">
              <div className="flex-shrink-0 cursor-pointer">
                <img
                  src="/images/beadsville-20logo-202.png"
                  alt="BEADSVILLE - Your Lucky Charm"
                  className="h-20 w-auto"
                />
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
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>

      <div className="text-white text-center py-3 bg-destructive">
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
            Our complete range of handcrafted bracelets, necklaces, phone charms, and earrings—each meticulously
            designed with premium beads and delicate chains.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap gap-4 justify-center">
          {["all", "necklaces", "phone-charms", "bracelets", "earrings"].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-6 py-2 border-2 transition-all ${
                filter === filterOption
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-foreground hover:border-primary"
              }`}
            >
              {filterOption === "all"
                ? "All Items"
                : filterOption === "phone-charms"
                  ? "Phone Charms"
                  : filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid - Made products clickable to open modal */}
      <section id="collection" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer" onClick={() => setSelectedProduct(product)}>
              <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-4 relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 text-xs font-semibold">-20%</div>
                {/* Image count indicator */}
                {product.images && product.images.length > 1 && (
                  <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 text-xs rounded flex items-center gap-1">
                    <span>{product.images.length} photos</span>
                  </div>
                )}
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                {product.name}
              </h3>
              <p className="text-muted-foreground mb-3 text-sm line-clamp-2">{product.description}</p>
              <div className="flex items-center gap-2 mb-4">
                <p className="font-bold">₦{product.price.toFixed(0)}</p>
                <p className="text-xs text-muted-foreground line-through">
                  ₦{(product.originalPrice * 450).toFixed(0)}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedProduct(product)
                }}
                className="w-full px-4 py-2 bg-primary text-primary-foreground hover:bg-opacity-90 transition-all text-sm font-semibold active:scale-95"
              >
                View & Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Orders Section */}
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["necklace", "earrings", "bracelet", "phone-charm"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setCustomOrder({ ...customOrder, type })}
                    className={`px-4 py-3 border-2 transition-all capitalize text-sm ${
                      customOrder.type === type
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border hover:border-primary"
                    }`}
                  >
                    {type === "phone-charm" ? "Phone Charm" : type.charAt(0).toUpperCase() + type.slice(1)}
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
              className="w-full px-6 py-3 bg-black text-white hover:bg-opacity-90 transition-all font-semibold rounded-lg"
            >
              Send Custom Order Request
            </button>
          </div>
        </div>
      </section>

      {cart.length > 0 && (
        <section id="cart-summary" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-br from-muted to-muted/50 rounded-2xl overflow-hidden shadow-xl border border-border">
            {/* Cart Header */}
            <div className="bg-primary text-primary-foreground p-6">
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
                      {getTotalItems()} item{getTotalItems() !== 1 ? "s" : ""} selected
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-90">Total</p>
                  <p className="text-3xl font-bold">₦{getTotalPrice().toFixed(0)}</p>
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="p-6 space-y-4">
              {cart.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-background rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-lg truncate" style={{ fontFamily: "var(--font-serif)" }}>
                      {item.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">₦{item.price.toFixed(0)} each</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                    <button
                      onClick={() => updateCartQuantity(idx, item.quantity - 1)}
                      className="p-2 hover:bg-background rounded transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(idx, item.quantity + 1)}
                      className="p-2 hover:bg-background rounded transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-right w-24">
                    <p className="font-bold text-lg">₦{(item.price * item.quantity).toFixed(0)}</p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(idx)}
                    className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Footer */}
            <div className="border-t border-border p-6 bg-background/50">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    
                    
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles size={18} />
                    <span>Gift wrapping available</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Subtotal</p>
                  <p className="text-2xl font-bold">₦{getTotalPrice().toFixed(0)}</p>
                </div>
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
                    Earrings
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Bracelets
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Phone Charms
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
            <p>&copy; 2025 BEADSVILLE - Your Lucky Charm</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
