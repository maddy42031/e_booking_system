import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderSummary, { Table } from "../OrderSummary/OrderSummary";
function parseBookingDetails(BookingData) {
  const Bookedfilter = BookingData.filter((data) => data.isBooked === true).map(
    (data) => {
      return {
        roomNo: data.roomNo,
        checkin: data.checkin,
        checkout: data.checkout,
        roomType: data.roomType,
        active_rooms:
          data.isActive || data.pswdActive
            ? {
                name: data.isActive ? "ACTIVE" : "DISACTIVE",
                isOpen: "YES",
              }
            : "NO",
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
  const [noRooms, setNoRooms] = useState({
    bool:false,
    message:"",
  });
  const [orderSummary, setOrderSummary] = useState(false);
  const [changer, setChanger] = useState(true);
  useEffect(() => {
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
        setNoRooms({
          bool:true,
          message:"No rooms booked yet !"
        });
        setLoader(false);
      }
    }).catch(()=>{
      setLoader(false);
      setNoRooms({
        bool:true,
        message:"Something went wrong please refresh the page !"
      });
    })

    console.log("refreshing");
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
    <div className="container-fluid mt-4">
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
        <div className="row mb-4 g-3 justify-content-around p-2">
          <div className="col-10 table-responsive col-md-12">
          <p className="alert alert-warning h1">
            Your Booking rooms is pending.
          </p>
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
        <div className="row p-1">
          <div className="col table-responsive">
            <p className="alert alert-success h1">Booked rooms.</p>
            <div className="col-12  mb-3 d-flex justify-content-end">
              <button
                onClick={(e) => {
                  e.target.innerText = "REFRESHING....";
                  e.target.disabled = true;
                  setChanger(!changer);
                  setTimeout(() => {
                    e.target.innerText = "REFRESH";
                    e.target.disabled = false;
                  }, 2000);
                }}
                className="btn btn-success refresfBTN"
              >
                REFRESH
              </button>
            </div>
            <Table roomDetail={bookedRoom ? bookedRoom : []} />
          </div>
        </div>
      ) : null}
      {noRooms.bool ? (
        <div className="row">
          <p className="h1 text-center">{noRooms.message}</p>
        </div>
      ) : null}
    </div>
  );
}

export default Booking;
