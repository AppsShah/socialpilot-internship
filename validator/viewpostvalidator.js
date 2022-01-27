const { viewpostcontroller } = require("../controller/viewpostcontroller");
const validator=require("validator")

const viewpostvalidator=async(ctx)=>{
    const email=ctx.request.body.email;
    if(email==undefined)
    {
        ctx.body="Email Not found"
        ctx.status=400
        console.log("Email not found")
    }
    else
    {
        if(!validator.isEmail(email))
        {
            ctx.body="Email not valid"
            ctx.status=400;
            console.log("email not validate")
        }
        else
        {
           return viewpostcontroller(email)
        }
    }
}

module.exports={viewpostvalidator}