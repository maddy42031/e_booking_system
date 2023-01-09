import React, { useState, useEffect } from "react";
import { submit } from "./submit";
import axios from "axios";

function Radios() {
  const [rooms, setRooms] = useState(1);
  const [roomType, setRoomType] = useState("family");
  const [price, setPrice] = useState(120);
  const [NoOfRooms, setNoOfRooms] = useState(0);
  useEffect(() => {
    submit.setRoomType({
      roomType: roomType,
      noOfRooms: rooms,
      price: price,
    });
  }, [rooms, roomType]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const { data } = await axios.get("/availableRooms");
      console.log(data);
      if (data) {
        setNoOfRooms(data);
      } else {
        setNoOfRooms(0);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getRooms = (e) => {
    const type = e.target.value;
    setRoomType(type);
    if (type === "family") {
      setPrice(120);
    } else if (type === "vip") {
      setPrice(190);
    } else {
      setPrice(150);
    }
  };
  const Increment = () => {
    if (rooms >= NoOfRooms) {
      setRooms(NoOfRooms);
    } else {
      setRooms(rooms + 1);
    }
  };
  return (
    <>
      <div className="row row-cols-1 row-cols-md-3 g-3 justify-content-md-between">
        <div className="col-12 col-md-2">
          <div className="h5">Select Rooms</div>
          <select
            id="typeRooms"
            onChange={getRooms}
            className="form-select"
            aria-label="Default select example"
          >
            <option defaultValue="family">Family</option>
            <option value="vip">Vip</option>
            <option value="couples">Couples</option>
          </select>
        </div>
        <div className="col-12 col-md-4">
          <div className="h5">No of rooms</div>
          <button onClick={Increment} className="btn-custom">
            <i className="bi bi-plus-lg"></i>
          </button>
          <span>{rooms}</span>
          <button
            onClick={() => {
              if (rooms <= 1) {
                setRooms(1);
              } else {
                setRooms(rooms - 1);
              }
            }}
            className="btn-custom"
          >
            <i className="bi bi-dash-lg"></i>
          </button>
        </div>
        <div className="col-12 col-md-2">
          <div className="h5">Price</div>
          <div>{price * rooms}</div>
        </div>
      </div>
    </>
  );
}
function Rooms() {
  return (
    <div className="row br p-2 mt-4">
      <div className="col">
        <Radios />
      </div>
    </div>
  );
}

export default Rooms;
