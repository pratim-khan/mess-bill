const MongoClient = require('../mongo/mongo');
const FileReader = require('filereader')

// module.exports = async function (context, req) {
//     const data= req.body

//   const { db, connection } = await MongoClient()

  // const Bill = db.collection('bill')
//   const UID = db.collection('uid')

//     try{
//       if(data.uid===0){
//         const res = await UID.findOne({id:1})
//         let uid = res.uid
//         const demo= UID.update(
//         {id:1},
//         {$inc:{uid:1}})
//         data.uid = uid;
//         const bills = await Bill.insert(data)
//         context.res={
//           status:200,
//           body:bills}
//         }else{
//             const test = await Bill.findOneAndUpdate(
//             {uid:data.uid},
//             {$set:{date:data.date , amount:data.amount,description:data.description}},
//             {returnNewDocument: true ,upsert:true,returnOriginal:false}
//             )
//             context.res={
//             body:test
//           }
//         }
//     }catch(error){

//     }

    
// }
const fs = require ('fs');
const { decode } = require('punycode');
module.exports = async function (context, req) {
  const { db, connection } = await MongoClient()

  const Bill = db.collection('bill')
  const data = req.body
  // const  Data = await fs.readFileSync("C:/Users/prati/Desktop/New Text Document.json")
  // const  Data = await fs.readFileSync(data.image)
  // console.log(Data.toString()|JSON)
  // var reader = new FileReader()
  const bills = await Bill.insert(data)
          context.res={
           status:200,
           body:bills}

  console.log(data)
}
