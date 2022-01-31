const isposttitle=(ctx,next)=>{
    const title = ctx.request.body.title;
    if (title == undefined) {
       return ctx.body = {success:false,message:"title not found or not proper"}
      }
      return next()
}
module.exports={isposttitle}