const stick = document.getElementsByClassName("stick");
const boll = document.getElementById("boll");
const Score = document.getElementById("score");
const Level = document.getElementById("level");

let innerWidth = window.innerWidth - 1;
let innerHeight = window.innerHeight - 1;
const widthMinusStickWidth = innerWidth - 300;
const widthMinustBallWidth = innerWidth - 20;
let vx = -1;
let vy = 10;
let x = 1;
let y = 1;
var intervalId;
let score = 0;
var currentUserName = prompt("What is your name ?");
var maxScoreUserInfo = JSON.parse(localStorage.getItem("maxScoreUserInfo"));
var maxScorerName = maxScoreUserInfo ? maxScoreUserInfo.username : "";
var maxScore = parseInt(maxScoreUserInfo ? maxScoreUserInfo.maxscore : 0);
assignLeft();
window.addEventListener("keydown", (keyinfo) => {
  if (keyinfo.key == "a") {
    for (let i = 0; i < stick.length; i++) {
      let leftNumber = parseInt(getComputedStyle(stick[i]).left, 10);
      if (leftNumber > 0) {
        if (leftNumber > 50) {
          stick[i].style.left = leftNumber - 50 + "px";
        } else {
          stick[i].style.left = 0 + "px";
        }
      }
    }
  } else if (keyinfo.key == "d") {
    for (let i = 0; i < stick.length; i++) {
      let leftNumber = parseInt(getComputedStyle(stick[i]).left, 10);
      if (leftNumber < innerWidth - 300) {
        if (leftNumber + 50 < innerWidth - 300) {
          stick[i].style.left = leftNumber + 50 + "px";
        } else {
          stick[i].style.left = innerWidth - 300 + "px";
        }
      }
    }
  }
});

function assignLeft() {
  //it is also used to restart the game
  vx = -1;
  vy = 10;
  x = 1;
  y = 1;
  score = 0;
  clearInterval(intervalId);
  const midPositionOfStick = widthMinusStickWidth / 2;
  const midPositionOfBall = widthMinustBallWidth / 2;
  vx = midPositionOfBall;
  boll.style.left = midPositionOfBall + "px";
  boll.style.bottom = vy + "px";
  for (let i = 0; i < stick.length; i++) {
    stick[i].style.left = midPositionOfStick + "px";
  }
  moveBall();
}
function moveBall() {
  intervalId = setInterval(() => {
    changPositionOfBall();
  }, 1);
}

function changPositionOfBall() {
  vx += x;
  vy += y;
  const isTopDivAndBollCollide = findDistanceBetwenTopDivAndBoll(
    stick[0],
    boll
  );
  const isBottomDivAndBollCollide = findDistanceBetwenBottomDivAndBoll(
    stick[1],
    boll
  );
  if (isBottomDivAndBollCollide || isTopDivAndBollCollide) {
    y = -y;
    vy += 2 * y;
    increaseScore();
  }
  if (vy >= innerHeight - 21 || vy <= 0) {
    if (score > maxScore) {
      maxScore = score;
      saveDataInLocalStorage();
    }
    showMaxScore();
    assignLeft();
    y = -y;
  }

  if (vx >= innerWidth - 21 || vx <= 0) {
    x = -x;
  }

  boll.style.left = vx + "px";
  boll.style.bottom = vy + "px";
}

function findDistanceBetwenTopDivAndBoll(stick, boll) {
  var stickrect = stick.getBoundingClientRect();
  var bollrect = boll.getBoundingClientRect();
  var stickY = stickrect.top;
  var bollY = bollrect.top;
  var stickLeftEnd = stickrect.left;
  var stickRightEnd = stickLeftEnd + 300;
  var bollLeft = bollrect.left;
  if (
    bollLeft + 20 >= stickLeftEnd &&
    bollLeft <= stickRightEnd &&
    stickY - bollY >= -11
  ) {
    return true;
  }
  return false;
}
function findDistanceBetwenBottomDivAndBoll(stick, boll) {
  var stickrect = stick.getBoundingClientRect();
  var bollrect = boll.getBoundingClientRect();
  var stickY = stickrect.bottom;
  var bollY = bollrect.bottom;
  var stickLeftEnd = stickrect.left;
  var stickRightEnd = stickLeftEnd + 300;
  var bollLeft = bollrect.left;
  if (
    bollLeft + 20 >= stickLeftEnd &&
    bollLeft <= stickRightEnd &&
    stickY - bollY < 10
  ) {
    return true;
  }
  return false;
}
function increaseScore() {
  score++;
  Score.innerText = `Score- ${score}`;
}

function saveDataInLocalStorage() {
  maxScoreUserInfo = {
    username: currentUserName[0].toUpperCase() + currentUserName.slice(1),
    maxscore: score,
  };
  localStorage.setItem("maxScoreUserInfo", JSON.stringify(maxScoreUserInfo));
}
function showMaxScore() {
 maxScoreUserInfo = JSON.parse(localStorage.getItem("maxScoreUserInfo"));
 maxScorerName = maxScoreUserInfo ? maxScoreUserInfo.username : "";
 maxScore = parseInt(maxScoreUserInfo ? maxScoreUserInfo.maxscore : 0);
  window.alert(`
    Your score - ${score} 
    Max score - ${maxScore}
    Max scorer user - ${maxScorerName}
    `);
}
