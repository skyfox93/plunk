export default class Player {
    constructor(id, soundManager) {
        this.id = id || Math.random()
        this.notes = []
        this.pressed = false
        this.souldPlay = false
    } 
}
