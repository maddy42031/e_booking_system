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
const activateRoom = require("./routes/activateRoom");
const ActiveRoom = require('./routes/ActiveRoom');
const DisActiveRoom = require('./routes/DisActiveRoom');
const { MongoClient } = require("mongodb");
const DB = require("./routes/mongodb");

// coming traditional HTML form submits
app.use(express.urlencoded({ extended: true }));

// Serving Static JavaScript files
app.use(
  "/dashboard.js",
  express.static(path.resolve(__dirname, "Dashboard/Production/dashboard.js"))
);
app.use(
  "/user-rooms.js",
  express.static(path.resolve(__dirname, "user-rooms/production/user-rooms.js"))
);
// Serving css files
app.use("/public", express.static(path.resolve(__dirname, "Public")));
// Serving image files
app.use("/images", express.static(path.resolve(__dirname, "images")));

// Setting view engine EJS
app.engine(".html", require("ejs").__express);
app.set("view engine", "html");
app.set("views", path.join(__dirname, "ErrorPage"));

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
app.use("/activate-rooms", admin);
app.use("/user-rooms", function (req, res) {
  res.sendFile(path.resolve(__dirname, "user-rooms/production/index.html"));
});
app.use("/", activateRoom);
app.use("/active",ActiveRoom);
app.use("/disactive",DisActiveRoom)
// Error page
app.use((req, res, next) => {
  res.status(404).render("error", {
    title: "Not Found",
    heading: "ERROR 404 FOUND !",
    content: "No page at this url.",
    backTo: "/",
    backToContent: "Back To HomePage",
  });
});
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
        activateRoom: false,
        pswdActive:false,
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
