const MongoClient = require('../mongo/mongo');

module.exports = async function (context, req) {

  const { db, connection } = await MongoClient()

  const Bill = db.collection('bill')
    try{
        let findby = {};
        if(req.query.uid){
            findby["uid"]= parseInt(req.query.uid)
        }
        const res = await Bill.find(findby)
        let body = await res.toArray()
        if(body && Array.isArray(body) && body.length == 1){
            body = body[0]
            context.res={
                status:200,
                body: body
            }
        }
        context.res={
            body:body
        }
    }catch(error){
        context.res={
            status:500 ,
            body : "can not get the value"
        }
    }
}