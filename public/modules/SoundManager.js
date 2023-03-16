import WaveTables from "../waveTables.js"


let freqs = []
freqs[0] = 55.000000000000000;
freqs[1] = 65.406391325149658;
freqs[2] = 73.416191979351890;
freqs[3] = 82.406889228217482;
freqs[4] = 97.998858995437323;
freqs[5] = 110.000000000000000;
freqs[6] = 130.812782650299317;
freqs[7] = 146.832383958703780;
freqs[8] = 164.813778456434964;
freqs[9] = 195.997717990874647;
freqs[10] = 220.000000000000000;
freqs[11] = 261.625565300598634;
freqs[12] = 293.664767917407560;
freqs[13] = 329.627556912869929;
freqs[14] = 391.995435981749294;
freqs[15] = 440.000000000000000;
freqs[16] = 523.251130601197269;
freqs[17] = 587.329535834815120;
freqs[18] = 659.255113825739859;
freqs[19] = 783.990871963498588;
freqs[20] = 880;
export class AudioContextManger {

    init() {
      let AudioContext = window.AudioContext || window.webkitAudioContext
      if (AudioContext) {
        return new AudioContext
      }
      else {
        alert('Sorry, this app is not supported on your device')
        return false
      }
    }
  }

export class SoundManager {

    constructor() {
    const audioContextManager = new AudioContextManger()
      this.audioContext = audioContextManager.init()
      this.waveForms = this.createWaveForms()
  
    }
  
    createWaveForms = () => {
      let waveforms = {}
      for (let instrument in WaveTables) {
        console.log(instrument)
        waveforms[instrument] = this.initWave(WaveTables[instrument])
      }
      console.log(waveforms)
      return waveforms
    }
  
    initWave(wavetable) {
      return this.audioContext.createPeriodicWave(
        (new Float32Array(wavetable["real"])),
        (new Float32Array(wavetable["imag"]))
      );
    }
  
    adjustVolume(volume) {
      this.gainNode.gain.setTargetAtTime(volume, this.audioCtx.currentTime, 0.1)
    }
  
    playSound = (instrument, freqIndex, volume = 0.5, duration = 0.1) => {
      const audioCtx = this.audioContext
      // gain node
      const gainNode = audioCtx.createGain();
      gainNode.gain.value = volume;
      gainNode.connect(audioCtx.destination);
  
      // connect oscillator
      let osc = audioCtx.createOscillator();
      osc.setPeriodicWave(this.waveForms[instrument]);
      osc.frequency.value = freqs[freqIndex]
      osc.connect(gainNode);
      osc.start(audioCtx.currentTime)
  
      // stop the sound
      gainNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0.2);
      osc.stop(audioCtx.currentTime + 0.2)
      return osc
    }
  }
  