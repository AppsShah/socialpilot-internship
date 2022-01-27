const { deletepostcontroller } = require("../controller/deletepostcontroller");
const validator=require("validator");
const deletepostvalidator=async(ctx)=>{
    const email=ctx.request.body.email;
    if(email==undefined || email=="")
    {
        ctx.body="Please Enter title"
        ctx.status=400;
    }
    if(!validator.isEmail(email))
    {
        ctx.body="Enter proper email"
        ctx.status=400;
    }
    else
    {
       const d=await deletepostcontroller(email)
       if(d.modifiedCount==1 && d.matchedCount==1)
       {
            ctx.body="Data Deleted Successfully"
            console.log("data delete")
       }
       else
       {
        ctx.body="Title do not Exist"
        ctx.status=400;
        console.log("title not exist")
       }
    }
}
module.exports={deletepostvalidator}