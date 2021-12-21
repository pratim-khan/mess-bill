const MongoClient = require('../mongo/mongo');
const bcrypt = require('bcrypt');

module.exports = async function (context, req) {

  const { db, connection } = await MongoClient()

  const Signin = db.collection('signin')
  const data = req.body
  let phone = req.body.phone
  var password = req.body.password
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(password, salt);

  try{
    if(req.body.googleUser===false){
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
    }else{
      let demo = await Signin.find({email:req.body.email}).toArray()
      if (demo.length == 0){
        await Signin.insert(data)
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
    }

  }catch(error){
    context.res={
      body:error
    }
  }
}