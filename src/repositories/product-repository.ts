import { prisma } from '@/lib/prisma'
import { Prisma, Product } from '@prisma/client'

export interface ProductRepositoryProps {
  create(data: Prisma.ProductCreateInput): Promise<Product>
}

export class ProductRepository implements ProductRepositoryProps {
  async create(data: Prisma.ProductCreateInput) {
    const product = await prisma.product.create({
      data,
    })

    return product
  }
}
