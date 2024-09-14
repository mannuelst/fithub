import { app } from "./app";

try {
  await app.listen({ port: 3000 })
  console.log("HTTP Server Running!🔥")
} catch (err) {
  app.log.error(err)
  process.exit(1)
}

