const express = require("express");
const route = express.Router();
const DB = require("./mongodb");

async function deleteAccount(id) {
  const clientDB = DB();
  try {
    const database = clientDB.db("Myusers");
    const user = database.collection("user1");
    const query = { userID: id };
    await user.deleteOne(query);
  } catch (error) {
    console.log(error);
  } finally {
    await clientDB.close();
  }
}

async function updateRooms(id) {
  const clientDB = DB();
  try {
    const database = clientDB.db("Myusers");
    const user = database.collection("rooms");
    const query = { id: id };
    await user.updateMany(query, {
      $set: {
        isBooking: false,
        id: "",
        password: "",
        checkin: "",
        checkout: "",
        roomType: "",
        isActive: false,
        isBooked: false,
        isPending: false,
        price: 0,
        activateRoom: false,
        pswdActive: false,
      },
    });
  } catch (error) {
    return error;
  } finally {
    await clientDB.close();
  }
}
route.delete("/", function (req, res) {
  console.log("delte", req);
  updateRooms(req.cookies.userId).then(() => {
    deleteAccount(req.cookies.userId).then(()=>{
        res.send("deleted")
    })
  });
});
module.exports = route;
