export default class MouseEventsHandler {

    constructor(playerManager) {
      this.playerManager = playerManager
      this.canvas = document.querySelector('.canvas');
    }


    handleInstrumentClick = (e) => {
        if (e.target.className == 'instrument-choice') {
          // clear any previously highlighted
          document.querySelectorAll('.instrument-choice').forEach(item => item.className = 'instrument-choice')
          e.target.className = 'instrument-choice highlighted'
          this.playerManager.switchInstrument(e.target.dataset.instrument)
        }
    }
  
    mouseCoordsToGrid = (coords) => {
      const [pageX, pageY] = coords
      return [pageX/this.canvas.width, pageY / this.canvas.height]
  
    }
    coordsFromTouch = (e) => (
      [e.targetTouches[0].pageX, e.targetTouches[0].pageY]
    )
    
  
    coordsFromMouse = (e) => (
      [e.pageX, e.pageY]
    )
  
    handleTouchMove = (e) => {
      e.preventDefault()
      const [x,y] = this.pixelsToGrid(this.coordsFromTouch(e))
      this.playerManager.updateUser(x,y, null)
    }
  
    handleTouchStart = (e) => {
      e.preventDefault()
      const [x,y] = this.pixelsToGrid(this.coordsFromTouch(e))
      this.playerManager.updateUser(x,y, true)
    }
    handleTouchEnd = (e) => {
      e.preventDefault()
      const [x,y] = this.pixelsToGrid(this.coordsFromTouch(e))
      this.playerManager.updateUser(x,y, false)
    }
  
    handleMouseMove = (e) => {
      e.preventDefault()
      const [x,y] = this.mouseCoordsToGrid(this.coordsFromMouse(e))
      this.playerManager.updateUser(x,y, null)
    }
  
    handleMouseDown = (e) => {
      e.preventDefault()
      const [x,y] = this.mouseCoordsToGrid(this.coordsFromMouse(e))
      this.playerManager.updateUser(x,y, true)
    }
    handleMouseUp = (e) => {
      e.preventDefault()
      const [x,y] = this.mouseCoordsToGrid(this.coordsFromMouse(e))
      this.playerManager.updateUser(x,y, false)
    }
    
    assignEventListeners = () => {
      this.canvas.addEventListener('touchmove', this.handleTouchMove)
      this.canvas.addEventListener('touchstart', this.handleTouchStart)
      this.canvas.addEventListener('touchend', this.handleTouchEnd)
      this.canvas.addEventListener('mousemove', this.handleMouseMove);
      this.canvas.addEventListener('mouseup', this.handleMouseUp);
      this.canvas.addEventListener('mousedown', this.handleMouseDown);
      document.querySelector('.instrumentSelector').addEventListener('click', this.handleInstrumentClick)
    }
  }