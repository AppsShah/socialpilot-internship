const { generatetoken } = require("../middleware/token")
const forgetpassword=(ctx)=>{
const email=ctx.request.body.email;
    if(email!=null||ctx
        .request.body!==null)
        {
            const generatedtoken=generatetoken({email:ctx.request.body.email})

            ctx.body= {
                url:`http://localhost:3000/resetpassword?token=${generatedtoken}`
                       }
        }
    else
    {
        ctx.body="please Enter email to verify"
        ctx.statu=400
    }
}
module.exports={forgetpassword}