const samplePost=async(ctx)=>{
    console.log("sample post controller called")
    ctx.body={success:true,reqobj:ctx.request.body}
}
module.exports=samplePost