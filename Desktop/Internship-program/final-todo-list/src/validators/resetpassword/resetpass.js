const { logindata } = require("../../db/query")
const { verifytoken } = require("../../helpers/token")

const isresetpass=async(ctx,next)=>{
    const verify=verifytoken(ctx.query.token)
    const password=ctx.request.body.password
    if(verify.email==null)
    {
        return ctx.body={success:false,message:"Token Expire"}
    }
    if(password==null)
            {
                return ctx.body={success:false,message:"Enter Password"}
            }  
    const d=await logindata(verify.email)
    if(d==undefined)
    {
        return ctx.body={success:false,message:"Enter Wrong email"}
    }
    ctx.state.reset=d
    return next()
}
module.exports={isresetpass}