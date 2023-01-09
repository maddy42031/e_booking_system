import React, { useState } from "react";
import DateAndTime from "./components/dateTime";
import AvailableRooms from "./components/AvailableRooms";
import Rooms from "./components/RoomType";
import Facility from "./components/Facility";
import SubmitBtn from "./components/submit";
import OrderSummary from "./OrderSummary/OrderSummary";
import "./index.css";
function HomeDiv() {
  const [orderDiv, setOrderDiv] = useState(true);
  const [roomDetail, setRoomDetail] = useState(null);
  const orderSummary = (data) => {
    const orderData = data.map((data) => {
      return {
        roomNo: data.roomNo,
        checkin: data.checkin,
        checkout: data.checkout,
        roomType: data.roomType,
        price: data.price,
        cancel_rooms: "btn",
      };
    });
    setRoomDetail(orderData);
    setOrderDiv(false);
  };
  const homeDiv = () => {
    setOrderDiv(true);
  };

  return (
    <>
      {orderDiv ? (
        <>
          <ImageCarousel />
          <div className="container p-4 mb-5">
            <AvailableRooms />
            <Facility />
            <p className=" h1 text-primary  mt-3">Want room!</p>
            <DateAndTime />
            <Rooms />
            <SubmitBtn orderSummary={orderSummary} />
          </div>
        </>
      ) : (
        <OrderSummary roomDetail={roomDetail} homeDiv={homeDiv} />
      )}
    </>
  );
}

export default HomeDiv;

function ImageCarousel() {
  return (
    <div className="container mt-1">
      <div
        id="carouselExampleControls"
        className="carousel slide"
        style={{ aspectRatio: "16/9" }}
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="/images/bedroom.jpeg"
              className="d-block w-100"
              alt="bedroom"
            />
          </div>
          <div className="carousel-item ">
            <img src="/images/hall.jpeg" className="d-block w-100" alt="hall" />
          </div>
          <div className="carousel-item ">
            <img
              src="/images/kitchen.jpeg"
              className="d-block w-100"
              alt="kitchen"
            />
          </div>
          <div className="carousel-item ">
            <img
              src="/images/bathroom.jpeg"
              className="d-block w-100"
              alt="bathroom"
            />
          </div>
          <div className="carousel-item ">
            <img src="/images/hall.jpeg" className="d-block w-100" alt="hall" />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon p-3"
            style={{ backgroundColor: "black", borderRadius: "4px" }}
            aria-hidden="true"
          ></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon p-3"
            style={{ backgroundColor: "black", borderRadius: "4px" }}
            aria-hidden="true"
          ></span>
        </button>
      </div>
    </div>
  );
}
