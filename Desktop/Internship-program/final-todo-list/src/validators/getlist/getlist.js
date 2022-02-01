const { logindata } = require("../../db/query");
const { verifytoken } = require("../../helpers/token");

const getlist=async(ctx,next)=>{
    const currentpage=parseInt(ctx.request.body.currentPage)
    const limit=parseInt(ctx.request.body.limit)
    console.log(ctx.request.body.currentPage)
    if(isNaN(currentpage) || isNaN(limit))
    {
       return ctx.body={success:false,message:"We are using default value because error in your value"}
    }
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
        ctx.state.email=email;
    }
    return next()
}
module.exports={getlist}