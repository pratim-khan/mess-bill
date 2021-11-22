const MongoClient = require('../mongo/mongo');

module.exports = async function (context, req) {


  const { db, connection } = await MongoClient()

  const Bill = db.collection('bill')
  const data = req.body
//   console.log(data)
    function myfunction(item,index,arr){
        arr[index]=item.amount
    }
try{
    let findby = {};
    if(data){
        findby["name"]= data
    }
    const res = await Bill.find(findby)
    let body = await res.toArray()
    if(body.length >= 1 ){
       
        console.log(body.forEach(myfunction))

    }else{
        context.res={
            body:body
        }
    }

}catch(error){
    context.res={
        status:500 ,
        body : "can not get the value"
    }
}

}