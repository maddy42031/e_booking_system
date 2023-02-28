const express = require("express");
const route = express.Router();
const DB = require("./mongodb");
async function getProfile(id) {
    const clientDB = DB();
    try {
      const database = clientDB.db("Myusers");
      const user = database.collection("user1");
      const query = { userID:id };
      const data = await user.findOne(query);
      console.log(data);
      return data;
    } catch (error) {
      return error;
    } finally {
      await clientDB.close();
    }
  }
route.get("/",function(req,res){
    getProfile(req.cookies.userId).catch(()=>{
        res.status(404).send("NOT FOUND")
    }).then((userData)=>{
        res.send(userData);
    })
})
module.exports = route;