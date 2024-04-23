import { FastifyInstance } from 'fastify'
import { register } from './controllers/user-controller'
import { create } from './controllers/product-controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/user', register)
  app.post('/product', create)
}
