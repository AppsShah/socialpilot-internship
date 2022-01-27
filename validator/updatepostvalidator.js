// const { updatetitlefinder ,updatepostcontroller } = require("../controller/updatepostcontroller");
const validator=require("validator");
const { updatepostcontroller } = require("../controller/updatepostcontroller");
const updatepostvalidator=async(ctx)=>{
        const email=ctx.request.body.email;
        const title=ctx.request.body.title;
        const description=ctx.request.body.description;
        let status=ctx.request.body.status;
        if(email==undefined)
        {
            ctx.body="Enter email"
            ctx.status=400
        }
        else
        {
            if(!validator.isEmail(email))
            {
                ctx.body="Enter email is not proper"
                ctx.status=400
            }
            else
            {   
                if(title!=undefined)
                {
                    if(description!=undefined)
                    {

                        if(status!==undefined)
                            {
                                console.log(status=="inProcess")
                                    if(status=="done" || status=="inProcess" || status=="TODO")
                                    {
                                        const ack=await updatepostcontroller(email,title,description,status)
                                        console.log(ack)
                                           
                                    }
                                    else
                                    {
                                        console.log("status cannot set")
                                    }
                            }
                        else
                        {
                            ctx.body="Enter correct status"
                            ctx.status=400
                        }
                    }
                    else
                    {
                        ctx.body="enter description"
                        ctx.status=400
                        console.log("enter desscription")
                    }
                }
                else
                {
                    ctx.body="enter title"
                    ctx.status=400
                    console.log("enter title")
                }

            }
        }
        
        // let isDeleted=ctx.request.body.isDeleted;
        
//         if(title==null)
//         {
//             ctx.body="Null title please enter title"
//             ctx.status=400;
//         }
//        else
//        {
//             const d=await updatetitlefinder(title)
//             console.log(d)
//             if(d==null)
//             {
//                 console.log("enter proper title")
//                 ctx.body="enter proper title"
//                 ctx.status=400
//             }
//             else
//             {
//                 if(typeof(isDeleted)!=Boolean)
//                 {
//                     ctx.request.body.isDeleted=d.isDeleted;
//                     console.log("isDeleted cannot set")
//                 }
//                
//                console.log(ctx.request.body)
//                const db= await updatepostcontroller(ctx.request.body)
//                console.log(db)
//             }
//        }
}
module.exports={updatepostvalidator}