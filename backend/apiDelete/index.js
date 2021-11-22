const MongoClient = require('../mongo/mongo');

module.exports = async function (context, req) {

  const { db, connection } = await MongoClient()

  const Bill = db.collection('bill')
  
  const UID = req.body.uid
  Bill.update(
      {uid:UID},
      {$set:{
        isdelete:"true"
      }
    }
  )

}