var remoteProcessingNode;
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
  console.log("ues");
  socket.emit("id", { room, data });
  if (eval(isinitiator) === false) {
    socket.close();
  }
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
    socket.close();
  });
}

socket.emit("user");

peer.on("data", (data) => {
  //yaha pe data revive ho raha hai play karne ka try kar
  console.log(data);
  //this.remoteProcessingNode.port.postMessage(data)
});

async function create(a) {
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

  await audioContext.audioWorklet.addModule("dataReceiverProcessor.js");

  this.remoteProcessingNode = new DataReceiverNode(audioContext);

  audioSource.connect(this.remoteProcessingNode); //registring microphone stream with thread
  if (a.id == "recive") {
    return;
  }
  await audioContext.audioWorklet.addModule("dataSenderProcessor.js"); //registering a new js file a a thread to work with audio data
  localProcessingNode = new DataSenderNode(audioContext);
  audioSource.connect(localProcessingNode); //registring microphone stream with thread

  localProcessingNode.port.onmessage = (e) => {
    //event to recive the data from thread
    //reciving audio data from audio procesing thread
    peer.send(e.data);
  };
}

class DataSenderNode extends AudioWorkletNode {
  constructor(context) {
    super(context, "data-sender-processor");
  }
}
class DataReceiverNode extends AudioWorkletNode {
  constructor(context) {
    super(context, "data-receiver-processor");
  }
}
