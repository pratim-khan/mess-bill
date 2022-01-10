// const MongoClient = require('../mongo/mongo');
// const sessionstorage = require('sessionstorage');

// module.exports = async function (context, req) {
//     const { db, connection } = await MongoClient()
//     const Check = db.collection('check')
//     let token = req.query.token
//     let test = sessionstorage.getItem("token")
//     try{
//         if(token === test){
//             let rest = await Check.find({}).toArray()
//             if(rest.length!=0){
//                context.res={
//                    body:rest
//                }
//             }
//         }else{
//             context.res={
//                 body:"Error:400:you can not access this data"
//             }
//         }

//     }catch(error){
//         context.res={
//             body:error
//         }
//     }
// }
const MongoClient = require('../mongo/mongo');
const sessionstorage = require('sessionstorage');

module.exports = async function (context, req) {
    const { db, connection } = await MongoClient()
    const Check = db.collection('check')
    let test = sessionstorage.getItem("token")
    let token = req.query.token
    const month = req.query.month
    const year = req.query.year
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    try{
        if(token == test){
            const res =await Check.find().toArray()
            const array =[]
            res.forEach(function(item){
                date = item.date.split("-")
                if(parseInt(date[0]) == year && parseInt(date[1]) == monthNames.indexOf(month)+ 1){
                    array.push(item)
                }
            })
            context.res={
                body:array
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