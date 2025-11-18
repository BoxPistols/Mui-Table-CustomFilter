// モック用の製品データ。ネットワークが使えない場合や開発時に利用
export type ProductMock = {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

// できるだけ本番のデータ構造に近い形で用意
const baseProducts: ProductMock[] = [
  {
    id: 1,
    title: 'Mock Phone X',
    description: 'A performant mock smartphone with great camera.',
    price: 899,
    discountPercentage: 7.5,
    rating: 4.6,
    stock: 34,
    brand: 'Mocktel',
    category: 'smartphones',
    thumbnail: '/logo192.png',
    images: [],
  },
  {
    id: 2,
    title: 'Mock Laptop Pro',
    description: 'Lightweight laptop for productivity and creativity.',
    price: 1499,
    discountPercentage: 10.0,
    rating: 4.7,
    stock: 18,
    brand: 'MockBook',
    category: 'laptops',
    thumbnail: '/logo192.png',
    images: [],
  },
  {
    id: 3,
    title: 'Mock Headphones',
    description: 'Noise cancelling over-ear headphones.',
    price: 249,
    discountPercentage: 5.0,
    rating: 4.4,
    stock: 120,
    brand: 'Mockson',
    category: 'audio',
    thumbnail: '/logo192.png',
    images: [],
  },
  {
    id: 4,
    title: 'Mock 4K Monitor',
    description: 'High resolution monitor with vivid colors.',
    price: 399,
    discountPercentage: 12.0,
    rating: 4.5,
    stock: 52,
    brand: 'MockView',
    category: 'monitors',
    thumbnail: '/logo192.png',
    images: [],
  },
  {
    id: 5,
    title: 'Mock Mechanical Keyboard',
    description: 'Tactile switches with RGB lighting.',
    price: 129,
    discountPercentage: 8.0,
    rating: 4.3,
    stock: 200,
    brand: 'MockCaps',
    category: 'peripherals',
    thumbnail: '/logo192.png',
    images: [],
  },
  {
    id: 6,
    title: 'Mock Gaming Mouse',
    description: 'Ergonomic design with high DPI sensor.',
    price: 79,
    discountPercentage: 6.0,
    rating: 4.2,
    stock: 160,
    brand: 'MockPoint',
    category: 'peripherals',
    thumbnail: '/logo192.png',
    images: [],
  },
  {
    id: 7,
    title: 'Mock Smartwatch',
    description: 'Track your fitness and notifications.',
    price: 199,
    discountPercentage: 9.0,
    rating: 4.1,
    stock: 75,
    brand: 'MockFit',
    category: 'wearables',
    thumbnail: '/logo192.png',
    images: [],
  },
  {
    id: 8,
    title: 'Mock Bluetooth Speaker',
    description: 'Portable speaker with deep bass.',
    price: 99,
    discountPercentage: 4.0,
    rating: 4.0,
    stock: 140,
    brand: 'MockSound',
    category: 'audio',
    thumbnail: '/logo192.png',
    images: [],
  },
  {
    id: 9,
    title: 'Mock Action Camera',
    description: 'Capture adventures in 4K.',
    price: 299,
    discountPercentage: 11.0,
    rating: 4.3,
    stock: 65,
    brand: 'MockGo',
    category: 'cameras',
    thumbnail: '/logo192.png',
    images: [],
  },
  {
    id: 10,
    title: 'Mock Drone',
    description: 'Stable flight with 3-axis gimbal.',
    price: 699,
    discountPercentage: 7.0,
    rating: 4.5,
    stock: 22,
    brand: 'MockFly',
    category: 'drones',
    thumbnail: '/logo192.png',
    images: [],
  },
]

const brands = ['Mocktel', 'MockBook', 'Mockson', 'MockView', 'MockCaps', 'MockPoint', 'MockFit', 'MockSound', 'MockGo', 'MockFly']
const categories = ['smartphones', 'laptops', 'audio', 'monitors', 'peripherals', 'wearables', 'cameras', 'drones']

const generated: ProductMock[] = Array.from({ length: 110 }, (_, i) => {
  const id = baseProducts.length + i + 1
  const price = 50 + ((id * 13) % 2000)
  const discount = Number(((id * 7) % 15).toFixed(1))
  const rating = Number((3 + ((id % 21) / 10)).toFixed(1)) // 3.0 - 5.0
  const stock = ((id * 17) % 250) + 1
  const brand = brands[id % brands.length]
  const category = categories[id % categories.length]
  return {
    id,
    title: `Mock Item ${id}`,
    description: 'Generated mock product for development.',
    price,
    discountPercentage: discount,
    rating,
    stock,
    brand,
    category,
    thumbnail: '/logo192.png',
    images: [],
  }
})

export const productsMock: ProductMock[] = [...baseProducts, ...generated]


