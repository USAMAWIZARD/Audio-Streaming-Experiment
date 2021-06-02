var socket = io();
const { room, isinitiator } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});
var peer = new SimplePeer({
  initiator: eval(isinitiator),
  trickle: false,
});
peer.on("signal", (data) => {
  data = JSON.stringify(data);
  socket.emit("id", { room, data });
});
if (eval(isinitiator) === false) {
  socket.emit("GiveMeOffer", room);
}
socket.on("TakeOffer", (offer) => {
  peer.signal(offer);
});
if (isinitiator) {
  socket.on("Answer", (Answer) => {
    peer.signal(Answer);
  });
}
peer.on("data", (data) => {
  console.log(data.toString());
});
socket.emit("user");

async function create() {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      autoGainControl: false,
      echoCancellation: false, //geting microphne permision and stream
      latency: 0,
      noiseSuppression: false,
      video: false,
    },
  });

  audioContext = new AudioContext(
    (audioContextOptions = { latencyHint: 0, sampleRate: 48000 })
  );
  audioSource = audioContext.createMediaStreamSource(stream); //
  await audioContext.audioWorklet.addModule("dataSenderProcessor.js"); //registering a new js file a a thread to work with audio data
  localProcessingNode = new DataSenderNode(audioContext);
  audioSource.connect(localProcessingNode); //registring microphone stream with thread

  localProcessingNode.port.onmessage = (e) => {
    //event to recive the data from thread
    console.log(e.data); //reciving audio data from audio procesing thread
    peer.send(e.data);
  };
}
class DataSenderNode extends AudioWorkletNode {
  constructor(context) {
    super(context, "data-sender-processor");
  }
}
