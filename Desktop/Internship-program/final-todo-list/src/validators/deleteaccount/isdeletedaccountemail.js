const validator=require("validator");
const { deleteaccountfrom, deleteaccount, logindata } = require("../../db/query");
const { verifytoken } = require("../../helpers/token");
const isdeletedaccountemail=async(ctx,next)=>{
    // const email = ctx.request.body.email;
    const token = (ctx.header.authorization && ctx.header.authorization.split(' ')[1]) || '';
    if(token==null)
    {
      return ctx.body={success:false,message:"User is not authorized"}
    }
    // if (email == undefined || !validator.isEmail(email)) {
    //   return  ctx.body = {success:false,message:"email not found or not proper"}
    // }
    else
    {
        const email=verifytoken(token)
        if(email.email==null)
        {
         return ctx.body={success:false,message:"User is not authorized"}
        }
        const data=await logindata(email.email)
        if (data == null) {
        return  ctx.body = {success:false,message:"user not found please create account first"}
        }
        const signup=await deleteaccountfrom(email.email)
        if(signup.deletedCount!=0)
        {
            const d=await deleteaccount(email.email)
            console.log(d)
            return ctx.body={success:true,
            message:"deleted successfully "}
        }
        else
        {
           return ctx.body={success:false,message:"Account not available "}
        }
    }
}
module.exports={isdeletedaccountemail}