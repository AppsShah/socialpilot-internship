const { searchpost } = require("../../db/query")
const searchcontroller=async(ctx)=>{
    // console.log(ctx.state.Email)
    const email=ctx.state.email.email
    return ctx.body={
        success:true,
        data:await searchpost(ctx.request.body.search,email)
    }
}
module.exports={searchcontroller}