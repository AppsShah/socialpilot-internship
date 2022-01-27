const { loginvalidator } = require("../validator/loginvalidator");
const { forgetpassword } = require("../validator/forgetpasswordvalidator");
const { resetpassword } = require("../validator/resetpassword");
const signupvalidator=require("../validator/signupvalidator");
const koarouter=require("koa-router")
const router=new koarouter();
router.post("/signup",signupvalidator,async(ctx)=>{
    ctx.body="Inside Signup"
    
})

router.post("/login",async(ctx)=>{
    ctx.body="Inside Login"
    loginvalidator(ctx)
    
})

router.post('/forgetpassword',(ctx)=>{
    ctx.body="You are in forget Page"
    forgetpassword(ctx)
})

router.post("/resetpassword",async (ctx)=>{
    console.log("resetpassword")
    ctx.body="Welcome to reset password"
    resetpassword(ctx)
})

module.exports=router