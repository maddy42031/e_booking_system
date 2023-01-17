import React, { useState, useEffect } from "react";
import axios from "axios";
function Col({ countOfElement, RoomNo }) {
  const [count, setCount] = useState(undefined);
  useEffect(() => {
    setCount(() => {
      const arr = [];
      for (let i = 0; i < countOfElement; i++) {
        const no = i >= 9 ? Number(`4${i + 1}`) : Number(`40${i + 1}`);
        arr.push(no);
      }
      return arr;
    });
  }, []);
  const gettingRoomno = (e) => {
    console.log(e.target.name);
    RoomNo(e.target.name);
  };
  return (
    <>
      {count?.map((val) => {
        return (
          <div
            className="col d-flex justify-content-center flex-column"
            key={val}
          >
            <p className="h6 text-center">{val}</p>
            <button
              className={`door-close btn`}
              id={`door-${val}`}
              onClick={gettingRoomno}
              name={val}
            ></button>
          </div>
        );
      })}
    </>
  );
}
function Rooms() {
  const [visible, hidden] = useState(false);
  const [roomNo, setRoomNo] = useState();
  const giveRoomNo = (no) => {
    setRoomNo(no);
    hidden(true);
  };
  return (
    <>
      {visible ? (
        <FormPSWD
          NO={roomNo}
          BackToRoom={() => {
            hidden(false);
          }}
        />
      ) : null}
      <div className="container">
        <p className="h1 text-center mb-4">User-Rooms</p>
        <div className="row row-cols-4 g-3 mb-5">
          <Col countOfElement={20} RoomNo={giveRoomNo} />
        </div>
      </div>
    </>
  );
}

function FormPSWD({ NO, BackToRoom }) {
  const [ff, setFF] = useState("");
  const inputFF = (e) => {
    setFF("");
    let val = String(e.target.value);
    var newval = "";
    val = val.replace(/\s/g, "");
    for (var i = 0; i < val.length; i++) {
      if (i % 4 == 0 && i > 0) newval = newval.concat(" ");
      newval = newval.concat(val[i]);
    }
    setFF(newval);
  };
  const activeRoom = async (e) => {
    e.preventDefault();
    e.target[1].innerHTML = `Please wait ...`;
    e.target[1].disabled = true;
    e.target[2].disabled = true;
    axios
      .put("/activateRoom", {
        roomNo: Number(e.target[1].name),
        pswd: e.target[0].value.replace(" ", ""),
      })
      .then((data) => {
        const IS_ALL_OK = data.data;
        const err = document.querySelector(".heading");
        console.log(IS_ALL_OK);
        if (IS_ALL_OK.forRoom && IS_ALL_OK.forPswd) {
          document
            .getElementById(`door-${NO}`)
            .classList.replace("door-close", "door-open");
          BackToRoom();
        } else if (!IS_ALL_OK.forRoom) {
          // this is for checking git branch
          err.classList.add("text-danger");
          err.innerHTML = `😶 THIS ROOM IS NOT ACTIVATED`;
          e.target[1].disabled = false;
          e.target[1].innerHTML = `OPEN ROOM`;
          e.target[2].disabled = false;
        } else {
          err.classList.add("text-danger");
          err.innerHTML = `💀 PASSWORD WAS WRONG`;
          e.target[1].disabled = false;
          e.target[1].innerHTML = `OPEN ROOM`;
          e.target[2].disabled = false;
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div id="inputpswd">
        <form onSubmit={activeRoom} className="row justify-content-center">
          <p className="h4 col-8 col-lg-10 heading ">
            Enter {NO} room password
          </p>
          <div className="col-8 col-lg-10">
            <input
              type="text"
              className="form-control"
              id="ff"
              placeholder="0000 0000"
              size={5}
              value={ff}
              onChange={inputFF}
              aria-label="First name"
              maxLength={9}
              required
            />
          </div>
          <div className="col-8 col-lg-10 mt-3 d-flex flex-row">
            <button name={NO} onSubmit={activeRoom} className="btn btn-primary">
              OPEN ROOM
            </button>
            <button
              style={{ marginLeft: ".5rem" }}
              onClick={() => BackToRoom(NO)}
              className="btn btn-danger"
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default Rooms;
