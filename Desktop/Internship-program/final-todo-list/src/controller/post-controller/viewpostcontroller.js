const { viewpost } = require("../../db/query")

const viewpostcontroller=async(ctx)=>{
   return ctx.body={success:true,data:await viewpost(ctx.state.email.email)}
}

module.exports={viewpostcontroller}