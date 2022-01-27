const validator=require("validator");
const { default: isEmail } = require("validator/lib/isEmail");
const { deleteaccountfromcontroller,deleteaccountcontroller } = require("../controller/deleteaccountcontroller");
const deleteaccountvalidator=async(ctx)=>{
        const email=ctx.request.body.email;
        if(email==undefined)
        {
            ctx.body="Email not found"
            ctx.status=400;
        }
        else
        {
            if(isEmail(email))
            {
               const signup=await deleteaccountfromcontroller(email)
               console.log(signup)
               if(signup.deletedCount!=0)
               {
               const d=await deleteaccountcontroller(email)
                console.log(d)
               }
               else
               {
                   ctx.body="Email not available "
                   ctx.status=400;
                   console.log("Email not present in db")
               }
               
            }
        }

}
module.exports={deleteaccountvalidator}