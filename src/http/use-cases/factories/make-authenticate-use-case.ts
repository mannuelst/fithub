import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository"
import { AuthenticateUseCase } from "../authenticate"

export function authenticateRegisterUseCase() {
  const prismaUserRepository = new PrismaUserRepository()
  const authenticateUserCase = new AuthenticateUseCase(prismaUserRepository)
  return authenticateUserCase
}