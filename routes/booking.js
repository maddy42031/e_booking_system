const express = require("express");
const booking = express.Router();
const DB = require("./mongodb");

async function pendingRoom(userId) {
  const client = DB();
  try {
    const database = client.db("Myusers");
    const collection = database.collection("rooms");
    const Pendingquery = {
      isPending: true,
      id: userId,
    };
    const Bookedquery = {
      isBooked: true,
      id: userId,
    };
    const findPending = collection.find(Pendingquery);
    const findBooked = collection.find(Bookedquery);
    const dataArr = [];
    await findPending.forEach((val) => dataArr.push(val));
    await findBooked.forEach((val) => dataArr.push(val));
    if (dataArr.length === 0) {
      return false;
    } else {
      return dataArr;
    }
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}
booking.get("/", function (req, res) {
  console.log(req.body);
  pendingRoom(req.cookies.userId).then((bookingDetails) => {
    if (bookingDetails) {
      res.send(bookingDetails);
    } else {
      res.send(false);
    }
  });
});

module.exports = booking;
