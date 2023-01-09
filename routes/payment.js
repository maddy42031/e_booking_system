const express = require("express");
const payment = express.Router();
const DB = require("./mongodb");
async function Payment(details) {
  const client = DB();
  function PSWD(no) {
    let pswdNumber = "";
    for (let i = 0; i < 5; i++) {
      pswdNumber += String(Math.floor(Math.random() * 9 - 0) + 0);
    }
    return Number(pswdNumber + no);
  }

  try {
    const db = client.db("Myusers");
    const collection = db.collection("rooms");
    for (let i = 0; i < details.length; i++) {
      const query = {
        roomNo: details[i].roomNo,
      };
      const update = {
        $set: {
          isBooked: true,
          isPending: false,
          password: PSWD(query.roomNo),
        },
      };
      const doc = await collection.updateOne(query, update);
      console.log(doc.acknowledged);
    }
  } finally {
    await client.close();
  }
}
payment.put("/", function (req, res) {
  Payment(req.body.paymentDetails).then(() => {
    res.send("hello");
  });
});
module.exports = payment;
