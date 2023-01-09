const express = require("express");
const dashboard = express.Router();
const initialFolder = require("./path");
const path = require("path");

dashboard.get("/", function (req, res) {
  if (req.cookies.token) {
    res.sendFile(
      path.resolve(initialFolder, "Dashboard/Production/index.html")
    );
  } else {
    res.redirect("/login");
  }
});
module.exports = dashboard;
