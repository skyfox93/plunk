
import { SoundManager } from "./modules/SoundManager.js";
import PlayersManager from "./modules/PlayersManager.js";
import CanvasManager from "./modules/CanvasManager.js";
import MouseEventsHandler from "./modules/MouseEventsHandler.js";

const Tempo = 120
/* AudioContext cannot play sounds until user clicks within window
  So we show a "click anywhere message and replace it when the app starts"
*/

let clickMeMessage = document.querySelector('.start-message');
clickMeMessage.classList.remove('hide')

const handleClick = () => {
 
  document.removeEventListener('mousedown', handleClick)
  document.removeEventListener('touchstart', handleClick)
  let appContents = document.querySelector('.app-contents');
  let startMessage = document.querySelector('.start-message');

  appContents.classList.remove('hide')
  startMessage.classList.add('hide')
  const app = new App()
  app.mount()}

document.addEventListener('mousedown', handleClick)
document.addEventListener('touchstart', handleClick)

class App {
  mount = () => {
    let soundManager = new SoundManager()
    let playerManager = new PlayersManager(soundManager)
    let mouseEventsHandler = new MouseEventsHandler(playerManager)
    let canvasManager = new CanvasManager(playerManager)
    mouseEventsHandler.assignEventListeners()
    canvasManager.mount()
  }

}


