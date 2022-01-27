const { getlistcontroller } = require("../controller/getlistcontroller");


const getlistvalidator=(ctx)=>{
        const currentpage=parseInt(ctx.request.body.currentPage) || 1;
        const limit=parseInt(ctx.request.body.limit) || 10;

        if(currentpage==NaN || limit==NaN)
        {
            ctx.body="We are using default value because error in your value"
        }
        else
        {
           return getlistcontroller(currentpage,limit)
        }
}
    
module.exports={getlistvalidator}