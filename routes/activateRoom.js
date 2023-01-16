const express = require("express");
const activateRoom = express.Router();
const DB = require("./mongodb");

async function PswdCheck(pswd) {
  const client = DB();
  try {
    console.log(uid);
    const database = client.db("Myusers");
    const user = database.collection("rooms");
    const query = {
      id: pswd.pswd,
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
activateRoom.put("/", function (req, res) {
  CheckingRoomActive(req.body).then((data) => {
    res.send(data);
    // PswdCheck(req.body)
  });
});
module.exports = activateRoom;
