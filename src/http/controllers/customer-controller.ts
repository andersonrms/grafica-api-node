import { CustomerRepository } from '@/repositories/customer-repository'
import { CustomerService } from '@/services/customer-service'
import { CustomerAlreadyExistsError } from '@/services/errors/customer-errors'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    document: z.string().min(11),
    address: z.string().min(5),
    cep: z.string().length(8),
    uf: z.string().length(2),
    phone: z.string().min(10),
  })

  const { name, email, document, address, phone, cep, uf } =
    createBodySchema.parse(request.body)

  try {
    const repository = new CustomerRepository()
    const service = new CustomerService(repository)

    await service.create({ name, email, document, address, phone, cep, uf })
  } catch (err) {
    if (err instanceof CustomerAlreadyExistsError)
      return reply.status(409).send({ error: err.message })
  }

  return reply.status(201).send()
}
