const { updatedata } = require("../db/query")

const resetpasswordcontroller=async(d,newpassword)=>{
    // console.log(d.id)
    return updatedata(d._id,newpassword)
}
module.exports={resetpasswordcontroller}