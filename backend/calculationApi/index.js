const MongoClient = require('../mongo/mongo');

module.exports = async function (context, req) {


  const { db, connection } = await MongoClient()
  const Check = db.collection("check");
  const Bill = db.collection("bill")
  const data = req.body
  const totalAmount= await Bill.aggregate(
    [
        {$match:{isdelete:false}},
        {$group:{_id:null,total:{$sum:"$amount"}}}
    ]).toArray()
    const test =await Bill.aggregate(
        [
            {$match: {$and:[{name: data},{isdelete:false}]}},
            {$group:{_id:null,total:{$sum:'$amount'}}}
        ]
    ).toArray()
    var totalMeal =0
    var a = ['Pratim' ,'Subhankar' ,'Kamal','Chinmoy','Swagata','Sourav'];
    for(let i of a){
        let TotalMeal = await Check.aggregate([ { $match : {[i]:true}  } ,{$group:{_id:null,total:{$sum:1}}}]).toArray();
        if(TotalMeal.length >= 1){
        totalMeal = totalMeal + TotalMeal[0].total
        }else{
            continue
        }
    }
    console.log(totalMeal)
    let perMealAmount = totalAmount[0].total / totalMeal
    console.log(perMealAmount)

    let dataMeal = await Check.aggregate([ { $match : { [data]: true }  } ,{$group:{_id:null,total:{$sum:1}}}]).toArray();
    let x = perMealAmount * dataMeal[0].total
    try{
        if(test.length >= 1){
            if(dataMeal.length >= 1){
                let x = perMealAmount * dataMeal[0].total
                let avg = test[0].total
                due = parseInt(x - avg)
                if(due >= 0){
                    context.res={
                        body:{
                            due:"You will pay " + due
                        }
                    }
                }else{
                    context.res={
                        body:{
                            due:"You will get " + (-1 *due)
                        }
                    }  
                }
            }else{
                context.res={
                    body:{
                        due:"You will not get any money"
                    }
                }
            }
        }else{
            context.res={
                body:{
                    due:"You will pay " + parseInt(x)
                }
            }
        }

    }catch(error){
        context.res={
            body:"Can not get data"
        }
    }
    
}