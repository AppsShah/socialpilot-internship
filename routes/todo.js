const { createpostvalidator } = require("../validator/createpostvalidator");
const { deletepostvalidator } = require("../validator/deletepostvalidator");
const { updatepostvalidator } = require("../validator/updatepostvalidator");
const { viewpostvalidator } = require("../validator/viewpostvalidator");
const { deleteaccountvalidator } = require("../validator/deleteaccountvalidator");
const { getlistvalidator } = require("../validator/getlistvalidator");
const koarouter=require("koa-router");
const router=new koarouter()
router.post("/createpost",async (ctx)=>{
    ctx.body="into create post"
    createpostvalidator(ctx)
    
})

router.post("/deletepost",async(ctx)=>{
    ctx.body="delete post"
    deletepostvalidator(ctx)
})

router.post("/updatepost",async(ctx)=>{
    ctx.body="update post"
    updatepostvalidator(ctx)
})

router.post("/deleteaccount",async(ctx)=>{
    ctx.body="Inside delete account"
    deleteaccountvalidator(ctx)
})

router.post("/getlist",async(ctx)=>{
    ctx.body="GET LIST"
   ctx.body=await getlistvalidator(ctx)
})
router.get("/viewpost",async ctx=>{
    ctx.body="To view data"
    const data=await viewpostvalidator(ctx);
    console.log(data)
    ctx.body=data
    ctx.status=200;
})

module.exports=router