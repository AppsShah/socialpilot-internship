const validator=require("validator");
const { deletepost, logindata } = require("../../db/query");
const { verifytoken } = require("../../helpers/token");
const isdeletedpostemail=async(ctx,next)=>{

  const token = (ctx.header.authorization && ctx.header.authorization.split(' ')[1]) || '';
  console.log(token)
  if(token==null)
  {
    return ctx.body={success:false,message:"User is not authorized"}
  }
  const email=verifytoken(token)
  if(email.email==null)
  {
   return ctx.body={success:false,message:"User is not authorized"}
  }
  const data=await logindata(email.email)
  if (data == null) {
        return  ctx.body = {success:false,message:"user not found please create account first"}
        }
  const d=await deletepost(email.email)
      if(d.modifiedCount==1 && d.matchedCount==1)
           {
              return  ctx.body={success:true,message:"Data Deleted Successfully"}
           }
      else
           {
            return  ctx.body={success:false,message:"Data cannot deleted Error !"}
           }
    // const email = ctx.request.body.email;
    // if (email == undefined || !validator.isEmail(email)) {
    //   return  ctx.body = {success:false,message:"email not found or not proper"}
    //   }
    //   else
    //   {
    //     
    //   }
}
module.exports={isdeletedpostemail}