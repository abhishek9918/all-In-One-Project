const submit = document.querySelector("#subt");
// const submit = document.querySelector("#");
const userInput = document.getElementById("guessField");

const guessSlot = document.querySelector(".guesses");

const remaining = document.querySelector(".lastResult");
const lowHi = document.querySelector(".lowOrHi");

const startOver = document.querySelector(".resultParas");

const p = document.createElement("p");

let prevGuess = [];
let numGuess = 1;
let playgame = true;

if (playgame) {
  submit.addEventListener("click", function (e) {
    e.preventDefault();
    let guesNum = parseInt(userInput.value);
    validateGuess(guesNum);
  });
}

let randomNumb = Math.floor(Math.random() * 100 + 1);

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert("please enter valid number");
    console.log(guess);
  } else if (guess < 1) {
    alert("please enter valid number");
  } else if (guess > 100) {
    alert("please enter less than  100");
  } else {
    prevGuess.push(guess);
    if (numGuess === 11) {
      displayGuess(guess);
      displayMsg(`game over . random num was${randomNumb}`);
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
} // it check the validtion the value check 0

function checkGuess(guess) {
  if (guess === randomNumb) {
    displayMsg(`You guessd right`);
    endGame();
  } else if (guess < randomNumb) {
    displayMsg(`Number is TOoo low`);
  } else if (guess > randomNumb) {
    displayMsg(`Number is TOooo Hiiiiigh`);
  }
}
function displayGuess(guess) {
  userInput.value = "";
  guessSlot.innerHTML += `${guess} `;
  numGuess++;
  remaining.innerHTML = `${11 - numGuess};`;
}

function displayMsg(messege) {
  lowHi.innerHTML = ` <h2>${messege}</h2> `;
} // clean the values and update the gues array

function endGame(guess) {
  // if () {
  userInput.value = "";
  userInput.setAttribute("disabled", "");
  p.classList.add("button");
  p.innerHTML = `<h3 id="newGame"> start New game</h3>`;

  startOver.appendChild(p);
  playgame = false;
  newGame();
}

function newGame() {
  const newBtn = document.querySelector("#newGame");
  newBtn.addEventListener("click", function (e) {
    randomNumb = Math.floor(Math.random() * 100 + 1);
    prevGuess = [];
    numGuess = 1;
    guessSlot.innerHTML = "";
    userInput.removeAttribute("disabled");
    startOver.removeChild(p);
    remaining.innerHTML = `${11 - numGuess};`;
    playgame = true;
  });
}
