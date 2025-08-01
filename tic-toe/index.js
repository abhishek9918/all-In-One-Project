let boxes = document.querySelectorAll(".box");
const reset_Btn = document.querySelector("#reset");
let play_again = document.querySelector("#play-again");
let teamWin = document.getElementById("winner-team");
const isDraw = [...boxes].every((box) => box.innerText !== "");
let turn = true;
let winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
let currentAudio = null;
function playMusic(result) {
  if (currentAudio) currentAudio.pause();
  const music =
    result === "WIN"
      ? "./assests/winner.mp3"
      : "./assests/mixkit-player-losing-or-failing-2042.wav";

  currentAudio = new Audio(music);
  currentAudio.play();
}

function hideModal() {
  document.getElementById("winner-message").style.visibility = "hidden";
}
hideModal();
reset_Btn.addEventListener("click", function (e) {
  e.preventDefault();
  enableBtn();
});

function showModal(win) {
  teamWin.innerHTML = `"${win}"`;
  document.getElementById("winner-message").style.visibility = "visible";
}

play_again.addEventListener("click", function (e) {
  e.preventDefault();
  hideModal();
  enableBtn();
});

const disabledBtn = () => {
  boxes.forEach((e) => {
    e.disabled = true;
  });
};
const enableBtn = () => {
  boxes.forEach((e) => {
    e.disabled = false;
    e.innerHTML = "";
    teamWin.innerHTML = "";
    e.classList.remove("x-move", "o-move");
    turn = true;
  });
};

boxes.forEach((box, index) => {
  box.addEventListener("click", function (e) {
    e.preventDefault();
    turn = !turn;
    if (turn) {
      box.innerHTML = "X";
      box.classList.add("x-move");
    } else {
      box.innerHTML = "O";
      box.classList.add("o-move");
    }
    box.disabled = true;
    checkWinner();
  });
});
const checkWinner = () => {
  let winnerFound = false;
  for (let pattern of winPatterns) {
    let position1 = boxes[pattern[0]]?.innerText;
    let position2 = boxes[pattern[1]]?.innerText;
    let position3 = boxes[pattern[2]]?.innerText;
    if (position1 != "" && position2 != "" && position3 != "") {
      if (position1 === position2 && position2 === position3) {
        winnerFound = true;
        showModal(position1);
        playMusic("WIN");
        disabledBtn();
        return;
      }
    }
  }
  const isDraw = [...boxes].every((box) => box.innerText !== "");
  console.log(winnerFound, "winnerFound");
  if (!winnerFound && isDraw) {
    showModal("No one 😢 It's a Draw");
    playMusic("DRAW");
    disabledBtn(); // optional if you want to freeze board
  }
};

function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();

  const userID = profile.getId();
  const userName = profile.getName();
  const userEmail = profile.getEmail();

  const authResponse = googleUser.getAuthResponse();
}
