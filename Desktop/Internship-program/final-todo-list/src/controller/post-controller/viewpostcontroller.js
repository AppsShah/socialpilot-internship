const { viewpost } = require("../../db/query")

const viewpostcontroller=async(ctx)=>{
   return ctx.body={success:true,data:await viewpost(ctx.request.body.email)}
}

module.exports={viewpostcontroller}