const MongoClient = require('../mongo/mongo');

module.exports = async function (context, req) {
    const data= req.body

  const { db, connection } = await MongoClient()

  const Bill = db.collection('bill')
  const UID = db.collection('uid')
  const demo= UID.update(
      {id:1},
      {$inc:{uid:1}}
  )
  const res = await UID.findOne({id:1})
  let uid = res.uid
  data["uid"]=uid
  try{
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
}