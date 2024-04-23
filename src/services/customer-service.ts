import { CustomerRepositoryProps } from '@/repositories/customer-repository'
import { CustomerAlreadyExistsError } from './errors/customer-errors'

interface CreateCustomerRequest {
  name: string
  email: string
  document: string
  address: string
  cep: string
  uf: string
  phone: string
}

export class CustomerService {
  constructor(private customerRepository: CustomerRepositoryProps) {}

  async create({
    name,
    document,
    address,
    cep,
    phone,
    uf,
    email,
  }: CreateCustomerRequest) {
    const customerAlreadyExists =
      (await this.customerRepository.findByEmail(email)) ||
      (await this.customerRepository.findByDocument(document))

    if (customerAlreadyExists) throw new CustomerAlreadyExistsError()

    await this.customerRepository.create({
      name,
      email,
      document,
      address,
      cep,
      phone,
      uf,
    })
  }
}
