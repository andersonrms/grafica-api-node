import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'
import { registerService } from '@/services/register-service'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, name, password } = createBodySchema.parse(request.body)

  try {
    await registerService({ name, email, password })
  } catch (_) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
