const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const { createroom, AddUserSdp, FindOffer } = require("./utils/rooms");

const app = express();
const HttpServer = http.createServer(app);
const io = socketio(HttpServer);

const PORT = 3000 || process.env.PORT;

const url = require("url");

app.use(express.static("views"));
app.get("/", (req, res) => {
  res.render("index.html");
});
io.on("connect", (socket) => {
  socket.on("roomid", (roomid) => {
    isroom = createroom(roomid);
    socket.join(roomid);
    notinitiator = "notinitiator";
    if (isroom === true) {
      socket.emit("roomCreated", true);
    } else if (isroom === false) {
      socket.emit("roomCreated", false);
    } else if (isroom === "kindacreated") {
      socket.emit("roomCreated", notinitiator);
    }
  });
  socket.on("id", ({ room, data }) => {
    socket.join(room);
    Answer = AddUserSdp(room, data);

    if (Answer) {
      socket.broadcast.to(room).emit("Answer", Answer);
    }
  });
  socket.on("GiveMeOffer", (room) => {
    offer = FindOffer(room);
    socket.emit("TakeOffer", offer);
  });
});

HttpServer.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
