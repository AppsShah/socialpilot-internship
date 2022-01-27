const koa=require("koa")
const app=require("./app")
const server=new koa()

// app.use(ctx=>{ctx.body="Welcome to authentication"})
// server.use(ctx=>{ctx.body="Welcome to auth"})
app.listen(3000,()=>{console.log("Server running")})
// server.listen(3000,()=>{console.log("Server running successfully")})
