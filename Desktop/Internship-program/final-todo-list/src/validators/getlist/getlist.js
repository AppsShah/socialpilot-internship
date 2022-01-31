
const getlist=(ctx,next)=>{
    const currentpage=parseInt(ctx.request.body.currentPage)
    const limit=parseInt(ctx.request.body.limit)

    if(isNaN(currentpage) || isNaN(limit))
    {
       return ctx.body={success:false,message:"We are using default value because error in your value"}
    }
    return next()
}
module.exports={getlist}