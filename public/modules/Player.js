export default class Player {
    constructor(id, soundManager, instrument, name = "") {
        this.id = id || Math.random()
        this.notes = []
        this.pressed = false
        this.souldPlay = false
        this.instrument = instrument
        this.curY = 0.5
        this.curX = 0.5
        this.name = name
    }
}
