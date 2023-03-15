export class AudioContextManger {

    init() {
      let AudioContext = window.AudioContext || window.webkitAudioContext
      if (AudioContext) {
        return new AudioContext
      }
      else {
        return false
      }
    }
  }

export class SoundManager {

    constructor(audioContext) {
      this.audioContext = this.audioContext
      this.waveForms = this.createWaveForms()
  
    }
  
    createWaveForms() {
      let waveforms = {}
      for (let instrument in WaveTables) {
        waveforms[instrument] = initWave(WaveTables[instrument])
      }
      return waveforms
    }
  
    initWave(wavetable) {
      return this.audioContext.createPeriodicWave(
        (new Float32Array(organWaveTable["real"])),
        (new Float32Array(organWaveTable["imag"]))
      );
    }
  
    adjustVolume(volume) {
      this.gainNode.gain.setTargetAtTime(volume, audioCtx.currentTime, 0.1)
    }
  
    playSound(instrument, freqIndex, volume = 0.5, duration = 0.1) {
      // gain node
      const gainNode = audioCtx.createGain();
      gainNode.gain.value = volume;
      gainNode.connect(audioCtx.destination);
  
      // connect oscillator
      let osc = audioCtx.createOscillator();
      osc.setPeriodicWave(waveforms[instrument]);
      osc.frequency.value = freqs[freqIndex]
      osc.connect(player.gainNode);
      osc.start(audioCtx.currentTime)
  
      // stop the sound
      gainNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0.1);
      player.osc.stop(audioCtx.currentTime + 0.2)
  
    }
  }
  