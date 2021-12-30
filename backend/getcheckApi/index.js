const MongoClient = require('../mongo/mongo');

module.exports = async function (context, req) {
    const { db, connection } = await MongoClient()
    const Check = db.collection('check')
    try{
            let rest = await Check.find({}).toArray()
            if(rest.length!=0){
               context.res={
                   body:rest
               }
            }
    }catch(error){
        context.res={
            body:error
        }
    }
}