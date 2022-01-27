const {
  createpostcontroller,
  findtitlecontroller,
} = require("../controller/createpostcontroller");
const validator = require("validator");
const { logindata } = require("../db/query");

const createpostvalidator = async (ctx) => {
  //     title : txt,
  // DESCRIPTION:
  // isDeleted: false
  // createdData:
  // lastUpdateDate
  // status : TODO || inProgress || done
  const email = ctx.request.body.email;
  const title = ctx.request.body.title;
  const des = ctx.request.body.description;
  const status = ctx.request.body.status || "TODO";

  if (email == null || !validator.isEmail(email)) {
    ctx.body = "email not found or not proper";
    ctx.status = 400;
  } else {
    const data = await logindata(email);
    if (data == null) {
      ctx.body = "user not found please create account first";
      ctx.status = 400;
      console.log("user not found please create account first");
    } else {
      if (title == null) {
        ctx.body = "Title not found";
        ctx.status = 400;
        console.log("title not found");
      } else {
        if (status == "TODO" || status == "inProcess" || status == "done") {
          const ack = await createpostcontroller(email, title, des, status);
          if (ack == null) {
            ctx.body = "Something went wrong";
            ctx.status = 400;
            console.log("something went wrong");
          } else {
            ctx.body = "Data added successfully";
            console.log("data added successfully");
          }
        } else {
          ctx.body = "status can be TODO or inProcess or done";
          ctx.status = 400;
        }
      }
    }
  }
};
module.exports = { createpostvalidator };
