import { Product } from '../types/product'

export const products: Product[] = [
  {
    id: "1",
    name: "Almond Milk",
    basePrice: 65000,
    image: "/src/assets/catalog/almond-milk.svg?height=200&width=200",
    category: ["Minuman"],
    description: "Fresh Almond Milk with no Sugar",
    thumbnails: [
      "/src/assets/catalog/almond-milk.svg?height=50&width=50",
      "/src/assets/catalog/almond-milk.svg?height=50&width=50",
      "/src/assets/catalog/almond-milk.svg?height=50&width=50",
      "/src/assets/catalog/almond-milk.svg?height=50&width=50"
    ],
    variants: [
      {
        size: "Standard",
        flavor: "Original",
        price: 65000,
        image: '/src/assets/catalog/almond-milk.svg?height=50&width=50',
      },
      {
        size: "Standard",
        flavor: "Choco",
        price: 65000,
         image: '/src/assets/catalog/almond-milk.svg?height=50&width=50',
      },
      {
        size: "Large",
        flavor: "Original",
        price: 85000,
         image: '/src/assets/catalog/almond-milk.svg?height=50&width=50',
      },
      {
        size: "Large",
        flavor: "Choco",
        price: 85000,
        image: '/src/assets/catalog/almond-milk.svg?height=50&width=50',
      }
    ]
  },
  {
    id: "2",
    name: "Chia Jam",
    basePrice: 68000,
    image: "/src/assets/catalog/chia-jam.svg?height=200&width=200",
    category: ["Makanan", "Selai"],
    description: "Delicious Taste\nFor Quality Purpose, we Import RAW Materials from North America...",
    thumbnails: [
      "/src/assets/catalog/chia-jam.svg?height=50&width=50",
      "/src/assets/catalog/chia-jam-strobery.svg?height=50&width=50",
      "/src/assets/catalog/chia-jam-bluebery.svg?height=50&width=50",
      "/src/assets/catalog/chia-jam-orange.svg?height=50&width=50"
    ],
    variants: [
      {
        flavor: "Peach",
        price: 68000,
        image: '/src/assets/catalog/chia-jam.svg?height=50&width=50',
      },
      {
        flavor: "Blueberry",
        price: 68000,
        image: '/src/assets/catalog/chia-jam-bluebery.svg?height=50&width=50',
      },
      {
        flavor: "Strawberry",
        price: 68000,
        image: '/src/assets/catalog/chia-jam-strobery.svg?height=50&width=50',
      }
    ]
  },
  {
    id: "3",
    name: "Signature Christmas Wishes",
    basePrice: 598000,
    image: "/src/assets/catalog/signature-christmas-wishes.svg?height=200&width=200",
    category: ["Makanan", "Parcel"],
    description: "Almond Milk",
    thumbnails: [],
    variants: []
  },
  {
    id: "4",
    name: "Christmas Joy Hampers",
    basePrice: 598000,
    image: "/src/assets/catalog/christmas-joy-hampers.svg?height=200&width=200",
    category: ["Makanan", "Parcel"],
    description: "Almond Milk",
    thumbnails: [],
    variants: []
  },
  {
    id: "5",
    name: "All Varian Healthy DESSERT CUP",
    basePrice: 360000,
    image: "/src/assets/catalog/all-varian-healthy-dessert-cup.svg?height=200&width=200",
    category: ["Makanan", "Parcel"],
    description: "Almond Milk",
    thumbnails: [],
    variants: []
  }
]

