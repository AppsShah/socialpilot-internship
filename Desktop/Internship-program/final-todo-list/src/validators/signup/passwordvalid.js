
const passwordvalid=(ctx)=>{
    const pass=ctx.request.body.pass;
    if (pass.length < 8) {
       return ctx.body ={success:false,message:"Enter password more then 8 char"}
      }
    return next()
}
module.exports={passwordvalid}