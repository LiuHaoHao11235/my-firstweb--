const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "myproject";
async function sent_loginForm_to_database(username, phonenumber) {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("test");
  const insertResult = await collection.insertOne({
    username: username,
    phonenumber: phonenumber,
  });
  console.log("Inserted documents =>", insertResult);
  return "done.";
}
async function get_userdata_from_database(collect) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collect);
  const findResult = await collection.find({}).toArray();
  //   console.log(findResult);
  return findResult;
}
module.exports = {
  sentmeassge: (req, res) => {
    res.send("respond with a resource!!");
  },
  get_commodity: (req, res) => {
    var page = req.query.page;
    console.log(page);
    if (page) {
      collect = "commodity" + page;
    } else {
      collect = "commodity";
    }
    get_userdata_from_database(collect)
      .then((findResult) => {
        res.json(findResult);
      })
      .catch(console.error)
      .finally(() => {
        console.log("finally");
        client.close();
        res.end();
      });
  },
  get_topphone: (req, res) => {
    collect = "TOP_phones";
    get_userdata_from_database(collect)
      .then((findResult) => {
        res.json(findResult);
      })
      .catch(console.error)
      .finally(() => {
        console.log("finally");
        client.close();
        res.end();
      });
  },
};
