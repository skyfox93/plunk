var appContents = document.querySelector('.app-contents');
var startMessage = document.querySelector('.start-message');
appContents.style.display = 'none';

document.addEventListener('click', init);
let notes=[]
let freqs=[]
let notes2=[]
  notes2[0] = 97.998858995437323;
  notes2[1] = 110.000000000000000;
  notes2[2] = 123.470825314031027;

  notes2[3] = 130.812782650299317;
  notes2[4] = 146.832383958703780;
  notes2[5] = 164.813778456434964;
  notes2[6] = 174.614115716501942;
  notes2[7] = 195.997717990874647;
  notes2[8] = 220.000000000000000;
  notes2[9] = 246.941650628062055;

  notes2[10] = 261.625565300598634;
  notes2[11] = 293.664767917407560;
  notes2[12] = 329.627556912869929;
  notes2[13] = 349.228231433003884;
  notes2[14] = 391.995435981749294;



  freqs[0] = 220.000000000000000;
   freqs[1] = 261.625565300598634;
   freqs[2] = 293.664767917407560;
   freqs[3] = 329.627556912869929;
   freqs[4] = 391.995435981749294;
   freqs[5] = 440.000000000000000;
   freqs[6] = 523.251130601197269;
   freqs[7] = 587.329535834815120;
   freqs[8] = 659.255113825739859;
   freqs[9] = 783.990871963498588;


// freqs[0] = 130.812782650299317;
//  freqs[1] = 146.832383958703780;
//  freqs[2] = 164.813778456434964;
//  freqs[3] = 195.997717990874647;
//  freqs[4] = 220.000000000000000;
//  freqs[5] = 261.625565300598634;
//  freqs[6] = 293.664767917407560;
//  freqs[7] = 329.627556912869929;
//  freqs[8] = 391.995435981749294;
//  freqs[9] = 440.000000000000000;
function init(){

  document.removeEventListener('click', init);

  appContents.style.display = 'block';
  // create web audio api context
  var AudioContext = window.AudioContext || window.webkitAudioContext;
  var audioCtx = new AudioContext();
  // create Oscillator and gain node
  let currentOsc={}
  var WIDTH = window.innerWidth;
  var HEIGHT = window.innerHeight;
  var CurX; //updated on mousemove
  var CurY;// updated on mousemove
  var pressed=false


class Player {

  constructor(id){
    this.id=id ||Math.random()
    this.osc={}
    this.notes=[]
    this.pressed=false
    this.gainNode={}
    this.playSound=this.playSound.bind(this)
    this.stopPlaying=this.stopPlaying.bind(this)
    this.updateSound=this.updateSound.bind(this)
  }

  playSound(e){
    console.log('play')
    if(this.playing){return}
    this.playing=true
    this.pressed=true
    // if(this.gainNode.gain){this.gainNode.gain.value=0}
    //
    // if(this.osc.stop){this.osc.stop(audioCtx.currentTime)}
    this.gainNode = audioCtx.createGain();
    let oscillator = audioCtx.createOscillator();
    oscillator.connect(this.gainNode);
    this.gainNode.connect(audioCtx.destination);
    oscillator.type = 'triangle';
    console.log(Math.floor(10*(1-this.curY)))
    oscillator.frequency.value = freqs[Math.floor(10*(1-this.curY))]
    this.gainNode.gain.value =1-Math.abs(this.curX-0.5)/0.5;
    if(this.pressed){this.notes.unshift({x:this.curX*WIDTH,y:this.curY*HEIGHT,s:Math.random()})}
    oscillator.detune.value = 100; // value in cents
    oscillator.start(audioCtx.currentTime)
    this.osc=oscillator
  }
  updateSound(e) {

    if(!this.playing){return}

      this.osc.frequency.value = freqs[Math.floor(10*(1-this.curY))]
      this.gainNode.gain.value = 1-Math.abs(this.curX-.5)/0.5;
  }

  stopPlaying(e){
    this.playing=false;
    this.pressed=false
    this.gainNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0.02);
    this.osc.stop(audioCtx.currentTime+0.2)
    this.gainNode={}
  }

}


/*
  function playsound(e){
    pressed=true
  if(currentOsc.stop){currentOsc.stop(audioCtx.currentTime)}
  var oscillator = audioCtx.createOscillator();
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  CurX = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
  CurY = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
  oscillator.type = 'triangle';

  oscillator.frequency.value = freqs[Math.floor(10*(1-CurY/HEIGHT))]
  gainNode.gain.value = 0.8
  oscillator.detune.value = 100; // value in cents
  oscillator.start(audioCtx.currentTime)
  currentOsc=oscillator
  if(pressed){notes.unshift({x:CurX,y:CurY,s:Math.random()})}
}

  function stopPlaying(e){
    console.log('stop')
    pressed=false
    currentOsc.stop(audioCtx.currentTime+0.1)
  }
*/


  // create initial theremin frequency and volumn values



  var maxVol = 0.5;
  var initialVol = 0.2;

  // set options for the oscillator

const myID=Math.random()
var socket = io();
player1=new Player(myID)
let players=[player1]

function updatePlayer1(e){
  player1.curX =((window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft))/WIDTH;
  player1.curY = ((window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop))/HEIGHT;
  if(!player1.playing){console.log('not playing');return}
    player1.osc.frequency.value = freqs[Math.floor(10*(1-player1.curY))]
    player1.gainNode.gain.value = 1-Math.abs(player1.curX-0.5)/0.5;
}

function emit(){

  socket.emit('drawing', {
    id: myID,
    curX: player1.curX,
    curY: player1.curY,
    pressed:player1.pressed
  });
}
socket.on('drawing', updatePlayer);


setInterval(emit,50)



function updatePlayer(msg){

  if(msg.id == myID){return}
  //console.log(msg)
  //console.log(players.find(player=>player.id==msg.id))
  let player=players.find(player => player.id == msg.id)
if(!player){player=new Player(parseFloat(msg.id)); players.push(player)}
  Object.assign(player, {curX: msg.curX}, {curY: msg.curY}, {pressed: msg.pressed})
  if(!player.pressed && player.playing){ player.stopPlaying()}
  else if (!player.playing && player.pressed){player.playSound()}
  else{player.updateSound()}
}


  var canvas = document.querySelector('.canvas');
  canvas.onmousemove = updatePlayer1;
  document.onmouseup=player1.stopPlaying;
  document.onmousedown=player1.playSound;



  // mute button





  // canvas visualization

  function random(number1,number2) {
    var randomNo = number1 + (Math.floor(Math.random() * (number2 - number1)) + 1);
    return randomNo;
  }


  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  var canvasCtx = canvas.getContext('2d');

  function canvasDraw() {

    function drawNotes(){
      canvasCtx.clearRect(0,0,canvas.width,canvas.height)
      canvasCtx.globalAlpha = 1;
      for (player of players){
        let notes=player.notes
        const curX=player.curX
        const curY=player.curY
      canvasCtx.beginPath();
      canvasCtx.fillStyle = 'rgb(' + Math.floor((1-curY)*255) + ',' + 100 + ',' + Math.floor(curY*255)+')';
      canvasCtx.arc(curX*WIDTH,curY*HEIGHT,20,0,360,false);
      canvasCtx.fill();
      canvasCtx.closePath();
      while(notes.length>25){
      player.notes.pop()
      }
      if(player.pressed){notes.unshift({x:curX*WIDTH-10,y:curY*HEIGHT,s:Math.random()})}
      else{notes.unshift(null)}


    for(let i=0;i<notes.length;i++){
      if(notes[i]){
        canvasCtx.globalAlpha = 1-i/25;

        canvasCtx.beginPath();
        canvasCtx.fillStyle = 'rgb(' + 100+ + ',' + 100 + ',' + Math.floor(notes[i].y/HEIGHT*255)+')';
        canvasCtx.arc(notes[i].x-i*10,notes[i].y,20-notes[i].s*10,(Math.PI/180)*0,(Math.PI/180)*360,false);
        canvasCtx.fill();
        canvasCtx.closePath();
      }
    }
  }
    setTimeout(drawNotes,40)
    }
    drawNotes()

  }

  // clear screen


  // keyboard controls

  var body = document.querySelector('body');

canvasDraw()

 }
