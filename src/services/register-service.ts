import { prisma } from '@/lib/prisma'
import { hash } from 'bcrypt'

interface RegisterServiceRequest {
  name: string
  email: string
  password: string
}

export async function registerService({
  email,
  name,
  password,
}: RegisterServiceRequest) {
  const passwordHash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) throw new Error('')

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: passwordHash,
    },
  })
}
