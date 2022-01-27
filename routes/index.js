
const authRouter=require("./auth")
const todoRouter=require("./todo")
const sample=require("./sample")
const routes=[authRouter,todoRouter,sample]

module.exports= (app)=>{
    routes.forEach((route)=>{
        app.use(route.routes()).use(route.allowedMethods())
    })
}