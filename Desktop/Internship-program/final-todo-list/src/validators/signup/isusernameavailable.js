const { findusername } = require("../../db/query");

const isusernameavailable=async(ctx,next)=>{
    const username=ctx.request.body.username
    const data=await findusername(username)
    if (data != null)
      return ctx.body = {success:false ,message:"username already present"};
    return next()
}
module.exports={isusernameavailable}