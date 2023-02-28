const express = require("express");
const admin = express.Router();
const DB = require("./mongodb");

async function activateRooms(uid) {
  const client = DB();
  try {
    console.log(uid);
    const database = client.db("Myusers");
    const user = database.collection("rooms");
    const query = {
      id: uid,
    };
    const doc = await user.updateMany(query, {
      $set: {
        activateRoom: true,
      },
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
      activateRooms(val.data.userID).then(() => {
        res.redirect("/user-rooms")
      });
    } else {
      res.render("error",{
        title:"Not Found",
        heading:'ERROR 403 FOUND !',
        content:'No user at this email .',
        backTo:"/admin",
        backToContent:"Back To AdminPage"
      })
    }
  });
});
module.exports = admin;
