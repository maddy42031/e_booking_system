import React, { useState, useEffect } from "react";
import axios from "axios";
function AvailableRooms() {
  const [rooms, setRooms] = useState("Loading...");
  const getData = async () => {
    try {
      const { data } = await axios.get("/availableRooms");
      if (data) {
        setRooms(data);
      } else {
        setRooms("");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="row br p-2">
      <div className="col-12 col-md-6 h6 ">Total Rooms : 20</div>
      <div className="col-12 col-md-6 h6 ">Available Rooms : {rooms??'---'}</div>
    </div>
  );
}
export default AvailableRooms;
