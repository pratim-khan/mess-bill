const MongoClient = require('../mongo/mongo');
const sessionstorage = require('sessionstorage');

module.exports = async function (context, req) {
    const { db, connection } = await MongoClient()
    const Check = db.collection('check')
    let token = req.query.token
    let test = sessionstorage.getItem("token")
    console.log(token)
    console.log(test)
    try{
        if(token === test){
            let rest = await Check.find({}).toArray()
            if(rest.length!=0){
               context.res={
                   body:rest
               }
            }
        }else{
            context.res={
                body:"Error:400:you can not access this data"
            }
        }

    }catch(error){
        context.res={
            body:error
        }
    }
}