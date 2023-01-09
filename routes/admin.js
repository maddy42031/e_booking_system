const express = require("express");
const admin = express.Router();
const jwt = require("jsonwebtoken");
const DB = require("./mongodb");
const paths = require("./path");
const path = require("path");

async function activateRooms(uid) {
  const client = DB();
  try {
    const database = client.db("Myusers");
    const user = database.collection("rooms");
    const query = {
      userID: uid,
    };
    const doc = await user.updateMany(query, {
      isActive: true,
    });
    console.log(doc.modifiedCount);
  } catch (error) {
    return error;
  } finally {
    await client.close();
  }
}

async function isExistUser(req, res) {
  const clientDB = DB();
  try {
    const database = clientDB.db("Myusers");
    const user = database.collection("user1");
    const query = { email: req.body.email, phoneNumber: req.body.phonenumber };
    const data = await user.findOne(query);
    console.log(data);
    if (data) {
      return {
        isExist: true,
        data: data,
      };
    } else {
      return false;
    }
  } catch (error) {
    return error;
  } finally {
    await clientDB.close();
  }
}
admin.post("/", function (req, res) {
  isExistUser(req, res).then((val) => {
    if (val.isExist) {
      res
        .cookie("token", "abcd", { path: "/user-rooms" })
        .redirect("/user-rooms");
      // activateRooms(val.data.userID).then(()=>{
      //   res.redirect('')
      // })
    } else {
      res.sendFile(path.resolve(paths, "Admin/error.html"));
    }
  });
});
module.exports = admin;
