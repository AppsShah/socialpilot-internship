const { createpost, findtitle } = require("../db/query")

const createpostcontroller=async(email,title,des,status)=>{
    return createpost(email,title,des,status)
}
const findtitlecontroller=async(title)=>{
    return findtitle(title)
}
module.exports={createpostcontroller ,findtitlecontroller}