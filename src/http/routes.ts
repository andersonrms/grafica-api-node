import { FastifyInstance } from 'fastify'
import { create } from './controllers/user-controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/user', create)
}
