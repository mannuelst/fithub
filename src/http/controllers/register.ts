import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { RegisterUseCase } from '../use-cases/register';


export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { email, name, password } = registerBodySchema.parse(request.body)
  try {

    const prismaUserRepository = new PrismaUserRepository()
    const registerUserCase = new RegisterUseCase(prismaUserRepository)
    await registerUserCase.execute({ email, name, password })
  } catch (error) {
    return reply.status(409).send()

  }



  return reply.status(201).send()


}