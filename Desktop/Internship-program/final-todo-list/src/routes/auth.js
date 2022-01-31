const koarouter = require("koa-router");
const { forgetpasswordcontroller } = require("../controller/auth-controller/forgetpasswordcontroller");
const { logincontroller } = require("../controller/auth-controller/logincontroller");
const { resetpasswordcontroller } = require("../controller/auth-controller/resetpasswordcontroller");
const { signupcontroller } = require("../controller/auth-controller/signupcontroller");
const { isemail } = require("../validators/forgetpassword/isemail");
const { emailverify } = require("../validators/login/emailverify");
const { isnull } = require("../validators/login/isnull");
const { passwordverify } = require("../validators/login/passwordverify");
const { isresetpass } = require("../validators/resetpassword/resetpass");
const { isbodynull } = require("../validators/signup/isbodynull");
const { isemailvalidate } = require("../validators/signup/isemailvalidate");
const {
  isusernameavailable,
} = require("../validators/signup/isusernameavailable");
const { passwordvalid } = require("../validators/signup/passwordvalid");
const router = new koarouter();
router.post(
  "/signup",
  isbodynull,
  isusernameavailable,
  isemailvalidate,
  passwordvalid,signupcontroller
);
router.post("/login", isnull, emailverify, passwordverify,logincontroller);

router.post("/forgetpassword", isemail,forgetpasswordcontroller);

router.post("/resetpassword", isresetpass,resetpasswordcontroller);

module.exports = router;
