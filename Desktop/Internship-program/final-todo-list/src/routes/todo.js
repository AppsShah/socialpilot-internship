const koarouter = require("koa-router");
const { createpostcontroller } = require("../controller/post-controller/createpostcontroller");
const { getlistofpostcontroller } = require("../controller/post-controller/getlistofpostcontroller");
const { searchcontroller } = require("../controller/post-controller/searchcontroller");
const { updatepostcontroller } = require("../controller/post-controller/updatepostcontroller");
const { viewpostcontroller } = require("../controller/post-controller/viewpostcontroller");
const { ispostemail } = require("../validators/createpost/ispostemail");
const { ispoststatus } = require("../validators/createpost/ispoststatus");
const { isposttitle } = require("../validators/createpost/isposttitle");
const {
  isdeletedaccountemail,
} = require("../validators/deleteaccount/isdeletedaccountemail");
const {
  isdeletedpostemail,
} = require("../validators/deletepost/isdeletedpostemail");
const { getlist } = require("../validators/getlist/getlist");
const { searchpostvalidator } = require("../validators/searchpost/searchpostvalidator");
const {
  ispostupdateemail,
} = require("../validators/updatepost/ispostupdateemail");
const {
  ispostupdataestatus,
} = require("../validators/updatepost/ispostupdatestatus");
const {
  ispostupdatetitle,
} = require("../validators/updatepost/ispostupdatetitle");
const { isview } = require("../validators/viewpost/isview");
const router = new koarouter();
router.post("/createpost", ispostemail, isposttitle, ispoststatus,createpostcontroller);
router.post("/deletepost", isdeletedpostemail);
router.post(
  "/updatepost",
  ispostupdateemail,
  ispostupdatetitle,
  ispostupdataestatus,updatepostcontroller
);
router.post("/deleteaccount", isdeletedaccountemail);
router.post("/getlist", getlist,getlistofpostcontroller);
router.get("/viewpost", isview,viewpostcontroller);
router.post("/search",searchpostvalidator,searchcontroller);

module.exports = router;
