'use client'

import { useState, useEffect } from 'react'
import { products as defaultProducts } from '@/data/products'
import { Edit2, Save, X } from 'lucide-react'

export default function PricesPage() {
  const [products, setProducts] = useState(defaultProducts)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editPrice, setEditPrice] = useState('')
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('beadsville_product_prices')
    if (saved) {
      try {
        const savedPrices = JSON.parse(saved)
        const updated = defaultProducts.map(p => ({
          ...p,
          price: savedPrices[p.id] || p.price
        }))
        setProducts(updated)
      } catch (e) {
        console.error('Error loading prices:', e)
      }
    }
  }, [])

  const handleLogin = () => {
    if (password === 'beadsville2025') {
      setIsAuthenticated(true)
      setPassword('')
    } else {
      alert('Incorrect password')
    }
  }

  const handleEditPrice = (productId: number, currentPrice: number) => {
    setEditingId(productId)
    setEditPrice(currentPrice.toString())
  }

  const handleSavePrice = (productId: number) => {
    const newPrice = parseFloat(editPrice)
    if (isNaN(newPrice) || newPrice < 0) {
      alert('Please enter a valid price')
      return
    }

    const updated = products.map(p =>
      p.id === productId ? { ...p, price: newPrice } : p
    )
    setProducts(updated)

    // Save to localStorage
    const prices: Record<number, number> = {}
    updated.forEach(p => {
      prices[p.id] = p.price
    })
    localStorage.setItem('beadsville_product_prices', JSON.stringify(prices))

    setEditingId(null)
    setEditPrice('')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-purple-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full">
          <h1 className="text-2xl font-bold mb-6 text-center" style={{ fontFamily: 'var(--font-serif)' }}>
            Price Manager
          </h1>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleLogin}
            className="w-full px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold" style={{ fontFamily: 'var(--font-serif)' }}>
            Edit Prices
          </h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg font-semibold transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid gap-4">
          {products.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex items-center justify-between"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-lg" style={{ fontFamily: 'var(--font-serif)' }}>
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500">{product.category}</p>
              </div>

              {editingId === product.id ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
                    <span className="text-gray-600">₦</span>
                    <input
                      type="number"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      autoFocus
                      className="w-24 bg-transparent font-bold focus:outline-none"
                      step="0.01"
                      min="0"
                    />
                  </div>
                  <button
                    onClick={() => handleSavePrice(product.id)}
                    className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save size={18} />
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="p-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold">₦{product.price.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => handleEditPrice(product.id, product.price)}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
