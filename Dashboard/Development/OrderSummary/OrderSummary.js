import React, { useState, useEffect } from "react";
import axios from "axios";
function OrderSummary({ roomDetail, homeDiv }) {
  const [sucessMessage, SetMessage] = useState(false);
  const backHome = () => {
    homeDiv();
  };
  const payment = (e) => {
    e.target.disabled = true;
    axios
      .put("/payment", { paymentDetails: roomDetail })
      .then((getPassword) => {
        SetMessage(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container br mt-5 mb-4">
      <div className="h1 text-center mb-3">Booking summary</div>
      {sucessMessage ? (
        <div className="alert alert-success" role="alert">
          Your room have been booked successfully 😍
        </div>
      ) : (
        <UserCheckingRooms
          roomDetail={roomDetail}
          payment={payment}
          backHome={backHome}
        />
      )}
    </div>
  );
}

function UserCheckingRooms({ backHome, roomDetail, payment }) {
  return (
    <div className="row  g-3 justify-content-around mt-5 mb-5">
      <div className="col-12 table-responsive">
        <Table roomDetail={roomDetail} />
      </div>
      <div className="col d-flex justify-content-end flex-row">
        <div style={{ marginLeft: "1rem" }}>
          <button onClick={backHome} className="btn btn-light">
            Back
          </button>
        </div>
        <div style={{ marginLeft: "1rem" }}>
          <button onClick={payment} className="btn btn-primary">
            Book
          </button>
        </div>
      </div>
    </div>
  );
}

export function Table({ roomDetail }) {
  const roomDetails = [...roomDetail];
  const price = roomDetails?.flatMap((a) => a.price).reduce((a, b) => a + b);
  const cancelRoom = (e, room) => {
    e.target.disabled = true;
    e.target.innerText = "PLEASE WAIT ✋";
    e.target.classList.replace("btn-danger", "btn-info");
    axios
      .put("/cancelrooms", { roomNo: [room.roomNo] })
      .then((val) => {
        roomDetails.splice(room, 1);
        console.log(roomDetails, roomDetail);
        document.getElementById("price").innerText = `${
          roomDetails.length == 0
            ? "0"
            : roomDetails?.flatMap((a) => a.price).reduce((a, b) => a + b)
        } Rs`;
        e.target.innerText = "ROOM CANCELED 👍";
        e.target.classList.replace("btn-info", "btn-success");
      })
      .catch((err) => {
        e.target.innerText = "CANCEL ROOM";
        e.target.disabled = false;
      });
  };
  return (
    <>
      <table className="table-bordered table ">
        <thead className="table-dark">
          <tr>
            <th scope="col">NO</th>
            {Object.keys(roomDetail[0])?.map((data, i) => (
              <th scope="col" key={i}>
                {data.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="headTable">
          {roomDetail?.map((val, index) => {
            return (
              <tr className={`cancelRow${index}`} key={index}>
                <th scope="row">{index + 1}</th>
                {Object.values(val).map((values, iVal) => {
                  if (values == 'btn' ) {
                    return (
                      <td key={iVal} className="d-flex justify-content-center">
                        <button
                          onClick={(e) =>
                            cancelRoom(e, roomDetail[index], index)
                          }
                          className="btn btn-danger"
                        >
                          CANCEL ROOM 😔
                        </button>
                      </td>
                    );
                  }
                  if (values.pswd) {
                    const FFour = String(values.pswd).slice(0, 4);
                    const LFour = String(values.pswd).slice(4, 8);
                    return <td key={iVal}>{`${FFour}-${LFour}`}</td>;
                  }
                  if (values == "YES") {
                    return (
                      <td key={iVal} className="text-success fw-bold">
                        <button
                          onClick={(e) =>
                            cancelRoom(e, roomDetail[index], index)
                          }
                          className="btn btn-info"
                        >
                          ACTIVATE ROOM 
                        </button>
                      </td>
                    );
                  }
                  return <td key={iVal}>{String(values).toUpperCase()}</td>;
                })}
              </tr>
            );
          })}
          <tr>
            <td colSpan={Object.keys(roomDetail[0]).length}>TOTAL</td>
            <td id="price">{price} Rs</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
export default OrderSummary;
