const { logindata } = require("../../db/query")
const { hashingpasswordverify } = require("../../helpers/hashing")
const logincontroller=async(ctx)=>{
    // console.log(ctx.state)
    const pass=ctx.request.body.password
    const d=ctx.state.user
    const temp=await hashingpasswordverify(pass,d.password)
    if(temp)
    {
        return ctx.body={success:true,message:"Successfull login"}
    }
    else
    {
        return ctx.body={success:false,
        message:"Cannot login "}
    }
}
module.exports={logincontroller}