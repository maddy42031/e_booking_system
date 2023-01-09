import React from "react";

function Profile() {
  const clearCookie = () => {
    const date = new Date();
    document.cookie = `token =; Path=/; Expires= ${date.toUTCString()}`;
    document.cookie = `userId =; Path=/; Expires= ${date.toUTCString()}`;
    const a = document.createElement("a");
    a.href = "/";
    a.click();
  };
  return (
    <button onClick={clearCookie} className="btn btn-primary">
      Log out
    </button>
  );
}
export default Profile;
