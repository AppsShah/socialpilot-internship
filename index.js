const koa= require("koa")
const koaRouter=require("koa-router") 
const koaParser=require("koa-bodyparser");
const connection = require("./db/connection");
const signupvalidator=require("./validator/signupvalidator");
const { loginvalidator } = require("./validator/loginvalidator");
const { forgetpassword } = require("./validator/forgetpasswordvalidator");
const { resetpassword } = require("./validator/resetpassword");
const { createpostvalidator } = require("./validator/createpostvalidator");
const { deletepostvalidator } = require("./validator/deletepostvalidator");
const { updatepostvalidator } = require("./validator/updatepostvalidator");
const { viewpostvalidator } = require("./validator/viewpostvalidator");
const { deleteaccountvalidator } = require("./validator/deleteaccountvalidator");
const { getlistvalidator } = require("./validator/getlistvalidator");
require('dotenv').config();


//creating app
const app=new koa()
const router=new koaRouter()

//use
app.use(koaParser())
app.use(router.routes()).use(router.allowedMethods())

//main router
app.use(ctx=>{ctx.body="Welcome to ToDO list"})

//get
router.get("/",async(ctx)=>{
    ctx.body="Hello to get method"
    connectToCluster()
})


router.post("/createpost",async (ctx)=>{
    ctx.body="into create post"
    createpostvalidator(ctx)
    
})

router.post("/deletepost",async(ctx)=>{
    ctx.body="delete post"
    deletepostvalidator(ctx)
})

router.post("/updatepost",async(ctx)=>{
    ctx.body="update post"
    updatepostvalidator(ctx)
})

router.post("/deleteaccount",async(ctx)=>{
    ctx.body="Inside delete account"
    deleteaccountvalidator(ctx)
})

router.post("/getlist",async(ctx)=>{
    ctx.body="GET LIST"
   ctx.body=await getlistvalidator(ctx)
})
router.get("/viewpost",async ctx=>{
    ctx.body="To view data"
    const data=await viewpostvalidator(ctx);
    console.log(data)
    ctx.body=data
    ctx.status=200;
})

//listen at which port
app.listen(process.env.PORT || 3000,()=>{
    console.log("server started running on : "+process.env.PORT)
})