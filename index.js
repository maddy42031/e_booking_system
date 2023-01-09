const path = require("path");
const express = require("express");
const app = express();
const cookie = require("cookie-parser");
const home = require("./routes/home");
const signup = require("./routes/signup");
const dashboard = require("./routes/dashboard");
const availableRoom = require("./routes/availableRoom");
const dateTime = require("./routes/dateTime");
const login = require("./routes/login");
const cancelRooms = require("./routes/cancelRooms");
const booking = require("./routes/booking");
const userDetails = require("./routes/userDetails");
const payment = require("./routes/payment");
const bodyParser = require("body-parser");
const admin = require("./routes/admin");
const { MongoClient } = require("mongodb");

const DB = require("./routes/mongodb");
// coming traditional HTML form submits
app.use(express.urlencoded({ extended: true }));

// Serving Static JavaScript files
app.use(
  "/dashboard.js",
  express.static(path.resolve(__dirname, "Dashboard/Production/dashboard.js"))
);
// Serving css files
app.use("/public", express.static(path.resolve(__dirname, "Public")));
// Serving image files
app.use("/images", express.static(path.resolve(__dirname, "images")));

// Serving HTML files
app.use(
  "/signUp",
  express.static(path.resolve(__dirname, "SignUpPage/index.html"))
);
app.use(
  "/logIn",
  express.static(path.resolve(__dirname, "Loginpage/index.html"))
);
app.use("/admin", express.static(path.resolve(__dirname, "Admin/index.html")));
app.use(
  "/user-rooms",
  express.static(path.resolve(__dirname, "user-rooms/index.html"))
);

app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "ErrorPage/error.html"));
});

// parse incoming  payloads
app.use(bodyParser.json());
app.use(express.json());
app.use(cookie());

//  Page Routes
app.use("/", home);
app.use("/signup", signup);
app.use("/login", login);
app.use("/dashboard", dashboard);
app.use("/availableRooms", availableRoom);
app.use("/cancelrooms", cancelRooms);
app.use("/booking", booking);
app.use("/date", dateTime);
app.use("/user-details", userDetails);
app.use("/payment", payment);
app.use("/checkuser", admin);

async function run() {
  const client = DB();
  try {
    const db = client.db("Myusers");
    const col = db.collection("rooms");
    for (let i = 0; i < 20; i++) {
      const no = i >= 9 ? Number(`4${i + 1}`) : Number(`40${i + 1}`);
      const doc = {
        roomNo: no,
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
      };
      const setDoc = await col.insertOne(doc);
      console.log(setDoc);
    }
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}
// run().catch(console.dir);

app.listen(process.env.PORT || 4000);
