const { insertsignupdata, findusername } = require("../db/query");
const bcrypt=require("bcrypt")

async function signup(username,email,password){
    try {
        return await insertsignupdata(username,email,password)
        
    } catch (error) {
            return error
    }
}
function hashingpassword(password)
{
    return bcrypt.hashSync(password,10)
}

const usernamecontroller=async(username)=>{
    return findusername(username)
}
module.exports={signup,hashingpassword,usernamecontroller};