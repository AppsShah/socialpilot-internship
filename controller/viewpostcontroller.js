const { viewpost } = require("../db/query")

const viewpostcontroller=(email)=>{
    return viewpost(email)
}
module.exports={viewpostcontroller}