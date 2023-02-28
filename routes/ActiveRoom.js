const express = require("express");
const ActiveRoom = express.Router();
const DB = require("./mongodb");
async function activeRoom(roomNO) {
  const client = DB();
  try {
    const database = client.db("Myusers");
    const user = database.collection("rooms");
    const query = {
      roomNo: roomNO,
    };
    const Room_Doc = await user.findOne(query);
    console.log(Room_Doc);
    if (Room_Doc.pswdActive) {
      await user.updateOne(query, {
        $set: {
          isActive: true,
        },
      });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

ActiveRoom.put("/active", function (req, res) {
  activeRoom(req.body.roomNO)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
});

module.exports = ActiveRoom;
