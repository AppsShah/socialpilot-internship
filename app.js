const koa=require("koa")
const bodyparser=require("koa-bodyparser");
// const { allowedMethods } = require("./routes/auth");
const setuproutes=require("./routes/index") 
// const authrouter=require("./routes/auth")
const app = new koa();

app.use(bodyparser())
// app.use(authrouter.routes()).use(authrouter.allowedMethods())
setuproutes(app)


module.exports=app;