const { MongoClient } = require("mongodb");

const config = {
  url: "mongodb+srv://messBill:messbill1234@cluster0.wnozb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  dbName: "messbill"
};

async function createConnection() {
  const connection = await MongoClient.connect(config.url, {
    useNewUrlParser: true
  });
  const db = connection.db(config.dbName);
  return {
    connection,
    db
  };
}

module.exports = createConnection;