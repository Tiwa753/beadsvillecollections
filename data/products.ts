export interface Product {
  id: number
  name: string
  category: "necklaces" | "phone-charms" | "bracelets"
  image: string
  price: number
  originalPrice: number
  description: string
}

export interface Review {
  id: number
  name: string
  role: string
  rating: number
  text: string
  image: string
}

export const products: Product[] = [
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
  {
    id: 13,
    name: "Smiley Sunshine Charm",
    category: "phone-charms",
    image: "/images/img-20251212-wa0064.jpg",
    price: 15.99,
    originalPrice: 19.99,
    description: "Cheerful yellow and black smiley face beaded phone charm.",
  },
  {
    id: 14,
    name: "Pink Candy Dream Charm",
    category: "phone-charms",
    image: "/images/img-20251212-wa0053.jpg",
    price: 16.5,
    originalPrice: 20.63,
    description: "Sweet pink and white phone charm with candy and flower shaped beads.",
  },
  {
    id: 15,
    name: "Pastel Stars Charm",
    category: "phone-charms",
    image: "/images/img-20251212-wa0052.jpg",
    price: 17.25,
    originalPrice: 21.56,
    description: "Dreamy blue and pink pastel phone charm with flower and star beads.",
  },
  {
    id: 16,
    name: "Pearl Heart Charm",
    category: "phone-charms",
    image: "/images/img-20251212-wa0021.jpg",
    price: 18.99,
    originalPrice: 23.74,
    description: "Elegant pink and white pearl phone charm with heart pendant.",
  },
  {
    id: 17,
    name: "Garden Party Charm",
    category: "phone-charms",
    image: "/images/img-20251212-wa0060.jpg",
    price: 16.75,
    originalPrice: 20.94,
    description: "Vibrant yellow and green phone charm with stars and flowers.",
  },
  {
    id: 18,
    name: "Citrus Pop Charm",
    category: "phone-charms",
    image: "/images/img-20251212-wa0065.jpg",
    price: 17.5,
    originalPrice: 21.88,
    description: "Bright yellow and pastel multicolor phone charm with stars.",
  },
  {
    id: 19,
    name: "Lavender Blossom Charm",
    category: "phone-charms",
    image: "/images/img-20251212-wa0054.jpg",
    price: 18.25,
    originalPrice: 22.81,
    description: "Elegant purple, black and pink phone charm with flowers.",
  },
  {
    id: 20,
    name: "Starlight Dreams Charm",
    category: "phone-charms",
    image: "/images/img-20251212-wa0059.jpg",
    price: 17.99,
    originalPrice: 22.49,
    description: "Whimsical purple and yellow phone charm with stars and flowers.",
  },
  {
    id: 21,
    name: "Pink Heart Bracelet Set",
    category: "bracelets",
    image: "/images/img-20251212-wa0022.jpg",
    price: 34.99,
    originalPrice: 43.74,
    description: "Adorable pink heart-themed bracelet set with heart charms (2 pieces).",
  },
  {
    id: 22,
    name: "Amber Stone Bracelet Duo",
    category: "bracelets",
    image: "/images/img-20251212-wa0049.jpg",
    price: 39.5,
    originalPrice: 49.38,
    description: "Natural yellow amber stone bracelets with silver accents (2 pieces).",
  },
]

export const reviews: Review[] = [
  {
    id: 1,
    name: "Emma Richardson",
    role: "Fashion Enthusiast",
    rating: 5,
    text: "The quality and attention to detail on every piece is incredible. I've received so many compliments on my necklaces.",
    image: "/professional-woman-portrait.png",
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Gift Buyer",
    rating: 5,
    text: "I gift BEADSVILLE jewelry to my loved ones. Each bracelet and necklace comes beautifully presented.",
    image: "/professional-man-portrait.png",
  },
  {
    id: 3,
    name: "Sophie Laurent",
    role: "Jewelry Collector",
    rating: 5,
    text: "Finally found a brand that combines vintage aesthetic with modern elegance. Highly recommend!",
    image: "/smiling-woman-portrait.png",
  },
]
