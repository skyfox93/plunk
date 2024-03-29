import { freqsLength } from "../freqs.js";

export default class CanvasManager {

    constructor(playerManager) {
  
      this.playerManager = playerManager
      this.canvas = document.querySelector('.canvas');
      this.canvasCtx = this.canvas.getContext('2d');
        
    }
  
    mount() {
      this.canvasCtx.lineWidth = screen.height / 500;
      this.canvas.height = window.innerHeight
      this.canvas.width = window.innerWidth
      this.interval = setInterval( this.playLoop, 40);
      this.frame = 0
    }
  
    playLoop = () => {
     
      if (this.frame >= 6) {
        this.frame = 0
        this.playerManager.updateCpu()
      } else {
        this.frame += 1
      }
      
      this.playerManager.updateNotes(this.frame, this.canvas.width, this.canvas.height)
      this.drawVisuals()

    }
  
    drawVisuals = () => {
      this.paintBackground()
      this.drawSounds()
    }
  
    paintBackground = () => {
    let canvasCtx = this.canvasCtx
      canvasCtx.globalAlpha = 1;
      canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      canvasCtx.fillStyle = 'rgb(50,50,50)'
      canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height)
      canvasCtx.beginPath()
      canvasCtx.strokeStyle = 'rgb(200,200,200)'
  
      for (let i = 0; i < freqsLength; i++) {
        canvasCtx.moveTo(0, this.canvas.height / freqsLength * i)
        canvasCtx.lineTo(this.canvas.width, this.canvas.height / freqsLength * i)
      }
      canvasCtx.stroke()
    }
  
    drawSounds() {
        const canvasCtx = this.canvasCtx
      this.playerManager.players.forEach((player) => {
        let notes = player.notes
        const canvasWidth = this.canvas.width
        const canvasHeight = this.canvas.height
        
        canvasCtx.beginPath();
        for (let i = 0; i < notes.length; i++) {
          if (notes[i]) {
           
            // set the opacity depending on how old the note is (i).
            canvasCtx.globalAlpha = (1 - i / 70) * 0.75;
            canvasCtx.beginPath();
            canvasCtx.ellipse(canvasWidth / 2 - i * 15, notes[i].y, notes[i].s, notes[i].s, 0, 0, Math.PI * 2);
            if (i == 0 ) {
              canvasCtx.font = "14px serif";
              canvasCtx.fillStyle = 'white'
              canvasCtx.fillText(player.name, canvasWidth/2 + 30, notes[i].y);
            }
            // draw an ellipse with the note
            if (notes[i].solid) {
              canvasCtx.strokeStyle = 'rgb(' + 255 + ',' + 100 + ',' + Math.floor(notes[i].y / canvasHeight * 255) + ')';
              canvasCtx.fillStyle = 'rgb(' + 255 + ',' + 100 + ',' + Math.floor(notes[i].y / canvasHeight * 255) + ')';
              canvasCtx.fill();
            }
  
            else {
              canvasCtx.strokeStyle = 'rgb(' + 255 + ',' + 100 + ',' + Math.floor(notes[i].y / canvasHeight * 255) + ')';
              canvasCtx.stroke()
            }
          }
        }
      })
    }
  }
  