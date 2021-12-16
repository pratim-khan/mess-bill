const MongoClient = require('../mongo/mongo');

module.exports = async function (context, req) {
    const data= req.body

  const { db, connection } = await MongoClient()

  const Bill = db.collection('bill')
  const UID = db.collection('uid')


  try{
    const demo= UID.update(
      {id:1},
      {$inc:{uid:1}}
  )
  const res = await UID.findOne({id:1})
  let uid = res.uid
    const bills = await Bill.insert(data)
    context.res={
        status:200,
        body:bills
    }
  }catch(error){
    context.res={
        status:500,
        body:'data cannot enter'
    }
  }
  try{
    const test = await Bill.findOneAndUpdate(
      {uid:data.uid},
      {$set:{date:data.date , amount:data.amount,description:data.description}},
      {returnNewDocument: true ,upsert:true,returnOriginal:false}
    )
    console.log(test.toArray())
    context.res={
      body:demo
    }
  }catch{

  }
    // console.log(data.uid)
    // try{
    //   if(data.uid === 0){
    //     data.uid = uid
    //     Bill.insert(data)
    //     context.res={
    //       body:data
    //     }
    //   }else{
    //     const test = await Bill.findOneAndUpdate(
    //     {uid:data.uid},
    //     {$set:{date:data.date , amount:data.amount,description:data.description}},
    //     {returnNewDocument: true ,upsert:true,returnOriginal:false}
    //   )
    //   context.res={
    //     body:test
    //   }
    //   }

    // }catch(error){
    //   context.res={
    //     body:error
    //   }
    // }
    
    
}