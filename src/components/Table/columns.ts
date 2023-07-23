// columns.ts
import { Product } from './types'

export type Column = {
  label: string
  key: keyof Product
}

export const columns: Column[] = [
  { label: 'id', key: 'id' },
  { label: 'Title', key: 'title' },
  { label: 'Price', key: 'price' },
  { label: 'Stock', key: 'stock' },
  { label: 'Rating', key: 'rating' },
  { label: 'Brand', key: 'brand' },
  { label: 'Category', key: 'category' },
  { label: 'Description', key: 'description' },
  { label: 'Thumbnail', key: 'thumbnail' },
  // { label: 'Images', key: 'images' }
]

/**
 @ https://dummyjson.com/products
 
 "products": [
  {
    "id": 1,
    "title": "iPhone 9",
    "description": "An apple mobile which is nothing like apple",
    "price": 549,
    "discountPercentage": 12.96,
    "rating": 4.69,
    "stock": 94,
    "brand": "Apple",
    "category": "smartphones",
    "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    "images": [
      "https://i.dummyjson.com/data/products/1/1.jpg",
      "https://i.dummyjson.com/data/products/1/2.jpg",
      "https://i.dummyjson.com/data/products/1/3.jpg",
      "https://i.dummyjson.com/data/products/1/4.jpg",
      "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
    ]
  },
  {
    "id": 2,
*/
