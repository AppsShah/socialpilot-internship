
const searchpostvalidator=(ctx,next)=>{
    const search=ctx.request.body.search
    if(search==undefined)
    {
        return ctx.body={success:false,message:"please enter keyword to search"}
    }
    return next()
}
module.exports={searchpostvalidator}