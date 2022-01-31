const validator=require("validator")
const ispostupdateemail=(ctx,next)=>{
    const email = ctx.request.body.email;
    if (email == undefined || !validator.isEmail(email)) {
      return  ctx.body = {success:false,message:"email not found or not proper"}
      }
      return next()
}
module.exports={ispostupdateemail}