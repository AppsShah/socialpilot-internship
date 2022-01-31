const { getlist } = require("../../db/query")

const getlistofpostcontroller=async(ctx)=>{
    const currentpage=parseInt(ctx.request.body.currentPage)
    const limit=parseInt(ctx.request.body.limit)
    const skip=(currentpage-1)*limit
    return {success:true,data:await getlist(skip,limit)}
}
module.exports={getlistofpostcontroller}