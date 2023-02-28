import React, { useState, useEffect } from "react";
import { submit } from "./submit";

function Option1({ dates }) {
  return dates?.map((val, index) => {
    return (
      <option key={index} value={val}>
        {val}
      </option>
    );
  });
}
function Option2({ dates }) {
  return dates?.map((val, index) => {
    if (index == dates.length - 1) {
      return;
    }
    return (
      <option key={index} value={val}>
        {val}
      </option>
    );
  });
}
function DateAndTime() {
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [DateArr, setDateArr] = useState();
  const Month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  useEffect(() => {
    DatesTimes();
  }, []);
  useEffect(() => {
    submit.setDate({
      checkin: checkin,
      checkout: checkout,
    });
  }, [checkin, checkout]);

  const DatesTimes = async () => {
    const currentDate = new Date();
    const nextOneMonth = new Date();
    nextOneMonth.setFullYear(
      nextOneMonth.getFullYear(),
      nextOneMonth.getMonth() + 1
    );
    setCheckin(
      `${
        Month[currentDate.getMonth()]
      }-${currentDate.getDate()}-${currentDate.getFullYear()}`
    );
    setCheckout(
      `${
        Month[nextOneMonth.getMonth()]
      }-${nextOneMonth.getDate()}-${nextOneMonth.getFullYear()}`
    );
    const monthInDays = (year, month) => {
      const dates = new Date(year, month, 0);
      return dates.getDate() - currentDate.getDate();
    };
    const monthInNextOneMonth = (year, month, reduceDays) => {
      const dates = new Date(year, month, 0);
      const b = Math.abs(dates.getDate() - reduceDays);
      return b == 0 ? 1 : b;
    };
    const Daysinmonth = monthInDays(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1
    );
    const DaysInNextOneMonth = monthInNextOneMonth(
      nextOneMonth.getFullYear(),
      nextOneMonth.getMonth() + 1,
      Daysinmonth
    );
    let currentDateArr = currentDate.getDate();
    let dateArr = [];
    for (let i = 1; i <= Daysinmonth; i++) {
      currentDateArr += 1;
      dateArr.push(
        `${
          Month[currentDate.getMonth()]
        }-${currentDateArr}-${currentDate.getFullYear()}`
      );
    }
    let nextDateArr = 0;
    for (let i = 1; i <= DaysInNextOneMonth; i++) {
      nextDateArr += 1;
      dateArr.push(
        `${
          Month[nextOneMonth.getMonth()]
        }-${nextDateArr}-${nextOneMonth.getFullYear()}`
      );
    }
    setDateArr(dateArr);
  };
  return (
    <div className="row p-2 br mt-4">
      <div className="col mb-2">
        <label htmlFor="checkin" className="form-label">
          <p className="h6">Check In</p>
          <p>{checkin}</p>
        </label>
        <select
          className="form-select"
          id="checkin"
          aria-label="Default select example"
          onChange={(e) => {
            setCheckin(e.target.value);
          }}
        >
          <option key={checkin} defaultValue={checkin}>
            {checkin}
          </option>
          <Option1 dates={DateArr} />
        </select>
      </div>
      <div className="col mb-2">
        <label htmlFor="checkout" className="form-label">
          <p className="h6">Check Out</p>
          <p>{checkout}</p>
        </label>
        <select
          className="form-select"
          id="checkout"
          onChange={(e) => {
            setCheckout(e.target.value);
          }}
          aria-label="Default select example"
        >
          <option key={checkout} defaultValue={checkout}>
            {checkout}
          </option>
          <Option2 dates={DateArr} />
        </select>
      </div>
    </div>
  );
}
export default DateAndTime;
