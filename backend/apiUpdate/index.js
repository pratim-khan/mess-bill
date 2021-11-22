const MongoClient = require('../mongo/mongo');

module.exports = async function (context, req) {
    const data= req.body ||{}

  const { db, connection } = await MongoClient()

  const Bill = db.collection('bill')

//   const data = req.body ||{}
  const ID = req.body.id
    try{
        Bill.updateMany(
            {id:ID},
            {$set:{name:req.body.name,username:req.body.username,email:req.body.email}}
        )
    }catch(error){

    }
}