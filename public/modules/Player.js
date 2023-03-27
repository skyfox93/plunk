export default class Player {
    constructor(id, soundManager, instrument) {
        this.id = id || Math.random()
        this.notes = []
        this.pressed = false
        this.souldPlay = false
        this.instrument = instrument
    } 
}
