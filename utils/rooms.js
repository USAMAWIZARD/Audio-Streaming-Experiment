rooms = {};
function createroom(roomid) {
  if (!(roomid in rooms)) {
    rooms[roomid] = [];
    return true;
  } else if (roomid in rooms && rooms[roomid].length < 2) {
    return "kindacreated";
  } else {
    return false;
  }
}
function AddUserSdp(room, sdp) {
  if (rooms[room].length == 0) {
    rooms[room].push(sdp);
  } else {
    delete rooms[room];
    return sdp;
  }
}
function FindOffer(room) {
  return rooms[room][0];
}
exports.createroom = createroom;
exports.AddUserSdp = AddUserSdp;
exports.FindOffer = FindOffer;
