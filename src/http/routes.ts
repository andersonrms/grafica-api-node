import { FastifyInstance } from 'fastify'
import { register } from './controllers/user-controller'
import { create as createProduct } from './controllers/product-controller'
import { create as createCustomer } from './controllers/customer-controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/user', register)
  app.post('/product', createProduct)
  app.post('/customer', createCustomer)
}
