const fetch = require("node-fetch");
let file = require("../../../../../Keys/Hypixelapi.json");

let key = file["key"];
let name = "Mister_Iron";

console.log(key);

fetch(`https://api.hypixel.net/player?key=${key}&name=${name}`)
	.then((response) => response.json())
	.then((data) => {
		console.log(data);
	})
	.catch((err) => {
		console.log("Network Error", err);
	});
