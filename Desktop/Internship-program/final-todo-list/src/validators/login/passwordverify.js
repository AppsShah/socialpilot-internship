
const passwordverify=(ctx,next)=>{
    const pass=ctx.request.body.password;
    if (pass.length < 8) {
        ctx.body = {success:false,
            message:"please Enter correct password"}
      }
    return next()
}
module.exports={passwordverify}