const express = require("express");
const dateTime = express.Router();
const DB = require("./mongodb");

async function checkInCheck(checkin, userId) {
  const clientDB = DB();
  try {
    const database = clientDB.db("Myusers");
    const user = database.collection("rooms");
    const query = {
      checkin: checkin,
      id: userId,
    };
    const doc = user.find(query);
    console.log('checkin come :',doc);
    if ((await doc.count()) === 0) {
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
async function updateRoom(req) {
  const client = DB();
  try {
    const database = client.db("Myusers");
    const roomCollection = database.collection("rooms");
    const roomFilter = { isBooking: false };
    const updateRoomDoc = {
      $set: {
        isBooking: true,
        id: req.cookies.userId,
        checkin: req.body.checkin,
        checkout: req.body.checkout,
        roomType: req.body.roomType,
        isPending: true,
        price: req.body.price,
      },
    };
    for (let i = 0; i < req.body.noOfRooms; i++) {
      await roomCollection.updateOne(roomFilter, updateRoomDoc);
    }
    const findDoc = roomCollection.find({
      id: req.cookies.userId,
      isPending: true,
    });
    const roomData = [];
    await findDoc.forEach((val) => {
      roomData.push({
        roomNo: val.roomNo,
        checkin: val.checkin,
        checkout: val.checkout,
        roomType: val.roomType,
        price: val.price,
      });
    });
    return roomData;
  } finally {
    await client.close();
  }
}

dateTime.put("/", (req, res) => {
  console.log(req.body);
  checkInCheck(req.body.checkin, req.cookies.userId).then((val) => {
    console.log(val);
    if (val) {
      updateRoom(req)
        .then((roomDetail) => {
          res.send({
            message: "Room booked !",
            isBooked: true,
            roomDetail: roomDetail,
          });
        })
        .catch((err) => {
          res.send(err);
        });
    } else {
      res.send({
        message: "The date has been already booked.",
        isBooked: false,
      });
    }
  });
});
module.exports = dateTime;
