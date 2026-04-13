import { NextRequest, NextResponse } from 'next/server'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// Currency to smallest unit conversion
const currencyDecimals: { [key: string]: number } = {
  'NGN': 1,
  'USD': 100,
  'EUR': 100,
  'GBP': 100,
  'ZAR': 1,
  'KES': 1,
  'GHS': 1
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, currency = 'NGN' } = body

    const currencyUpper = currency.toUpperCase()
    const decimals = currencyDecimals[currencyUpper] || 100

    // Create line items for Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: currencyUpper.toLowerCase(),
        product_data: {
          name: item.name,
          description: item.description || ''
        },
        unit_amount: Math.round(item.price * decimals)
      },
      quantity: item.quantity
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/collection`,
      locale: 'auto'
    })

    return NextResponse.json({
      sessionId: session.id,
      url: session.url
    })
  } catch (error: any) {
    console.error('Stripe error:', error)
    return NextResponse.json(
      { error: error.message || 'Checkout failed' },
      { status: 500 }
    )
  }
}
