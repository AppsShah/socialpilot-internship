const validator=require("validator");
const { deletepost } = require("../../db/query");
const isdeletedpostemail=async(ctx,next)=>{
    const email = ctx.request.body.email;
    if (email == undefined || !validator.isEmail(email)) {
      return  ctx.body = {success:false,message:"email not found or not proper"}
      }
      else
      {
        const d=await deletepost(email)
        if(d.modifiedCount==1 && d.matchedCount==1)
       {
          return  ctx.body={success:true,message:"Data Deleted Successfully"}
       }
       else
       {
        return  ctx.body={success:false,message:"Data cannot deleted Error !"}
       }
      }
}
module.exports={isdeletedpostemail}