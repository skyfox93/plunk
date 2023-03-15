
import { SoundManager } from "./modules/SoundManager";
import PlayersManager from "./modules/PlayersManager";


  /* AudioContext cannot play sounds until user clicks within window
    So we show a "click anywhere message and replace it when the app starts"
  */

  let clickMeMessage = document.querySelector('.start-message');
  clickMeMessage.classList.remove('hide')

  const handleClick = () => {
    app =  new App()
    app.mount()
    document.removeEventListener('mousedown', this.initSounds)
    document.removeEventListener('touchstart', this.initSounds)
    let appContents = document.querySelector('.app-contents');
    appContents.classList.remove('hide')
    startMessage.classList.add('hide')
  }

  document.addEventListener('mousedown', handleClick)
  document.addEventListener('touchstart',handleClick)



let freqs = []
freqs[0] = 55.000000000000000;
freqs[1] = 65.406391325149658;
freqs[2] = 73.416191979351890;
freqs[3] = 82.406889228217482;
freqs[4] = 97.998858995437323;
freqs[5] = 110.000000000000000;
freqs[6] = 130.812782650299317;
freqs[7] = 146.832383958703780;
freqs[8] = 164.813778456434964;
freqs[9] = 195.997717990874647;
freqs[10] = 220.000000000000000;
freqs[11] = 261.625565300598634;
freqs[12] = 293.664767917407560;
freqs[13] = 329.627556912869929;
freqs[14] = 391.995435981749294;
freqs[15] = 440.000000000000000;
freqs[16] = 523.251130601197269;
freqs[17] = 587.329535834815120;
freqs[18] = 659.255113825739859;
freqs[19] = 783.990871963498588;
freqs[20] = 880;

class App {

  mount = () => {
    let soundManager = new SoundManager()
    soundManager.initSounds()
    let playerManager = new PlayersManager()
    let mouseEventsHandler = new MouseEventsHandler(playerManager)
    mouseEventsHandler.assignEventListeners()
  }

}

  initSounds() {
    
    document.removeEventListener('touchstart', this.initSounds)
   
    // create web audio api context
    let audioCtx = (new AudioContextManger).init()
  
    if (audioCtx == false || !audioCtx.createOscillator) {
      alert(" Your browser is not supported. You cannot use this application")
    }
    return audioCtx
  }

}

 

function initCanvas(){

}
var canvasCtx = canvas.getContext('2d');
canvasCtx.lineWidth = screen.height / 500;
let beat = 0 

function playLoop() {
  // sounds play only on beat. Notes can change on 1/2 beat
  beat = beat < 4 ? beat + 1 : 0
  onBeat = !beat
  canvasCtx.globalAlpha = 1;
  canvasCtx.clearRect(0, 0, WIDTH, HEIGHT)
  canvasCtx.fillStyle = 'rgb(50,50,50)'
  canvasCtx.fillRect(0, 0, WIDTH, HEIGHT)
  canvasCtx.beginPath()
  canvasCtx.strokeStyle = 'rgb(200,200,200)'

  for (let i = 0; i < 20; i++) {
    canvasCtx.moveTo(0, HEIGHT / 20 * i)
    canvasCtx.lineTo(WIDTH, HEIGHT / 20 * i)
  }
  canvasCtx.globalAlpha = 1;

  canvasCtx.stroke()
  canvasCtx.globalAlpha = 1;


  for (player of players) {
    /*if we are in between beats, and player started playing (mousedown),
     then play a note until the next beat
     if the user hit mouseDown and hasn't yet played a sound (shouldPlay)
     then play a sound even if the mouse isn't pressed,
     this allows users to play by taping the mouse or keypad.*/

    if ((player.shouldPlay || player.pressed) && onBeat) {
      // Play a sound
      this.SoundManager.playSound("organ", Math.round(20 * (1 - player.curY)))
      // store note for animating the canvas
      player.notes.unshift({
        x: player.curX * WIDTH, y: player.curY * HEIGHT, solid: true, s: 25
      })
      // now that the note has been played, do not play another note unless the mouse is pressed
      player.shouldPlay = false
    }
    //if the music is playing, but its in between beats, store the position for animation.
    else if (player.pressed) {
      player.notes.unshift({
        x: player.curX * WIDTH,
        y: player.curY * HEIGHT,
        solid: true,
        s: 25 - Math.random() * 15
      }
      )
    }

    // store the position, but don't color it it in
    else {
      player.notes.unshift({
        x: player.curX * WIDTH,
        y: player.curY * HEIGHT,
        solid: false,
        s: 20 - Math.random() * 15
      },
      )
    }

    let notes = player.notes
    const curX = player.curX
    const curY = player.curY
    canvasCtx.beginPath();
    // draw the mouse pointer
    canvasCtx.fillStyle = 'rgb(' + 100 + ',' + 100 + ',' + Math.floor(curY / HEIGHT * 255) + ')';
    canvasCtx.arc(WIDTH / 2, curY * HEIGHT, 20, 0, 360, false);
    canvasCtx.fill();
    // don't store more than 70 notes
    while (notes.length > 70) {
      player.notes.pop()
    }


    for (let i = 0; i < notes.length; i++) {
      if (notes[i]) {
        // set the opacity depending on how old the note is (i).
        canvasCtx.globalAlpha = (1 - i / 70) * 0.75;
        canvasCtx.beginPath();
        canvasCtx.ellipse(WIDTH / 2 - i * 15, notes[i].y, notes[i].s, notes[i].s, 0, 0, Math.PI * 2);

        // draw an ellipse with the note
        if (notes[i].solid) {
          canvasCtx.strokeStyle = 'rgb(' + 255 + ',' + 100 + ',' + Math.floor(notes[i].y / HEIGHT * 255) + ')';

          canvasCtx.fillStyle = 'rgb(' + 255 + ',' + 100 + ',' + Math.floor(notes[i].y / HEIGHT * 255) + ')';
          canvasCtx.fill();

        }
        else {
          canvasCtx.strokeStyle = 'rgb(' + 255 + ',' + 100 + ',' + Math.floor(notes[i].y / HEIGHT * 255) + ')';
          canvasCtx.stroke()
        }
      }
    }


  }
  if (isSupported) { setTimeout(playLoop, 40); }
  else { alert('Sorry, this device ( probably an iphone or ipad) is not supported') }

}

// clear screen


// keyboard controls

var body = document.querySelector('body');

//canvasDraw()
playLoop()
 }
