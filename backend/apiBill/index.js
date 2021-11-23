const MongoClient = require('../mongo/mongo');

module.exports = async function (context, req) {
    authenticate = req.body
  const { db, connection } = await MongoClient()

  const Bill = db.collection('bill')
    try{
        if(authenticate == true){
            const res =await Bill.find({isdelete:false})
            let test = await res.toArray()
            context.res={
                status:200,
                body:{
                    data: test
                }
            }
        }else{
            context.res={
                status:400,
                body:{
                    data:'you are not allow to access this site'
                }
            }
        }

    }catch(error){
        context.res={
            body:'can not get the data'
        }
    }
    // context.res={
    //     body:{authenticate}
    // }
}