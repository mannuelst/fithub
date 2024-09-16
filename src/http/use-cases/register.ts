import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { PrismaUserRepository } from './../../repositories/prisma-users-repository';




type RegisterUseCaseRequest = {
  name: string,
  email: string,
  password: string
}

export async function registerUseCasee({ name, email, password }: RegisterUseCaseRequest) {
  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email
    }
  })
  if (userWithSameEmail) {
    throw new Error("Email already exists")
  }

  const prismaRepository = new PrismaUserRepository()
  prismaRepository.create({
    email,
    name,
    password_hash
  })

}