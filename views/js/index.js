var socket = io();
prevent = true;
function joinroom() {
  roomid = document.getElementById("room").value;
  socket.emit("roomid", roomid);
}
socket.on("roomCreated", (data) => {
  if (data == true) {
    prevent = false;
    document.getElementById("isinitiator").value = true;
    document.getElementById("submit").click();
  } else if (data === "notinitiator") {
    prevent = false;
    document.getElementById("isinitiator").value = false;
    document.getElementById("submit").click();
  }
});
form = document.getElementById("room-form");
if (form !== null) {
  form.addEventListener("submit", (e) => {
    if (prevent === true) {
      joinroom();
      e.preventDefault();
    }
  });
}
