import { ProductRepository } from '@/repositories/product-repository'
import { ProductService } from '@/services/product-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    price: z.number(),
    min_amount: z.number().optional(),
  })

  const { name, price, min_amount } = createBodySchema.parse(request.body)

  try {
    const repository = new ProductRepository()
    const service = new ProductService(repository)

    await service.create({ name, price, min_amount })
  } catch (err) {
    throw new Error('Error in create product')
  }

  return reply.status(201).send()
}
