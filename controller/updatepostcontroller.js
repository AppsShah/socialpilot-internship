const { findemail ,updatepost } = require("../db/query");

const updateemailfinder=(email)=>{
        return findemail(email)
}
const updatepostcontroller=(email,title,description,status)=>{
    return updatepost(email,title,description,status)
}
module.exports={updatepostcontroller}