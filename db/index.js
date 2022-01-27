// const connection=require("./connection")

// async function crudoperation(){
//     let mongoClient;
//     try {
//         mongoClient=await connection()
//         const db=mongoClient.db('internship-todolist')
//         const collection=await db.collection('signuptable').insertOne({email:"apps3838@gmail.com",password:"helloakshat"})
//         console.log(collection)
//     } catch (error) {
//         console.log(error)
//     }
//     // finally{
//     //     await mongoClient.close()
//     // }
// }
// // crudoperation()