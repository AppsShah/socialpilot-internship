const { searchpost } = require("../../db/query")

const searchcontroller=async(ctx)=>{
    return ctx.body={
        success:true,
        data:await searchpost(ctx.request.body.search)
    }
}
module.exports={searchcontroller}