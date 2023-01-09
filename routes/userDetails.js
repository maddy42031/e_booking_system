const express = require("express");
const userDetails = express.Router();
const DB = require("./mongodb");
async function UserDetails(userID, details) {
  const client = DB();
  try {
    const db = client.db("Myusers");
    const collection = db.collection("user1");
    const query = {
      userID: userID,
    };
    const doc = await collection.findOne(query);
    if (
      doc.userName === details.Username &&
      doc.phoneNumber === details.phoneNumber
    ) {
        return true;
    }else{
        
    }
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}
userDetails.post("/", function (req, res) {
  console.log(req.cookies, req.body);
  UserDetails(req.cookies.userID, req.body);
  res.send("Getted");
});
module.exports = userDetails;
