const MongoClient = require("mongodb").MongoClient;
const localSrv = "mongodb://localhost:27017/mydb";

MongoClient.connect(localSrv, (err, db) => {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});