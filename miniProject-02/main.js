const form = document.querySelector("form");
console.log(form);

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let height = parseInt(document.querySelector("#height").value);
  let weight = parseInt(document.querySelector("#weight").value);

  const result = document.querySelector("#results");
  if (height === "" || height < 0 || isNaN(height)) {
    result.innerHTML = `Please give valid ${height}`;
  } else if (weight === "" || weight < 0 || isNaN(weight)) {
    result.innerHTML = `Please give valid ${weight}`;
  } else {
    console.log(height, weight);
    const bmi = (weight / ((height * height) / 10000)).toFixed(2);
    console.log(bmi, "bmi");

    let msgInfo = "";
    if (bmi < 18.6) {
      msgInfo = "You are underweight";
    } else if (bmi >= 18.6 && bmi < 24.9) {
      msgInfo = "You are in the normal range";
    } else {
      msgInfo = "You are overweight";
    }
    const msg = document.querySelector("#msg");
    const newMsg = document.createElement("div");
    newMsg.appendChild(document.createTextNode(msgInfo));
    msg.appendChild(newMsg);

    const newRes = document.createElement("div");
    newRes.appendChild(document.createTextNode(bmi));
    result.appendChild(newRes);

    // Clear input fields
    document.querySelector("#height").value = "";
    document.querySelector("#weight").value = "";
  }
});
