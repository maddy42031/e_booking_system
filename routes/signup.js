const express = require("express");
const signup = express.Router();
const jwt = require("jsonwebtoken");
const DB = require("./mongodb");
const crypto = require("crypto");
const path = require("path");
const paths = require("./path");

async function isExistUser(req, res) {
  const clientDB = DB();
  try {
    const database = clientDB.db("Myusers");
    const user = database.collection("user1");
    const query = { email: req.body.email };
    const data = await user.findOne(query);
    if (data) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  } finally {
    await clientDB.close();
  }
}
async function createUser(req) {
  const client = DB();
  try {
    const database = client.db("Myusers");
    const collection = database.collection("user1");
    let myKey = crypto.createCipher("aes-128-cbc", req.body.email);
    let myStr = myKey.update("abc", "utf-8", "hex");
    myStr += myKey.final("hex");
    console.log(myStr);
    const data = {
      email: req.body.email,
      userID: myStr,
      bookedStatus: false,
      checkInStatus: false,
      phoneNumber: req.body.phonenumber,
      userName: req.body.username,
    };
    await collection.insertOne(data);
    return myStr;
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}
signup.post("/", function (req, res) {
  isExistUser(req, res)
    .then((val) => {
      if (val) {
        res.sendFile(path.resolve(paths, "SignUpPage/error.html"));
      } else {
        createUser(req).then((cryptoCookie) => {
          const cookie = jwt.sign(
            { email: req.body.email, phoneNumber: req.body.phoneNumber },
            "MySecretkey"
          );
          res
            .cookie("token", cookie)
            .cookie("userId", cryptoCookie)
            .redirect("/dashboard");
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = signup;
