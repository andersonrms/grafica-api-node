import { prisma } from '@/lib/prisma'
import { Customer, Prisma } from '@prisma/client'

export interface CustomerRepositoryProps {
  create(data: Prisma.CustomerCreateInput): Promise<Customer>
  findByEmail(email: string): Promise<Customer | null>
  findByDocument(document: string): Promise<Customer | null>
}

export class CustomerRepository implements CustomerRepositoryProps {
  async create(data: Prisma.CustomerCreateInput) {
    const customer = await prisma.customer.create({
      data,
    })

    return customer
  }

  async findByEmail(email: string) {
    const customer = await prisma.customer.findUnique({
      where: {
        email,
      },
    })

    return customer
  }

  async findByDocument(document: string) {
    const customer = await prisma.customer.findUnique({
      where: {
        document,
      },
    })

    return customer
  }
}
