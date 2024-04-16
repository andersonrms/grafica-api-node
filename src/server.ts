import { app } from "./app";
import { env } from "./env";

app.listen({ 
    port: env.PORT, 
    host: '0.0.0.0' //host app front-end
}).then(() => {
    console.log(`HTTP server runing in port ${env.PORT}`)
})