import { prisma } from '@/lib/prisma'

import { Prisma, User } from '@prisma/client'

export interface UserRepositoryProps {
  create(data: Prisma.UserCreateInput): Promise<User>
  findByEmail(email: string): Promise<User | null>
}

export class UserRepository implements UserRepositoryProps {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }
}
