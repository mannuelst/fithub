import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
export const prisma = new PrismaClient()


prisma.user.create({
  data: {
    nome: "Manuel",
    email: "manuel@email.com"
  }
})

export const app = fastify()
