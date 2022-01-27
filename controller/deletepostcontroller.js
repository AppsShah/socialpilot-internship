const { deletepost } = require("../db/query")


const deletepostcontroller=async(email)=>{
    return deletepost(email)
}
module.exports={deletepostcontroller}