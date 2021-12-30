const MongoClient = require('../mongo/mongo');

module.exports = async function (context, req) {
    const { db, connection } = await MongoClient()
    const Check = db.collection('check')
    const data = req.body
    try{
        const test = Check.insertOne(data)
        context.res={
            body:test
        }
    }catch(error){
        context.res={
            body:error
        }
    }

}