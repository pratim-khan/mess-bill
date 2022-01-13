const MongoClient = require('../mongo/mongo');
const jwt = require('jsonwebtoken');
const sessionstorage = require('sessionstorage');
const bcrypt = require('bcrypt');

module.exports = async function (context, req) {

  const { db, connection } = await MongoClient()

  const Signin = db.collection('signin')

  var token = jwt.sign({ foo: 'bar' }, 'shhhhh',{expiresIn: "1h"});
  let demo = sessionstorage.setItem("token",token)
  let id = req.body.id
  let phone = req.body.phone
  let password = req.body.password
  if(req.body.googleUser === false){
    try{
      let rest = await Signin.findOne({phone:phone})
      const validPassword = await bcrypt.compare(password, rest.password);
      if (validPassword){
          context.res={
              body:{
                  text:'You are successfully signed in',
                  name:rest.firstName ,
                  token: token,
                  phone :rest.phone
              }
          }
      }else{
          context.res={
              body:{
                  text:"Password not matched",
                  name: "null",
                  token: "null",
              }
          }
      }
    }catch(error){
      context.res={
        body:{
          text: "Phone number is not exist",
          name: "null",
          token: "null",
          error:error
        }
      }
    }
  }else{
    try{
      let demo = await Signin.findOne({email:req.body.email})
      if (demo.id ==  id){
        context.res={
            body:{
                text:'You are successfully signed in',
                name:demo.firstName ,
                token: token,
                
            }
        }
    }
    }catch{
      context.res={
          body:{
              text:"Your Google creditial is not found!!",
              name: "null",
              token: "null"
          }
      }
  }
  }
}
