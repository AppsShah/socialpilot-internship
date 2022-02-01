// const validator=require("validator")
const { logindata } = require("../../db/query");
const { verifytoken } = require("../../helpers/token");
const ispostupdateemail=async(ctx,next)=>{
  const token = (ctx.header.authorization && ctx.header.authorization.split(' ')[1]) || '';
    console.log(token)
    if(token==null)
    {
      return ctx.body={success:false,message:"User is not authorized"}
    }
    else
    {
      // console.log(token)
       const email=verifytoken(token)
       if(email.email==null)
       {
        return ctx.body={success:false,message:"User is not authorized"}
       }
      const data=await logindata(email.email)
        if (data == null) {
        return  ctx.body = {success:false,message:"user not found please create account first"}
        }
        ctx.state.email=email
    }
      return next()
}
module.exports={ispostupdateemail}