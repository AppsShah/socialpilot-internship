const { deleteaccountfrom,deleteaccount } = require("../db/query")

const deleteaccountcontroller=(email)=>{
        return deleteaccount(email)
}
const deleteaccountfromcontroller=(email)=>{
    return deleteaccountfrom(email)
}

module.exports={deleteaccountcontroller,deleteaccountfromcontroller}