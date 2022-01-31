const validator=require("validator")
const isview=(ctx,next)=>{
    const email=ctx.request.body.email;
    if(email==undefined)
    {
      return ctx.body={status:false,message:"Email Not found"}
       
    }
    if(!validator.isEmail(email))
    {
        return ctx.body={status:false,message:"Email Not valid"}
    }
    return next()
}
module.exports={isview}