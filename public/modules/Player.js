class Player {
    constructor(id) {
      this.id = id || Math.random()
      this.osc = {}
      this.notes = []
      this.pressed = false
      this.playing = false
      this.pPlaying = false // previously Playing
      this.gainNode = {}
      this.playSound = this.playSound.bind(this)
      this.stopPlaying = this.stopPlaying.bind(this)
      this.updateSound = this.updateSound.bind(this)
    }
  
    updatePosition(x, y) {
      this.curX = x;
      this.curY = y;
    }
  
    startPlaying(e) {
      this.pressed = true
      this.shouldPlay = true
    }
  
    stopPlaying(e) {
      this.pressed = false
    }
  }
  