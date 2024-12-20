import { Product } from '../types/product'

export const products: Product[] = [
  {
    id: "1",
    name: "Almond Milk",
    basePrice: 65000,
    image: "/placeholder.svg?height=200&width=200",
    category: ["Minuman"],
    description: "Fresh Almond Milk with no Sugar",
    thumbnails: [
      "/placeholder.svg?height=50&width=50",
      "/placeholder.svg?height=50&width=50",
      "/placeholder.svg?height=50&width=50",
      "/placeholder.svg?height=50&width=50"
    ],
    variants: [
      {
        size: "Standard",
        flavor: "Original",
        price: 65000
      },
      {
        size: "Standard",
        flavor: "Choco",
        price: 65000
      },
      {
        size: "Large",
        flavor: "Original",
        price: 85000
      },
      {
        size: "Large",
        flavor: "Choco",
        price: 85000
      }
    ]
  },
  {
    id: "2",
    name: "Chia Jam",
    basePrice: 68000,
    image: "/placeholder.svg?height=200&width=200",
    category: ["Makanan", "Selai"],
    description: "Delicious Taste\nFor Quality Purpose, we Import RAW Materials from North America...",
    thumbnails: [
      "/placeholder.svg?height=50&width=50",
      "/placeholder.svg?height=50&width=50",
      "/placeholder.svg?height=50&width=50",
      "/placeholder.svg?height=50&width=50"
    ],
    variants: [
      {
        flavor: "Peach",
        price: 68000
      },
      {
        flavor: "Blueberry",
        price: 68000
      },
      {
        flavor: "Strawberry",
        price: 68000
      }
    ]
  }
]

