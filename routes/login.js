const express = require("express");
const login = express.Router();
const jwt = require("jsonwebtoken");
const DB = require("./mongodb");
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
login.post("/", function (req, res) {
  isExistUser(req, res).then((val) => {
    if (val.isExist) {
      const cookie = jwt.sign(
        { email: val.data.email, phoneNumber: val.data.phoneNumber },
        "MySecretkey"
      );
      res
        .cookie("token", cookie)
        .cookie("userId", val.data.userID)
        .redirect("/dashboard");
    } else {
      res.render("error",{
        title:"Not Found",
        heading:'ERROR 403 FOUND !',
        content:'No user at this email or password wrong .',
        backTo:"/login",
        backToContent:"Back To Login"
      })
    }
  });
});
module.exports = login;
