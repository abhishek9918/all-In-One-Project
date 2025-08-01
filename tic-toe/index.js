let boxes = document.querySelectorAll(".box");
const reset_Btn = document.querySelector("#reset");
let play_again = document.querySelector("#play-again");
let teamWin = document.getElementById("winner-team");
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

function playMusic() {
  new Audio("./assests/winner.mp3").play();
}

function hideModal() {
  document.getElementById("winner-message").style.visibility = "hidden";
}
hideModal();
reset_Btn.addEventListener("click", function (e) {
  e.preventDefault();
  // hideModal();
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
    turn = true;
  });
};

boxes.forEach((box, index) => {
  // box.innerHTML = index;
  box.addEventListener("click", function (e) {
    e.preventDefault();
    turn = !turn;
    if (turn) {
      box.innerHTML = "X";
    } else {
      box.innerHTML = "O";
    }
    box.disabled = true;
    checkWinner();
  });
});
const checkWinner = () => {
  for (let pattern of winPatterns) {
    // console.log(pattern[0], pattern[1], pattern[2]);
    let position1 = boxes[pattern[0]]?.innerText;
    let position2 = boxes[pattern[1]]?.innerText;
    let position3 = boxes[pattern[2]]?.innerText;
    if (position1 != "" && position2 != "" && position3 != "") {
      if (position1 === position2 && position2 === position3) {
        showModal(position1);
        playMusic();
        disabledBtn();
      }
    }
  }
};

//  login

function onSignIn(googleUser) {
  console.log(googleUser, "googleUser");
  // Get the user's basic profile information
  const profile = googleUser.getBasicProfile();

  // Get the ID, Name, and Email
  const userID = profile.getId();
  const userName = profile.getName();
  const userEmail = profile.getEmail();

  // Log the user's info (or use it in your app)
  console.log("ID: " + userID);
  console.log("Name: " + userName);
  console.log("Email: " + userEmail);

  // Get the authentication token (optional)
  const authResponse = googleUser.getAuthResponse();
  console.log("ID Token: " + authResponse.id_token);

  // Optionally, you can send this information to your server for validation
}
