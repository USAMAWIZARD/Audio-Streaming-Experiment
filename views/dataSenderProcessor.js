//this is a new  thread for processing auido data

class DataSenderProcesor extends AudioWorkletProcessor {
  constructor(){
    super()
  }
  process (inputs, outputs, parameters) { // process function will be called automatically when  audio data is available to be processed 
     var buff=inputs[0]
     var input = inputs[0];            //input[0] is microphone audio data
     const output = outputs[0]        

    //  console.log(buff)
      this.port.postMessage(
        buff                            //sending audio data to main thread 
    )

      for (let channel = 0; channel < input.length; ++channel) {
        output[channel].set(input[channel]);
    }
    
      return true
    }
  }
  
registerProcessor('data-sender-processor', DataSenderProcesor)