import WaveTables from "../waveTables.js"


let freqs = [
 55.000000000000000,
 65.406391325149658,
 73.416191979351890,
 82.406889228217482,
 97.998858995437323,
 110.000000000000000,
 130.812782650299317,
 146.832383958703780,
 164.813778456434964,
 195.997717990874647,
 220.000000000000000,
261.625565300598634,
293.664767917407560,
329.627556912869929,
391.995435981749294,
440.000000000000000,
523.251130601197269,
587.329535834815120,
659.255113825739859,
783.990871963498588,
880]
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
  
    playSound = (instrument, freqIndex, volume = 0.5, duration = 0.2) => {
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
      gainNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0.3);
      osc.stop(audioCtx.currentTime + 0.3)
      return osc
    }
  }
  