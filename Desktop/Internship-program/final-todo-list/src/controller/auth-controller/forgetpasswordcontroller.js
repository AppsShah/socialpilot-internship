const { generatetoken } = require("../../helpers/token")

const forgetpasswordcontroller=(ctx)=>{
    const gentoken=generatetoken({email:ctx.request.body.email})

    return ctx.body= {
        success:true,
        url:`http://localhost:3000/resetpassword?token=${gentoken}`
               }
}
module.exports={forgetpasswordcontroller}