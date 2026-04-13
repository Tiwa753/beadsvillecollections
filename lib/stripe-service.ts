export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  currency: string
}

export interface CheckoutSession {
  sessionId: string
  url: string
}

// Create checkout session
export async function createCheckoutSession(items: CartItem[], currency: string = 'NGN') {
  try {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items,
        currency: currency.toUpperCase()
      })
    })

    if (!response.ok) {
      throw new Error('Failed to create checkout session')
    }

    const data = await response.json()
    return data as CheckoutSession
  } catch (error) {
    console.error('Checkout error:', error)
    throw error
  }
}

// Format price for display
export function formatPrice(price: number, currency: string): string {
  const symbols: { [key: string]: string } = {
    'NGN': '₦',
    'USD': '$',
    'EUR': '€',
    'GBP': '£'
  }
  return `${symbols[currency] || currency} ${price.toFixed(2)}`
}
