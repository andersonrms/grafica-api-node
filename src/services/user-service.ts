import { UserRepositoryProps } from '@/repositories/user-repository'
import { hash } from 'bcrypt'
import { UserAlreadyExistsError } from './errors/user-erros'

interface RegisterServiceRequest {
  name: string
  email: string
  password: string
}

export class UserService {
  /* private userRepository: any
  constructor(userRepository: any) {
    this.userRepository = userRepository
  } */

  constructor(private userRepository: UserRepositoryProps) {}

  async registerService({ email, name, password }: RegisterServiceRequest) {
    const passwordHash = await hash(password, 6)

    const userAlreadyExists = await this.userRepository.findByEmail(email)

    if (userAlreadyExists) throw new UserAlreadyExistsError()

    await this.userRepository.create({
      name,
      email,
      password_hash: passwordHash,
    })
  }
}
