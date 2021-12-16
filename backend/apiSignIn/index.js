const MongoClient = require('../mongo/mongo');
const jwt = require('jsonwebtoken');
// const localStorage = require ("node-localstorage");
const sessionstorage = require('sessionstorage');

module.exports = async function (context, req) {

  const { db, connection } = await MongoClient()

  const Signin = db.collection('signin')

  var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
  let demo = sessionstorage.setItem("token",token)
  let test = sessionstorage.getItem("token")
  // console.log(test)
  let id = req.body.id
  let phone = req.body.phone
  let password = req.body.password
  // let name = req.body.name

  // try {
  //     let rest = await Signin.findOne({ phone:phone})
  //     if(rest.password === password){
  //       context.res={
  //         body:{
  //           text:'You are successfully signed in',
  //           name:rest.name ,
  //           token: token
  //         }
  //       }
  //     }else{
  //     context.res={
  //       body:{
  //         text:'Password not matched'
  //       }
  //     }
  //     }

  // }catch (error) {
  //         context.res = {
  //           body:{
  //             text:'Phone number is not exist',
  //           }
  //         }
  //       }
  try{
    if(req.body.googleUser === false){
      console.log("Phone", req.body.googleUser)
      let rest = await Signin.findOne({phone:phone})
      if (rest.password == password){
          context.res={
              body:{
                  text:'You are successfully signed in',
                  name:rest.name ,
                  token: token
              }
          }
      }else{
          context.res={
              body:{
                  text:"Password not matched"
              }
          }
      }
    }else{
      console.log("Google", req.body.email)
      let demo = await Signin.findOne({email:req.body.email})
      
      console.log(demo.id , id , demo.id == id)
      if (demo.id ==  id){
        context.res={
            body:{
                text:'You are successfully signed in',
                name:demo.name ,
                token: token
            }
        }
    }else{
        context.res={
            body:{
                text:"Your Google creditial is not found!!"
            }
        }
    }
    }

  }catch(error){
    context.res={
      body:{
        text: "Phone number is not exist",
        error:error
      }
    }
  }

}
