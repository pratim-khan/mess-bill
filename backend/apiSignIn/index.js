const MongoClient = require('../mongo/mongo');

module.exports = async function (context, req) {

  const { db, connection } = await MongoClient()

  const Signin = db.collection('signin')

  
  let phone = req.body.phone
  let password = req.body.password
  // let name = req.body.name
  let authenticate = req.body.authenticate

  try {
    if(authenticate === "true"){
      let rest = await Signin.findOne({ phone:phone})
      if(rest.password === password){
        context.res={
          body:{
            text:'You are successfully signed in',
            name:rest.name
          }
        }
      }else{
      context.res={
        body:{
          text:'Password not matched'
        }
      }
      }
    }
    else{
      context.res={
        body:{
          text:'you are not authorized to access the data '
        }
      }
    }

  }catch (error) {
          context.res = {
            body:{
              text:'Phone number is not exist',
            }
          }
        }

      }
  
  
