const { logindata } = require("../../db/query");
const { verifytoken } = require("../../helpers/token");

const searchpostvalidator=async(ctx,next)=>{
    const token = (ctx.header.authorization && ctx.header.authorization.split(' ')[1]) || '';
    // console.log(token)
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
    const search=ctx.request.body.search
    if(search==undefined)
    {
        return ctx.body={success:false,message:"please enter keyword to search"}
    }
    return next()
}
module.exports={searchpostvalidator}