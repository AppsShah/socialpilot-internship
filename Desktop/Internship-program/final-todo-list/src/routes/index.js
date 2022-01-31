const routerauth = require("./auth");
const todolistrouter=require("./todo")

const routes=[routerauth,todolistrouter]
module.exports=(app)=>{
    routes.forEach((route)=>{
        app.use(route.routes()).use(route.allowedMethods())
    })
}