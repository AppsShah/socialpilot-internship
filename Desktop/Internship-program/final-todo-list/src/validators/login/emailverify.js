const validator=require("validator");
const { logindata } = require("../../db/query");
const emailverify=async(ctx,next)=>{
    const email = ctx.request.body.email;
    if (!validator.isEmail(email)) {
        ctx.body = {success:false,
            message:"please Enter correct Email"}
      }
    else
    {
        const d = await logindata(email);
        if (d == null) {
           return ctx.body = {success:false,message:"Email Not verified"};
          }
        else{
            ctx.state.user=d;
        }
    }
    return next()
}
module.exports={emailverify}