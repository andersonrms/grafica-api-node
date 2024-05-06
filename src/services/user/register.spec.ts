import { expect, describe, it } from 'vitest'
import { UserService } from './user-service'
import { compare } from 'bcrypt'
import InMemoryUserRepository from '@/repositories/in-memory/in-memory-user-repository'
import { UserAlreadyExistsError } from '../errors/user-errors'

describe('Tests in register method', () => {
  it('should register user', async () => {
    const repository = new InMemoryUserRepository()
    const service = new UserService(repository)

    const { user } = await service.registerService({
      email: 'vitest-email@vites.com',
      name: 'Vitest',
      password: 'VitestPassword',
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it('should has user pass upon registration', async () => {
    const repository = new InMemoryUserRepository()
    const service = new UserService(repository)

    const { user } = await service.registerService({
      email: 'vitest-email@vites.com',
      name: 'Vitest',
      password: 'VitestPassword',
    })

    const isPasswordCorrectlyHashed = await compare(
      'VitestPassword',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not register user email already exists', async () => {
    const repository = new InMemoryUserRepository()
    const service = new UserService(repository)

    const email = 'vitest-email@vites.com'

    await service.registerService({
      email,
      name: 'Vitest',
      password: 'VitestPassword',
    })

    expect(() =>
      service.registerService({
        email,
        name: 'Vitest',
        password: 'VitestPassword',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
