const validator = require("validator");
const {
  signup,
  hashingpassword,
  usernamecontroller,
} = require("../controller/signupcontroller");
const { isEmailindb } = require("../db/query");

async function signupvalidator(ctx) {
  const username = ctx.request.body.username;
  const email = ctx.request.body.email;
  const pass = ctx.request.body.password;
  console.log(email);
  if (username == undefined || email == undefined || pass == undefined) {
    ctx.body = "all username email and password should not be null";
    ctx.status = 400;
  }else {
    const data = await usernamecontroller(username);
    if (data != null) {
      ctx.body = "username already present";
      ctx.status = 400;
    } else {
      if (pass.length < 8) {
        ctx.body = "Enter password more then 8 char";
        ctx.status = 400;
      } else {
        //email check
        if (!validator.isEmail(email)) {
          ctx.body = "Please Enter Valid Email";
          ctx.status = 400;
        } else {
          //password hashing
          const passhash = hashingpassword(pass);
          const dat = await isEmailindb(email);
          console.log(dat);
          if (dat !== null) {
            ctx.body = "Email already present";
            ctx.status = 400;
          } else {
            const d = await signup(username, email, passhash);
            console.log(d);
            ctx.body = "Sign up successfull";
          }
        }
      }
    }
  }
}
module.exports = signupvalidator;
