export default class PlayersManager{

    constructor(){
      this.user = new Player()
      this.players = [player1]
      this.lastSent = null // when we last sent data to the server
      this.socket = io();
      this.socket.on('drawing', this.recievePlayerUpdate);
    }
  
    updateUser = (x, y, isPressed = null) => {
      let user = this.user
      // isPressed is null for mousemove, true for mouse down, false for mouseup
      user.curX = x
      user.curY = y
      if (isPressed !== null) {
        //
        user.pressed = isPressed
        user.shouldPlay = isPressed
      }
  
      if (Performance.now() - this.lastSent > 50) {
        this.sendToServer()
      }
    }
  
    sendPlayerUpdate = () => {
      socket.emit('drawing', {
        id: myID,
        curX: this.user.curX,
        curY: this.user.curY,
        pressed: this.user.pressed,
        shouldPlay: this.user.shouldPlay
      });
      this.lastSent = Performance.now();
      console.log('emited')
    }
  
    recievePlayerUpdate = (msg) => {
      let player = players.find(player => player.id == msg.id)
      if (!player) {
        player = new Player(parseFloat(msg.id));
        players.push(player)
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
  }
  