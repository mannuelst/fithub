import { app } from "@/app.js";
import { env } from "@/env";


app.listen({
  port: env.PORT,
  host: "0.0.0.0"
}).then(() => {

  console.log("🔥 HTTP Server Running!")
}

)

