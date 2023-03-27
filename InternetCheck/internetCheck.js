window.addEventListener("online", () => {
  console.log("online");
  checkInternet();
});
window.addEventListener("offline", () => {
  console.log("offline");
  checkInternet();
});
const element_div = document.createElement("div");
element_div.className =
  "container-fluid h3 p-3 online-status-component  text-center alert-danger";
element_div.innerText = "NO INTERNET CONNECTION !";
element_div.style.cssText = "position:fixed;bottom:0px;margin-bottom:0px;";
function checkInternet() {
  if (navigator.onLine) {
    document.querySelector(".online-status-component").remove();
  } else {
    document.querySelector("body").appendChild(element_div);
  }
}
checkInternet();