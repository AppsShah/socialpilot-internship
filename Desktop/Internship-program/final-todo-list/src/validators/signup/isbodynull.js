const isbodynull=(ctx,next)=>{
    const username = ctx.request.body.username;
    const email = ctx.request.body.email;
    const pass = ctx.request.body.password;
    if (username == undefined || email == undefined || pass == undefined)
       return ctx.body={success:false,message:"all username email and password should not be null"} 
    return next()
}
module.exports={isbodynull}