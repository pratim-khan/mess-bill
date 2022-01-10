const MongoClient = require('../mongo/mongo');
const sessionstorage = require('sessionstorage');

module.exports = async function (context, req) {
    const { db, connection } = await MongoClient()
    const Bill = db.collection('bill')
    let test = sessionstorage.getItem("token")
    let token = req.query.token
    const month = req.query.month
    const year = req.query.year
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    try{
        if(test == token){
            const res =await Bill.find({isdelete:false}).toArray()
            const array =[]
            res.forEach(function(item){
                date = item.date.split("-")
                if(parseInt(date[0]) == year && parseInt(date[1]) == monthNames.indexOf(month)+ 1) {
                    array.push(item)
                }
            })
            if(array.length >= 1){
                context.res={
                    body:array
                }
            }

        }else{
            context.res={
                body:"Error : you can not get the data"
            }
        }
    }catch(error){
        context.res={
            body: error
        }
    }

}