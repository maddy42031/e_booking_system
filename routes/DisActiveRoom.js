const express = require("express");
const DisActiveRoom = express.Router();
const DB = require("./mongodb");

async function DIS_ACTIVE(roomNO) {
  const client = DB();
  try {
    const database = client.db("Myusers");
    const user = database.collection("rooms");
    const query = {
      roomNo: roomNO,
    };
    const Room_Doc = await user.findOne(query);
    if (Room_Doc.pswdActive) {
      await user.updateOne(query, {
        $set: {
          isActive: false,
        },
      });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  } finally {
    await client.close();
  }
}

DisActiveRoom.put("/", function (req, res) {
    DIS_ACTIVE(req.body.roomNO)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
});

module.exports = DisActiveRoom;
