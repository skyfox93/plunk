import { freqsLength } from "../freqs.js"
import WaveTables from "../waveTables.js"
import Player from "./Player.js"

export default class PlayersManager {

  constructor(soundManager) {
    this.soundManager = soundManager
    this.user = new Player(Math.random(), soundManager, 'organ', "You")
    this.cpu = new Player(Math.random(), soundManager, 'chorus', "CPU")
    this.cpu.pressed = true
    this.players = [this.user, this.cpu]
    this.available_instruments = Object.keys(WaveTables)
    this.lastSent = null // when we last sent data to the server
    this.socket = io();
    this.socket.on('drawing', this.recievePlayerUpdate);
  }

    toggleCpu = (e) => {
      let cpuIndex = this.players.indexOf(this.cpu)
      if (cpuIndex >= 0){
        // remove cpu from players
         this.players.splice(cpuIndex, 1)
      } else {
        // add cpu to players
        this.players.push(cpu)
      }
   }

  updateUser = (x, y, isPressed = null, shouldPlay = null) => {
    let user = this.user
    // isPressed is null for mousemove, true for mouse down, false for mouseup
    user.curX = x
    user.curY = y
    if (isPressed !== null) {
      user.pressed = isPressed
    }
    if (shouldPlay !== null) {
      
      user.shouldPlay = shouldPlay
    }

    if (performance.now() - this.lastSent > 50) {
      this.sendPlayerUpdate()
    }
  }

  updateCpu(){
    let cpuY = this.cpu.curY += (Math.random() /5 - 0.1)
        cpuY = Math.min(1, cpuY)
        cpuY = Math.max(0, cpuY)
        this.cpu.curY = cpuY
  }

  updateNotes(frame, canvasWidth, canvasHeight) {
    this.players.forEach((player) => {
      if (player.shouldPlay) {
        console.log('tap')
      }
      const willPlay = frame == 0 && (player.shouldPlay || player.pressed)
      /* animation rate is 4 times the rate of musical notes
          so notes only play on frame 0 out of 4
          this is better than separate loops because separate loops may not start at exactly the same time
        */
      if (willPlay) {
        const instrument  = player.instrument
        this.soundManager.playSound(instrument, Math.round(freqsLength * (1 - player.curY)))
        player.shouldPlay = false
      }

      const deNormalizedX = player.curX * canvasWidth
      const deNormalizedY = player.curY * canvasHeight
      this.addVisualNote(player, deNormalizedX, deNormalizedY, player.pressed || player.shouldPlay)
    })
  }

  sendPlayerUpdate = () => {
    this.socket.emit('drawing', {
      id: this.user.id,
      curX: this.user.curX,
      curY: this.user.curY,
      pressed: this.user.pressed,
      shouldPlay: this.user.shouldPlay
    });
    this.lastSent = performance.now();
  }

  addVisualNote(player, x, y, isPlaying) {

    player.notes.unshift({
      x: x, y: y, solid: isPlaying, s: isPlaying ? 25 - Math.random() * 10 : 20 - Math.random() * 15
    })
    // don't store more than 70 notes
    if (player.notes.length == 70) {
      player.notes.pop()
    }
  }

  recievePlayerUpdate = (msg) => {
    let player = this.players.find(player => player.id == msg.id)
    if (!player) {
      player = new Player(parseFloat(msg.id), this.soundManager, this.available_instruments.pop() || 'piano');
      this.players.push(player)
    }
    Object.assign(player,
      {
        curX: msg.curX,
        curY: msg.curY,
        pressed: msg.pressed,
        shouldPlay: msg.shouldPlay
      }
    )
  }

  switchInstrument(instrument){
    this.user.instrument = instrument
  }
}
