import { app } from "./app";

app.listen({ 
    port: 3333, 
    host: '0.0.0.0' //host app front-end
}).then(() => {
    console.log('HTTP server runing in port 3333')
})