const { getlist } = require("../../db/query")
// const {email}=require("../../validators/getlist/getlist")

const getlistofpostcontroller=async(ctx)=>{
    const email=ctx.state.email.email
    // console.log(email)
    const currentpage=parseInt(ctx.request.body.currentPage)
    const limit=parseInt(ctx.request.body.limit)
    const skip=(currentpage-1)*limit
    return ctx.body={success:true,data:await getlist(skip,limit,email)}
}
module.exports={getlistofpostcontroller}