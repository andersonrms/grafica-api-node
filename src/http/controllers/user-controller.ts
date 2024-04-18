import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'
import { UserService } from '@/services/user-service'
import { UserRepository } from '@/repositories/user-repository'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, name, password } = createBodySchema.parse(request.body)

  try {
    const userRepository = new UserRepository()
    const userService = new UserService(userRepository)

    await userService.registerService({ email, name, password })
  } catch (_) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
