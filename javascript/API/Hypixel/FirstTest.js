const fetch = require("node-fetch");
let file = require("../../../../../Keys/Hypixelapi.json");

let key = file["key"];
let name = "BookRabbit";

fetch(`https://api.hypixel.net/player?key=${key}&name=${name}`)
	.then((response) => response.json())
	.then((data) => {
		let uuid = data.player.uuid;
		console.log(uuid);
	})
	.catch((err) => {
		console.log("Network Error", err);
	});
