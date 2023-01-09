import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import HomeDiv from "./Home";
import Profile from "./Profile";
import "./index.css";
import Booking from "./Booking/Booking";

function Wrapper() {
  const [home, setHome] = useState(true);
  const [profile, setProfile] = useState(false);
  const [booking, setBooking] = useState(false);
  return (
    <>
      <nav className="navbar bg-primary navbar-expand-md navbar-light ">
        <div className="container-fluid">
          <p className="navbar-brand h1" id="text">
            HO-YO
          </p>
          <div className="nav  justify-content-end">
            <li className="nav-item">
              <button
                onClick={() => {
                  setHome(true);
                  setProfile(false);
                  setBooking(false);
                }}
                className={`nav-link ${home ? "activate" : "disable"}`}
                type="button"
              >
                Home
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={() => {
                  setBooking(true);
                  setProfile(false);
                  setHome(false);
                }}
                className={`nav-link ${booking ? "activate" : "disable"}`}
                type="button"
              >
                Booking
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={() => {
                  setProfile(true);
                  setHome(false);
                  setBooking(false);
                }}
                className={`nav-link ${profile ? "activate" : "disable"}`}
                type="button"
              >
                Profile
              </button>
            </li>
          </div>
        </div>
      </nav>
      {home ? <HomeDiv /> : null}
      {profile ? <Profile /> : null}
      {booking ? <Booking /> : null}
    </>
  );
}

function App() {
  return (
    <>
      <Wrapper />
    </>
  );
}
const root = createRoot(document.getElementById("root"));
root.render(<App />);
