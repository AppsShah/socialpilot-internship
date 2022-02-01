// const { logindata } = require("../../db/query")
const { hashingpasswordverify } = require("../../helpers/hashing")
const { generatetoken } = require("../../helpers/token")
const logincontroller=async(ctx)=>{
    // console.log(ctx.state)
    const pass=ctx.request.body.password
    const d=ctx.state.user
    const temp=await hashingpasswordverify(pass,d.password)
    console.log(d)
    const token=generatetoken({email:d.email})
    // console.log(token)
    if(temp)
    {

        return ctx.body={success:true,message:token}
        
    }
    else
    {
        return ctx.body={success:false,
        message:"Cannot login "}
    }
}
module.exports={logincontroller}