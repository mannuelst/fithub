import fastify from "fastify";
import { z } from "zod";
import { prisma } from "./lib/prisma";



// prisma.user.create({
//   data: {
//     nome: "Manuel",
//     email: "manuel@email.com"
//   }
// })

export const app = fastify()


app.post("/users", async (request, reply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { email, name, password } = registerBodySchema.parse(request.body)

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password
    }
  })

  return reply.status(201).send()
})