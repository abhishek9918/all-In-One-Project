const localTime = document.querySelector("#banner");
const clock = document.querySelector("#clock");

// console.log(time);

// let time = new Date().toLocaleTimeString();
// const timeEl = document.createElement("div");
// timeEl.appendChild(document.createTextNode(time));
// clock.appendChild(timeEl);

setInterval(function () {
  let time = new Date().toLocaleTimeString();
  clock.innerHTML = time;
}, 1000);
