const { logindata } = require("../db/query");
const bcrypt=require("bcrypt")

const logincontroller=async(email)=>{
    return logindata(email)
}

const hashingpasswordverify=async(password,dbpass)=>{
    return bcrypt.compare(password,dbpass)
}
module.exports={logincontroller ,hashingpasswordverify}