// fetch(
//   "https://api.geoapify.com/v1/ipinfo?apiKey=5eeb8b5528a7413c965093fd0c4b4800"
// )
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//   });

// const latitude = 37.7749;
// const longitude = -122.4194;

// fetch(
//   `https://api.geoapify.com/v1/reverse?lat=${latitude}&lon=${longitude}&apiKey=5eeb8b5528a7413c965093fd0c4b4800`
// )
//   .then((response) => response.json())
//   .then((data) => {
//     if (data.features && data.features.length > 0) {
//       const address = data.features[0].properties.formatted;
//       console.log("Address: ", address);
//     } else {
//       console.log("No address found for these coordinates.");
//     }
//   })
//   .catch((error) => console.error("Error fetching the location:", error));
