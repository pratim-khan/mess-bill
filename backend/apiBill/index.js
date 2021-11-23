const MongoClient = require('../mongo/mongo');

module.exports = async function (context, req) {

  const { db, connection } = await MongoClient()

  const Bill = db.collection('bill')
    try{
        const res =await Bill.find({isdelete:false})
        let body = await res.toArray()
        context.res={
            status:200,
            body
        }
    }catch(error){
        context.res={
            body:'can not get the data'
        }
    }

}