'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)
  const [orderDetails, setOrderDetails] = useState<any>(null)

  useEffect(() => {
    if (sessionId) {
      // Fetch session details from your backend
      fetch(`/api/checkout/session/${sessionId}`)
        .then(res => res.json())
        .then(data => {
          setOrderDetails(data)
          setLoading(false)
        })
        .catch(err => {
          console.error('Error fetching order:', err)
          setLoading(false)
        })
    }
  }, [sessionId])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="bg-green-100 rounded-full p-4">
            <CheckCircle size={48} className="text-green-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-2 text-gray-900" style={{ fontFamily: "var(--font-serif)" }}>
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your order. Your payment has been processed successfully.
        </p>

        {loading ? (
          <p className="text-gray-500">Loading order details...</p>
        ) : orderDetails ? (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-gray-600">Order ID</p>
            <p className="font-mono text-sm font-bold text-gray-900 break-all">{sessionId}</p>
          </div>
        ) : null}

        <p className="text-sm text-gray-600 mb-6">
          A confirmation email has been sent to you. We'll ship your order shortly!
        </p>

        <Link href="/collection">
          <button className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-opacity-90 transition-all">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  )
}
