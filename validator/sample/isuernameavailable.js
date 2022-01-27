const isusernameavailable=(ctx,next)=>{
    const {username}=ctx.request.body

    //if username exist

    if(!username)
        return ctx.body={success:false,message:"invalid username"}
    return next()
    
}

module.exports=isusernameavailable