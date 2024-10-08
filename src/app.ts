import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { appRoutes } from "./http/use-cases/routes";



export const app = fastify()

app.register(appRoutes)


app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: "Validation error.", issues: error.format() })
  }

  if (env.NODE_ENV !== "production") {
    console.log(error)
  }
  return reply.status(500).send({ message: "Internal server error." })
})