import axios from "axios";
import React, { useState } from "react";
class Submit {
  constructor() {
    this.date = [1];
    this.roomType = [1];
  }
  setDate(data) {
    this.date.pop();
    this.date.push(data);
  }
  setRoomType(data) {
    this.roomType.pop();
    this.roomType.push(data);
  }
  getData() {
    const data = Object.assign(this.date[0], this.roomType[0]);
    console.log(data);
    return data;
  }
}
export const submit = new Submit();
function SubmitBtn({ orderSummary }) {
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const roomDetail = async (e) => {
    e.target.disabled = true;
    setLoader(true);
    try {
      const { data } = await axios.put("/date", submit.getData());
      if (data.isBooked) {
        e.target.disabled = false;
        setErr(true);
        setMessage(data.message);
        setLoader(false);
        orderSummary(data.roomDetail);
      } else {
        e.target.disabled = false;
        setErr(true);
        setMessage(data.message);
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="row mt-3">
      <div className="col">
        {err ? (
          <div
            className={`alert ${err ? "alert-danger" : "alert-success"}`}
            role="alert"
          >
            {message}
          </div>
        ) : null}
        <button className="btn btn-primary" onClick={roomDetail}>
          {loader ? (
            <div className="spinner-border text-light" role="status"></div>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </div>
  );
}
export default SubmitBtn;
