import { hash } from 'bcrypt'

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private userRepository: any) {}

  async registerService({ email, name, password }: RegisterServiceRequest) {
    const passwordHash = await hash(password, 6)

    const userAlreadyExists = await this.userRepository.findUniqueUser(email)

    if (userAlreadyExists) throw new Error('')

    await this.userRepository.create({
      name,
      email,
      password_hash: passwordHash,
    })
  }
}
