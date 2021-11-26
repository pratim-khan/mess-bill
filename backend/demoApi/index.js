const MongoClient = require('../mongo/mongo');
const jwt = require('jsonwebtoken');
// const localStorage = require ("node-localstorage");
const sessionstorage = require('sessionstorage');

module.exports = async function (context, req) {

  const { db, connection } = await MongoClient()

  let test = sessionstorage.getItem("token")
  // console.log(test)
    let token = req.query.token
  //  console.log(token)
}
  
  
