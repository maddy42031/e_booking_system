import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [userDetails, setDetail] = useState();
  const [tableLoader, Loader] = useState(true);
  const clearCookie = (e) => {
    e.target.disabled = true;
    const date = new Date();
    document.cookie = `token =; Path=/; Expires= ${date.toUTCString()}`;
    document.cookie = `userId =; Path=/; Expires= ${date.toUTCString()}`;
    const a = document.createElement("a");
    a.href = "/";
    a.click();
  };
  const deleteAccount = (e) => {
    e.target.disabled = true;
    axios
      .delete("/delete-ac")
      .catch((err) => console.log(err))
      .then((data) => {
        console.log(data.data);
      });
  };
  useEffect(() => {
    axios
      .get("/get-profile")
      .then((userData) => {
        setDetail(userData.data);
        Loader(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-10 col-md-8">
          <p className="h2 fw-bolder">Profile</p>
          <table className="table table-bordered" id="table-relavtive">
            {tableLoader ? (
              <div id="table-loader">
                <div className="waiting"></div>
              </div>
            ) : null}
            <tbody>
              <tr>
                <td>E-mail</td>
                <td>{userDetails?.email}</td>
              </tr>
              <tr>
                <td>Ph-Number</td>
                <td>{userDetails?.phoneNumber}</td>
              </tr>
              <tr>
                <td>User-Name</td>
                <td>@{userDetails?.userName}</td>
              </tr>
              <tr>
                <td>User-Id</td>
                <td>{userDetails?.userID}</td>
              </tr>
              <tr className="table-borderless">
                <td>
                  <button onClick={clearCookie} className="btn btn-primary">
                    Log out
                  </button>
                </td>
                <td>
                  <button onClick={deleteAccount} className="btn btn-danger">
                    DELETE ACCOUNT
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Profile;
