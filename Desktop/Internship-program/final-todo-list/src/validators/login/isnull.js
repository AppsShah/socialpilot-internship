const isnull=(ctx,next)=>{
    const email = ctx.request.body.email;
    const pass = ctx.request.body.password;
    if (email == undefined || pass == undefined) {
        ctx.body = {success:false,
        message:"Please Enter Email or Password"}
      }
    return next()
}
module.exports={isnull}