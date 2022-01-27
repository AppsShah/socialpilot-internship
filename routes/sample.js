const koarouter=require("koa-router");
const samplePost = require("../controller/samplepost");
const isusernameavailable = require("../validator/sample/isuernameavailable");
const router=new koarouter();

router.post("/sample",isusernameavailable,samplePost)
module.exports=router