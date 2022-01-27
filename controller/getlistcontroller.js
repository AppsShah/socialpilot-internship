const { getlist } = require("../db/query");


const getlistcontroller=async(currentPage,limit)=>{
    const skip=(currentPage-1)*limit;
        return getlist(skip,limit)
}

module.exports={getlistcontroller}