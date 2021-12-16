const MongoClient = require('../mongo/mongo');
const sessionstorage = require('sessionstorage');



module.exports = async function (context, req) {
   let token = req.query.token
  const { db, connection } = await MongoClient()
  let test = sessionstorage.getItem("token")

  const Bill = db.collection('bill')
        try{
            if(token === test){
                const res =await Bill.find({isdelete:false})
                let test = await res.toArray()
                context.res={
                    status:200,
                    body:test
                }
            }else{
                context.res={
                    body:"Error :400 :you can not access the data"
                }
            }


    }catch(error){
        context.res={
            body:'can not get the data'
        }
    }
}
