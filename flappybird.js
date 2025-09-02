// board
let board;
const boardWidth = 400;
const boardHeight = 700;
let context;

// bird
const birdWidth = 34;
const birdHeight = 24;
const birdX = boardWidth / 10;
const birdY = boardHeight / 2;

const bird = {
  x: birdX,
  y: birdY,
  width: birdWidth,
  height: birdHeight
};

let birdImg; 

// Pipes
let pipeArray = [];
let pipeWidth = 75;
let pipeHeight = 530;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImage;
let bottomPipeImage;


let velocityX = -2;//This is for the pipes moving left
let velocityY = 0 //This is for the bird to go up and down (which is gonna be 0 initially)
let gravity = 0.4;
let gameOver = false


window.onload = () => {
  board = document.getElementById('board');  
  board.width = boardWidth;
  board.height = boardHeight;

  context = board.getContext('2d');

  birdImg = new Image();
  birdImg.src = "flappybird.png";
  birdImg.onload = () => {
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
  };

  topPipeImage = new Image();
  topPipeImage.src = 'toppipe.png';

  bottomPipeImage = new Image();
  bottomPipeImage.src = 'bottompipe.png';

  requestAnimationFrame(update);
  setInterval(placePipes, 1500);
  document.addEventListener('keydown',(e)=>{if(e.code =='Space'|| e.code == 'ArrowUp') velocityY = -6})
};

function update() {
  if  (gameOver) return;
  requestAnimationFrame(update);
  context.clearRect(0, 0, board.width, board.height);

  // bird
  velocityY+= gravity
  bird.y = Math.max(bird.y+velocityY,0);//so that the max height the bird can reach is top of frame
  context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);//The crealRect will clear full cacnva so we haev to repaint the bird

  if(bird.y>board.height){
    gameOver = true;
  }

  // pipes
  for (let i = 0; i < pipeArray.length; i++) {
    let pipe = pipeArray[i];
    pipe.x += velocityX; 
    context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height); 
    if(detectCollision(bird,pipe)) gameOver = true;
  }
}

function placePipes() {
  let randomPipeY = pipeY - pipeHeight/5 - Math.random() * (pipeHeight/2);
  let opeaningSpace = board.height/5;
  let topPipe = {
    img: topPipeImage, 
    x: pipeX,
    y: randomPipeY,
    width: pipeWidth,
    height: pipeHeight,
    passed: false //This will check if the flappybird have passed the pipe yet or not
  };

  let bottomPipe = {
    img:bottomPipeImage,
    x:pipeX,
    y:randomPipeY + pipeHeight + opeaningSpace,
    width:pipeWidth,
    height:pipeHeight,
    passed:false
  }
  pipeArray.push(topPipe);
  pipeArray.push(bottomPipe)
}


//collision

function detectCollision(a,b){
  return((a.x<b.x + b.width) &&( a.x + a.width >b.x) && (a.y <b.y+b.height) &&( a.y + a.height > b.y) )
}