const validator=require("validator")
const { isEmailindb } = require("../../db/query")
const isemailvalidate=async(ctx,next)=>{
    const email=ctx.request.body.email
    if (!validator.isEmail(email)) {
       return ctx.body ={success:false,message: "Please Enter Valid Email"}
    }
    else
    {
        const data=await isEmailindb(email)
        if(data!==null)
        {
            return ctx.body={success:false,
                message:"Please Enter Valid Email"}
        }
    }
    return next() 
}
module.exports={isemailvalidate}