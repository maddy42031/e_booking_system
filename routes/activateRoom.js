const express = require("express");
const activateRoom = express.Router();
const DB = require("./mongodb");

async function CheckingRoomActive(details) {
  const clientDB = DB();
  try {
    const database = clientDB.db("Myusers");
    const user = database.collection("rooms");
    const query = { roomNo: details.roomNo };
    const data = await user.findOne(query);
    const IS_ROOM_ALL_TRUE =
      data.activateRoom && data.isBooking && data.isBooked && !data.isPending;
    const CHECKING_PASSWORD = data.password == details.pswd;
    if (IS_ROOM_ALL_TRUE && CHECKING_PASSWORD) {
      await user.updateOne(query, {
        $set: {
          isActive: true,
          pswdActive: true,
        },
      });
      return { forRoom: true, forPswd: CHECKING_PASSWORD };
    } else {
      return { forRoom: IS_ROOM_ALL_TRUE, forPswd: CHECKING_PASSWORD };
    }
  } catch (error) {
    return error;
  } finally {
    await clientDB.close();
  }
}

activateRoom.put("/activateRoom", function (req, res) {
  CheckingRoomActive(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
});

module.exports = activateRoom;
