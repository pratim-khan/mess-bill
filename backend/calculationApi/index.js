const MongoClient = require('../mongo/mongo');
const sessionstorage = require('sessionstorage');

module.exports = async function (context, req) {
    const { db, connection } = await MongoClient()
    const Bill = db.collection('bill')
    const Check = db.collection('check')
    let test = sessionstorage.getItem("token")
    let token = req.query.token
    var totalAmount = 0
    var totalMeal =0
    personMeal = []
    personAmount = []
    personAmountPaid = []
    const month = req.query.month
    const year = req.query.year
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    var a = ['Pratim' ,'Subhankar' ,'Kamal','Chinmoy','Swagata','Sourav'];
    try{
        if(token == test){
            const resBill =await Bill.find({isdelete:false}).toArray()
        const arrayBill =[]
        resBill.forEach(function(item){
            date = item.date.split("-")
            if(parseInt(date[0]) == year && parseInt(date[1]) == monthNames.indexOf(month)+ 1) {
                arrayBill.push(item)
                totalAmount = totalAmount + item.amount
            }
        })
        const resCheck =await Check.find().toArray()
        const arrayCheck =[]
        resCheck.forEach(function(item){
            date = item.date.split("-")
            if(parseInt(date[0]) == year && parseInt(date[1]) == monthNames.indexOf(month)+ 1){
                arrayCheck.push(item)
                a.forEach(function(i){
                    if(item[i] == true){
                        totalMeal = totalMeal+1
                    }
                })
            }
        })
        a.forEach(function(item){
            let x = 0
            arrayCheck.forEach(function(i){
                if(i[item]==true){
                    x = x+1
                }
            })
            personMeal.push({[item]:x})
        })
        a.forEach(function(item){
            let x =0
            arrayBill.forEach(function(i){
                if(i.name == item){
                    x = x + i.amount
                }
            })
            personAmount.push({[item]:x})
        })
        var perMealAmount = totalAmount / totalMeal

        a.forEach(function(item,index){
           var personamonut = parseInt(Object.values(personMeal[index])) * perMealAmount
           var personamountpaid =  parseInt(Object.values(personAmount[index])) - personamonut
           personAmountPaid.push({[item]:parseInt(personamountpaid)})
        })
        context.res={
            body:personAmountPaid
        } 
        }
        
    }catch(error){
        context.res={
            body: error
        }
    }

}