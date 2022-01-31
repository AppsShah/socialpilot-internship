const validator=require("validator");
const { logindata } = require("../../db/query");
const ispostemail=async(ctx,next)=>{
    const email = ctx.request.body.email;
    if (email == undefined || !validator.isEmail(email)) {
      return  ctx.body = {success:false,message:"email not found or not proper"}
      }
    else
    {
      const data=await logindata(email)
      if (data == null) {
      return  ctx.body = {success:false,message:"user not found please create account first"}
      }
    }
      return next()
}
module.exports={ispostemail}