const validator = require("validator");
const {
  logincontroller,
  hashingpasswordverify,
} = require("../controller/logincontroller");

const loginvalidator = async (ctx) => {
  const email = ctx.request.body.email;
  const pass = ctx.request.body.password;
  console.log(email, pass);
  if (email == undefined || pass == undefined) {
    ctx.body = "Please Enter Email or Password";
    ctx.status = 400;
  } else {
    if (!validator.isEmail(email)) {
      ctx.body = "please Enter correct Email";
      ctx.status = 400;
    } else {
      if (pass.length < 8) {
        ctx.body = "please Enter correct Password";
        ctx.status = 400;
      } else {
        // console.log("finally reach to login controller")
        const d = await logincontroller(email);
        if (d == null) {
          console.log("Email not verified");
          ctx.body = "Email Not verified";
          ctx.status = 400;
        } else {
          const temp=await hashingpasswordverify(pass, d.password);
          if(temp)
          {
              ctx.body="Login Successfull"
              console.log("login successfull")
          }
          else
          {
              ctx.body="Login not successfull"
              ctx.status=400
              console.log("login not successfull")
          }
        }
      }
    }
  }
};
module.exports = { loginvalidator };
