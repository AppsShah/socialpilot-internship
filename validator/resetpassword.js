const { logindata } = require("../db/query");
const { verifytoken } = require("../middleware/token");
const bcrypt=require("bcrypt");
const { resetpasswordcontroller } = require("../controller/resetpasswordcontroller");

const resetpassword=async(ctx)=>{
    const verify=verifytoken(ctx.query.token)
    const password=ctx.request.body.password
    if(verify.email==null)
    {
        ctx.body="Token Expire"
        ctx.status=404
    }
    else
    {
        console.log(verify)
        const d=await logindata(verify.email)
        if(d==undefined)
        {
            ctx.body="You Enter Wrong Email"
            ctx.status=400 
        }
        else
        {
            if(password==null)
            {
                ctx.body="Enter Password"
                ctx.status=400
            }
            else
            {
                const newpassword=bcrypt.hashSync(password,10)
                console.log(newpassword)
                const acknowledge=await resetpasswordcontroller(d,newpassword)
                console.log(acknowledge)
                if(acknowledge.acknowledged)
                {
                    ctx.body="Password Reset Successfully!"
                }
                else
                {
                    ctx.body="Error In Database Sorry"
                    ctx.status=404
                }
            }
        }
    }
}
module.exports={resetpassword}