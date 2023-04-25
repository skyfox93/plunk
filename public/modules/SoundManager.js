import WaveTables from "../waveTables.js"
import { freqs } from '../freqs.js'

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
      const instrumentSwitcher = document.querySelector('.settingsPanel')
      for (let instrument in WaveTables) {
        let instrumentDiv = document.createElement("div")
        instrumentDiv.innerText = instrument
        instrumentDiv.className='instrument-choice'
        instrumentDiv.dataset.instrument = instrument
        instrumentSwitcher.appendChild(instrumentDiv)
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
      osc.stop(audioCtx.currentTime + 0.4)
      return osc
    }
  }
  