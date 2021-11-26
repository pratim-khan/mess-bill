const MongoClient = require('../mongo/mongo');

module.exports = async function (context, req) {

  const { db, connection } = await MongoClient()

  const Signin = db.collection('signin')
  const data = req.body
  let phone = req.body.phone

  try{
    let rest = await Signin.find({phone:phone}).toArray()
    if (rest.length == 0){
        const test = await Signin.insert(data)
        context.res={
            body:{
                text:'You are succesfully register'
            }
        }
    }else{
        context.res={
            body:{
                text:"Your number is already register"
            }
        }
    }

  }catch(error){
    body:error
  }
}