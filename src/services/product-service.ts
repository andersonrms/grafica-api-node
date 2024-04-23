import { ProductRepositoryProps } from '@/repositories/product-repository'

interface CreateProductRequest {
  name: string
  price: number
  min_amount?: number
}

export class ProductService {
  constructor(private productRepository: ProductRepositoryProps) {}

  async create({ name, price, min_amount }: CreateProductRequest) {
    await this.productRepository.create({
      name,
      price,
      min_amount,
    })
  }
}
