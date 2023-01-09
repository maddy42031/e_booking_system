import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderSummary, { Table } from "../OrderSummary/OrderSummary";
function parseBookingDetails(BookingData) {
  console.log(BookingData);
  const Bookedfilter = BookingData.filter((data) => data.isBooked === true).map(
    (data) => {
      return {
        roomNo: data.roomNo,
        checkin: data.checkin,
        checkout: data.checkout,
        roomType: data.roomType,
        room_isActive: data.isActive ? "YES" : "NO",
        cancel_Rooms: "btn", // this attribute for only to use table heading purpose.
        password: { pswd: data.password },
        price: data.price,
      };
    }
  );
  const Pendingfilter = BookingData.filter(
    (data) => data.isPending === true
  ).map((data) => {
    return {
      roomNo: data.roomNo,
      checkin: data.checkin,
      checkout: data.checkout,
      roomType: data.roomType,
      price: data.price,
      cancel_Rooms: "btn",
    };
  });
  let isBookedRoom = Bookedfilter;
  let isPendingRoom = Pendingfilter;
  if (Bookedfilter.length === 0) {
    isBookedRoom = false;
  }
  if (Pendingfilter.length === 0) {
    isPendingRoom = false;
  }
  return [isBookedRoom, isPendingRoom];
}

function Booking() {
  const [pendingRoomDetails, setPending] = useState(false);
  const [bookedRoom, setBookedRoom] = useState(false);
  const [loader, setLoader] = useState(true);
  const [pendingRooms, setPendingRooms] = useState();
  const [noRooms, setNoRooms] = useState(false);
  const [orderSummary, setOrderSummary] = useState(false);
  const [changer, setChanger] = useState(true);
  useEffect(() => {
    try {
      axios.get("/booking").then((value) => {
        if (value.data) {
          setLoader(false);
          const [isBookedRoom, isPendingRoom] = parseBookingDetails(value.data);
          if (isPendingRoom) {
            setPendingRooms(isPendingRoom);
            setPending(isPendingRoom);
          }
          if (isBookedRoom) {
            setBookedRoom(isBookedRoom);
          }
        } else {
          setNoRooms(true);
          setLoader(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [changer]);

  const cancelOnSummary = () => {
    console.log("Pending Div Coming");
    setChanger(!changer);
    setLoader(true);
    setOrderSummary(false);
  };
  const cancelRooms = async (e) => {
    e.target.disabled = true;
    const roomsNo = pendingRoomDetails.map((val) => val.roomNo);
    const { data } = await axios.put("/cancelrooms", { roomNo: roomsNo });
    if (data) {
      e.target.disabled = false;
      setChanger(!changer);
      setPending(false);
    }
    console.log(data);
  };

  return (
    <div className="container mt-4">
      {loader ? (
        <div className="text-center mt-5">
          <div
            style={{ width: "5rem", height: "5rem" }}
            className=" spinner-border text-primary"
            role="status"
          ></div>
        </div>
      ) : null}
      {pendingRoomDetails ? (
        <div className="row mb-4 g-3 justify-content-around">
          <p className="alert alert-warning h1">
            Your Booking rooms is pending.
          </p>
          <div className="col-10 table-responsive col-md-12">
            <Table roomDetail={pendingRoomDetails ? pendingRoomDetails : []} />
          </div>
          <div>
            <div className="d-flex justify-content-end ">
              <div className="p-2">
                <button onClick={cancelRooms} className="btn btn-danger">
                  Cancel rooms
                </button>
              </div>
              <div className="p-2">
                <button
                  onClick={() => {
                    setOrderSummary(true);
                    setPending(false);
                  }}
                  className="btn btn-primary"
                >
                  Continue booking
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {orderSummary ? (
        <OrderSummary roomDetail={pendingRooms} homeDiv={cancelOnSummary} />
      ) : null}
      {bookedRoom ? (
        <div className="row">
          <div className="col table-responsive">
            <p className="alert alert-success h1">Booked rooms.</p>
            <Table roomDetail={bookedRoom ? bookedRoom : []} />
          </div>
        </div>
      ) : null}
      {noRooms ? (
        <div className="row">
          <p className="h1 text-center">You are not booking any rooms !</p>
        </div>
      ) : null}
    </div>
  );
}

export default Booking;
