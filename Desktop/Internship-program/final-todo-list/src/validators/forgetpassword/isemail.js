const validator=require("validator")
const isemail=(ctx,next)=>{
    const email=ctx.request.body.email;
    if(email==undefined)
    {
        return ctx.body={success:false,
        message:"please Enter email to verify"}
    }
    if(!validator.isEmail(email))
    {
        return ctx.body={success:false,
            message:"Enter correct email"}   
    }
    return next()
}
module.exports={isemail}