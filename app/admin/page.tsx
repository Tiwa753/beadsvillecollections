"use client"
import { useState, useEffect } from "react"
import { Save, Lock, Trash2, Plus } from "lucide-react"
import { products, reviews } from "@/data/products"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [editingProducts, setEditingProducts] = useState(products)
  const [editingReviews, setEditingReviews] = useState(reviews)
  const [activeTab, setActiveTab] = useState("products")

  const ADMIN_PASSWORD = "beadsville2025"

  useEffect(() => {
    if (isAuthenticated) {
      const savedProducts = localStorage.getItem("beadsville_products")
      const savedReviews = localStorage.getItem("beadsville_reviews")

      if (savedProducts) {
        try {
          setEditingProducts(JSON.parse(savedProducts))
        } catch (e) {
          setEditingProducts(products)
        }
      }

      if (savedReviews) {
        try {
          setEditingReviews(JSON.parse(savedReviews))
        } catch (e) {
          setEditingReviews(reviews)
        }
      }
    }
  }, [isAuthenticated])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setPassword("")
    } else {
      alert("Incorrect password")
      setPassword("")
    }
  }

  const handleProductChange = (id, field, value) => {
    setEditingProducts(editingProducts.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
  }

  const handleAddProduct = () => {
    const newId = Math.max(...editingProducts.map((p) => p.id), 0) + 1
    setEditingProducts([
      ...editingProducts,
      {
        id: newId,
        name: "New Product",
        category: "necklaces",
        image: "/placeholder.svg",
        price: 0,
        originalPrice: 0,
        description: "Product description",
      },
    ])
  }

  const handleDeleteProduct = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setEditingProducts(editingProducts.filter((p) => p.id !== id))
    }
  }

  const handleReviewChange = (id, field, value) => {
    setEditingReviews(editingReviews.map((r) => (r.id === id ? { ...r, [field]: value } : r)))
  }

  const handleAddReview = () => {
    const newId = Math.max(...editingReviews.map((r) => r.id), 0) + 1
    setEditingReviews([
      ...editingReviews,
      {
        id: newId,
        name: "New Reviewer",
        rating: 5,
        text: "Review text",
      },
    ])
  }

  const handleDeleteReview = (id) => {
    if (confirm("Are you sure you want to delete this review?")) {
      setEditingReviews(editingReviews.filter((r) => r.id !== id))
    }
  }

  const saveChanges = async () => {
    try {
      localStorage.setItem("beadsville_products", JSON.stringify(editingProducts))
      localStorage.setItem("beadsville_reviews", JSON.stringify(editingReviews))
      alert("Changes saved successfully!")
    } catch (error) {
      alert("Error saving changes: " + error.message)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-muted p-8 rounded-lg border border-border">
          <div className="flex items-center justify-center mb-6 gap-2">
            <Lock size={24} />
            <h1 className="text-2xl font-bold">Admin Panel</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-2 border-2 border-border bg-background rounded-lg focus:border-primary focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-primary text-primary-foreground font-semibold hover:bg-opacity-90 transition-all"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-serif)" }}>
              BEADSVILLE Admin Panel
            </h1>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 border border-border hover:bg-muted transition-colors text-sm font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-6 py-3 font-semibold border-b-2 transition-all ${
              activeTab === "products"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Products ({editingProducts.length})
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-6 py-3 font-semibold border-b-2 transition-all ${
              activeTab === "reviews"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Reviews ({editingReviews.length})
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="bg-muted p-4 rounded-lg flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Edit product details or add new products.</p>
              <button
                onClick={handleAddProduct}
                className="px-4 py-2 bg-primary text-primary-foreground font-semibold hover:bg-opacity-90 transition-all flex items-center gap-2 text-sm"
              >
                <Plus size={18} />
                Add Product
              </button>
            </div>

            {editingProducts.map((product) => (
              <div
                key={product.id}
                className="border border-border rounded-lg p-6 hover:border-primary transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={product.name}
                      onChange={(e) => handleProductChange(product.id, "name", e.target.value)}
                      className="text-xl font-semibold bg-transparent border-b border-border focus:border-primary outline-none w-full mb-2 pb-1"
                    />
                    <select
                      value={product.category}
                      onChange={(e) => handleProductChange(product.id, "category", e.target.value)}
                      className="text-sm text-muted-foreground bg-background border border-border rounded px-2 py-1"
                    >
                      <option value="necklaces">Necklaces</option>
                      <option value="phone-charms">Phone Charms</option>
                      <option value="bracelets">Bracelets</option>
                    </select>
                  </div>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="p-2 hover:bg-destructive hover:text-destructive-foreground rounded transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Price (NGN)</label>
                    <input
                      type="number"
                      step="1000"
                      value={product.price}
                      onChange={(e) => handleProductChange(product.id, "price", Number.parseFloat(e.target.value))}
                      className="w-full px-4 py-2 border-2 border-border bg-background rounded-lg focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Original Price (NGN)</label>
                    <input
                      type="number"
                      step="1000"
                      value={product.originalPrice}
                      onChange={(e) =>
                        handleProductChange(product.id, "originalPrice", Number.parseFloat(e.target.value))
                      }
                      className="w-full px-4 py-2 border-2 border-border bg-background rounded-lg focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Description</label>
                  <textarea
                    value={product.description}
                    onChange={(e) => handleProductChange(product.id, "description", e.target.value)}
                    className="w-full px-4 py-2 border-2 border-border bg-background rounded-lg focus:border-primary focus:outline-none min-h-[80px] resize-none"
                  />
                </div>
              </div>
            ))}

            <button
              onClick={saveChanges}
              className="w-full px-6 py-3 bg-primary text-primary-foreground font-semibold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
            >
              <Save size={20} />
              Save All Changes
            </button>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div className="space-y-6">
            <div className="bg-muted p-4 rounded-lg flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Edit reviews or add new customer testimonials.</p>
              <button
                onClick={handleAddReview}
                className="px-4 py-2 bg-primary text-primary-foreground font-semibold hover:bg-opacity-90 transition-all flex items-center gap-2 text-sm"
              >
                <Plus size={18} />
                Add Review
              </button>
            </div>

            {editingReviews.map((review) => (
              <div
                key={review.id}
                className="border border-border rounded-lg p-6 hover:border-primary transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={review.name}
                      onChange={(e) => handleReviewChange(review.id, "name", e.target.value)}
                      className="text-lg font-semibold bg-transparent border-b border-border focus:border-primary outline-none w-full mb-2 pb-1"
                    />
                    <div className="flex gap-2 items-center">
                      <label className="text-sm font-semibold">Rating:</label>
                      <select
                        value={review.rating}
                        onChange={(e) => handleReviewChange(review.id, "rating", Number.parseInt(e.target.value))}
                        className="bg-background border border-border rounded px-3 py-1"
                      >
                        <option value="1">1 Star</option>
                        <option value="2">2 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="5">5 Stars</option>
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    className="p-2 hover:bg-destructive hover:text-destructive-foreground rounded transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Review Text</label>
                  <textarea
                    value={review.text}
                    onChange={(e) => handleReviewChange(review.id, "text", e.target.value)}
                    className="w-full px-4 py-2 border-2 border-border bg-background rounded-lg focus:border-primary focus:outline-none min-h-[80px] resize-none"
                  />
                </div>
              </div>
            ))}

            <button
              onClick={saveChanges}
              className="w-full px-6 py-3 bg-primary text-primary-foreground font-semibold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
            >
              <Save size={20} />
              Save All Changes
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
