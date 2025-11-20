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
import dummyProducts from './dummyProducts.json'

type DummyProductsFile = {
  products: ProductMock[]
}

const { products } = dummyProducts as DummyProductsFile

export const productsMock: ProductMock[] = products


