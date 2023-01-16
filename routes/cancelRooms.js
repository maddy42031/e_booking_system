const express = require("express");
const cancelRooms = express.Router();
const DB = require("./mongodb");
async function cancelRoomsDatas(userId, roomsNo) {
  const clientDB = DB();
  try {
    const database = clientDB.db("Myusers");
    const user = database.collection("rooms");
    for (let i = 0; i < roomsNo.length; i++) {
      const roomFilter = { roomNo: roomsNo[i] };
      const updateRoomDoc = {
        $set: {
          isBooking: false,
          id: "",
          checkin: "",
          checkout: "",
          roomType: "",
          isPending: false,
          price:0,
          password:0,
          isBooked:false,
          isActive:false,
        },
      };
      await user.updateOne(roomFilter, updateRoomDoc);
    }
  } catch (error) {
    return error;
  } finally {
    await clientDB.close();
  }
}
cancelRooms.put("/", function (req, res) {
  console.log(req.headers, req.body);
  cancelRoomsDatas(req.cookies.userId, req.body.roomNo)
    .catch(console.dir)
    .then(() => {
      res.send(true);
    });
});
module.exports = cancelRooms;
