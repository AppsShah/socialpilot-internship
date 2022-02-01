const { updatepost } = require("../../db/query")

const updatepostcontroller=async(ctx)=>{
    const email=ctx.state.email.email
    const title=ctx.request.body.title;
    const description=ctx.request.body.description;
    const status=ctx.request.body.status;
    const ack=await updatepost(email,title,description,status)
    console.log(ack)
    return ctx.body={success:true,message:"Data updated successfully"}
}
module.exports={updatepostcontroller}