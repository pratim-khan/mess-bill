
const MongoClient = require('../mongo/mongo');

module.exports = async function (context, req) {


  const { db, connection } = await MongoClient()

  const Bill = db.collection('bill')
  const data = req.body
  const total= await Bill.aggregate(
      [
          {$match:{isdelete:false}},
        //   {total:{$sum: '$amount'}}
        {$group:{_id:null,total:{$sum:"$amount"}}}
      ]
  ).toArray()
  const test =await Bill.aggregate(
      [
          {$match: {$and:[{name: data},{isdelete:false}]}},
          {$group:{_id:null,total:{$sum:'$amount'}}}
      ]
  ).toArray()

    if(test.length>=1){
        try{
            let avg = parseInt((total[0].total)/6)
            let res = test[0].total
            let due = (res-avg)
            context.res={
                body: {
                    due:due
                }
            }
        }catch(error){
            body="cannot get data"
}

}else{
    let  avg = parseInt((total[0].total)/6)
    context.res={
        body:{
            due:avg * -1
        }
    }
}
    
    
    
}