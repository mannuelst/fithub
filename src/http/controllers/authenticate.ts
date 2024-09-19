import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { authenticateRegisterUseCase } from '../use-cases/factories/make-authenticate-use-case';
import { InvalidCredentialError } from './../use-cases/errors/invalid-credentials-error';


export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({

    email: z.string().email(),
    password: z.string().min(6)
  })

  const { email, password } = authenticateBodySchema.parse(request.body)
  try {


    const authenticateUserCase = authenticateRegisterUseCase()
    await authenticateUserCase.execute({ email, password })
  } catch (error) {
    if (error instanceof InvalidCredentialError) {
      return reply.status(400).send({ message: error.message })
    }
    throw error

  }

  return reply.status(200).send()
}