//create a server
const koa=require("koa")
const app=require("./app")
const server=new koa()

app.listen(3000,()=>{console.log("Server running")})