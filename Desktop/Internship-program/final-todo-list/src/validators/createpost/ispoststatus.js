const ispoststatus=(ctx,next)=>{
    const status = ctx.request.body.status || "TODO";
    if (status == "TODO" || status == "inProcess" || status == "done"){
      return next()
      }
      return  ctx.body = {success:false,message:"Status can be TODO or inProcess or done"}
      
}
module.exports={ispoststatus}