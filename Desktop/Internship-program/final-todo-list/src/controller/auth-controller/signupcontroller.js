const { insertsignupdata } = require("../../db/query");
const { hashingpassword } = require("../../helpers/hashing")

const signupcontroller=async(ctx)=>{
    const username=ctx.request.body.username;
    const email=ctx.request.body.email
    const pass = ctx.request.body.password;
    const passhash=hashingpassword(pass)
    console.log(await insertsignupdata(username,email,passhash))
    return ctx.body={success:true,message:"signup successfull"}
}
module.exports={signupcontroller}