
class DataReceiverProcessor extends AudioWorkletProcessor {
    constructor(){
        super()
        }
        process (inputs, outputs, parameters) {
        //  var buff=inputs[0]
           var input = inputs[0];
           var output = outputs[0]
   /*  s
            if (this.recordingBufferOffset < this.recordingBuffer.length - input[0].length) {
              this.recordingBuffer.set(input[0], this.recordingBufferOffset);
              this.recordingBufferOffset += input[0].length;
          }
            */
          this.port.onmessage=(event)=>{
            var buff
            buff=event.data
     console.log(buff)

  /*   outputs.forEach((output)=>{
            for (let channel = 0; channel < buff.length; ++channel) {
                output[channel].set(buff[channel]);

            }
            })*/
        }
          
            return true
      
          }
}

registerProcessor('data-receiver-processor', DataReceiverProcessor);