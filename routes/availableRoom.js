const express = require("express");
const availableRooms = express.Router();
const DB = require("./mongodb");
async function availableRoom() {
  const client = DB();
  try {
    const database = client.db("Myusers");
    const collection = database.collection("rooms");
    const query = {
      isBooking: false,
    };
    const find = collection.find(query);
    return await find.count();
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}
availableRooms.get("/", (req, res) => {
  availableRoom().then((val) => {
    res.send(String(val));
  });
});
module.exports = availableRooms;
