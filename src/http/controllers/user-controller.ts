import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'
import { UserService } from '@/services/user-service'
import { UserRepository } from '@/repositories/user-repository'
import { UserAlreadyExistsError } from '@/services/errors/user-erros'

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
  } catch (err) {
    if (err instanceof UserAlreadyExistsError)
      return reply.status(409).send({ error: err.message })

    throw err
  }

  return reply.status(201).send()
}
