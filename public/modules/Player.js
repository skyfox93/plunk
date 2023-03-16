export default class Player {
    constructor(id, soundManager) {
        this.id = id || Math.random()
        this.soundManager = soundManager
        this.osc = {}
        this.notes = []
        this.pressed = false
        this.playing = false
        this.pPlaying = false // previously Playing
        this.gainNode = {}
    }

    playSound(instrument, canvasHeight) {
        this.soundManager.playSound(instrument, Math.round(20 * (1 - this.curY)))
        
    }
    
    addVisualNote(x, y, isPlaying) {

        this.notes.unshift({
            x: x, y: y, solid: isPlaying, s: isPlaying ? 25 - Math.random() * 10 : 20 - Math.random() * 15
        })
        // don't store more than 70 notes
        if (this.notes.length == 70) {
            this.notes.pop()
        }
    }
    updatePosition = (x, y) => {
        this.curX = x;
        this.curY = y;
    }

    startPlaying = (e) => {
        this.pressed = true
        this.shouldPlay = true
    }

    stopPlaying = (e) => {
        this.pressed = false
    }
}
