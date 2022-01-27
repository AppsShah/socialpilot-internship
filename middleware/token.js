// dependency
const jwt=require("jsonwebtoken")
require('dotenv').config();
const key="HelloAppsHowAreYouAreYouFine"
//generate token 
function generatetoken(token){
   return jwt.sign(token,key,{ expiresIn: '24h' })
}
//verify token
function verifytoken(token){
    return jwt.verify(token,key,(err,decoded)=>{
        if(err!=null)
        {
            return err
        }
        else
        {
           return decoded
        }
    })
}
module.exports={generatetoken,verifytoken}