const validator=require("validator");
const { deleteaccountfrom, deleteaccount } = require("../../db/query");
const isdeletedaccountemail=async(ctx,next)=>{
    const email = ctx.request.body.email;
    if (email == undefined || !validator.isEmail(email)) {
      return  ctx.body = {success:false,message:"email not found or not proper"}
    }
    else
    {
        const signup=await deleteaccountfrom(email)
        if(signup.deletedCount!=0)
        {
            const d=await deleteaccount(email)
            return ctx.body={success:true,
            message:"deleted successfully "+d}
        }
        else
        {
           return ctx.body={success:false,message:"Email not available "}
        }
    }
}
module.exports={isdeletedaccountemail}