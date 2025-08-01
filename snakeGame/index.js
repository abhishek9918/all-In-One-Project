const board = document.getElementById("board");
let direction = { x: 0, y: 0 };
let foodSound = new Audio("food.mp3");
let gameOver = new Audio("food.mp3");
let moveSound = new Audio("moov.mp3");
let musicSound = new Audio("food.mp3");

var x = 50;
var y = 50;
var width = 10;
var height = 10;
const cellSize = 20;
let speed = 2;
let lastiPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };
//  game function
function main(cTime) {
  window.requestAnimationFrame(main);
  if ((cTime - lastiPaintTime) / 1000 < 1 / speed) {
    return cTime;
  }
  lastiPaintTime = cTime;
  gameEngine();
}
let snakeEl;
let foodEl;
let score = 0;

function isCollide(sarr) {
  return false;
}

function gameEngine() {
  // part 1 updaitn the snake Var
  if (isCollide(snakeArr)) {
    gameOver.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game Over . Pless any key to play again!!");
    snakeArr = [{ x: 13, y: 15 }];
    musicSound.play();
    score = 0;
  }

  // if you have eaten the food increment the score and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }
  // moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = snakeArr[i];
  }

  // part 2 render the snamke and food
  board.innerHTML = "";
  snakeArr.forEach((e, i) => {
    snakeEl = document.createElement("div");
    snakeEl.style.gridRowStart = e.y;
    snakeEl.style.gridColumnStart = e.x;
    if (i === 0) {
      snakeEl.classList.add("head");
    } else {
      snakeEl.classList.add("snake");
    }
    board.appendChild(snakeEl);
  });

  //displaying the food
  foodEl = document.createElement("div");
  foodEl.style.gridRowStart = food.y;
  foodEl.style.gridColumnStart = food.x;
  foodEl.classList.add("food");
  board.appendChild(foodEl);
}

// main logic start here
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 };
  //   moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowRight":
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowLeft":
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});

const snakeHead = document.querySelector(".snake-head");
const eyes = document.querySelectorAll(".eye");

function animateEyes() {
  eyes.forEach((eye) => {
    eye.style.transform = `translateY(${Math.random() * 5 - 2.5}px)`;
  });
}

setInterval(animateEyes, 200);
