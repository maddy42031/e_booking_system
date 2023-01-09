const express = require("express");
const home = express.Router();
const initialFolder = require("./path");
const path = require("path");
const jwt = require("jsonwebtoken");
const DB = require("./mongodb");

async function authAccessDb(data) {
  const clientDB = DB();
  try {
    const database = clientDB.db("Myusers");
    const user = database.collection("user1");
    const query = { email: data.email };
    const doc = await user.findOne(query);
    if (doc) {
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

home.get("/", (req, res) => {
  if (req.cookies.token || req.headers.accountVerify) {
    const cookieParse = jwt.verify(req.cookies.token, "MySecretkey");
    if (cookieParse) {
      authAccessDb(cookieParse).then((val) => {
        if (val) {
          res.redirect("/dashboard");
          res.end();
        } else {
          res.sendFile(
            path.resolve(initialFolder, "Homepage/index.html")
          );
        }
      });
    }
  } else {
    res.sendFile(path.resolve(initialFolder, "Homepage/index.html"));
  }
});

module.exports = home;
