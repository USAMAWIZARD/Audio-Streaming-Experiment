class DataSenderProcesor extends AudioWorkletProcessor {
  constructor(){
    super()
  this.recordingBuffer = new Float32Array(8000  * 20);  // store max 20 sec audio
  this.recordingBufferOffset = 0; 
  }
  process (inputs, outputs, parameters) {
     var buff=inputs[0]
     var input = inputs[0];
     const output = outputs[0]

      console.log(buff)


      for (let channel = 0; channel < input.length; ++channel) {
        output[channel].set(input[channel]);
    }
    
      return true
    }
  }
  
registerProcessor('data-sender-processor', DataSenderProcesor)