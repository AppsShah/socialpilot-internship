const { createpost } = require("../../db/query")
const createpostcontroller=async(ctx)=>{
    const email=ctx.state.email.email
    const title=ctx.request.body.title
    const status=ctx.request.body.status || "TODO"
    const des=ctx.request.body.description || "Nothing"
  const d= await createpost(email,title,des,status)
  console.log(d)
  return ctx.body={success:true,message:"Post Added Successfully"}
}
module.exports={createpostcontroller}