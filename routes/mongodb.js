const { MongoClient } = require("mongodb");

function client() {
  const uri =
    "mongodb+srv://Maddy420:maddy$4202002@cluster0.bki1b7i.mongodb.net/?retryWrites=true&w=majority";
  const clientDB = new MongoClient(uri);
  return clientDB;
}
module.exports = client;