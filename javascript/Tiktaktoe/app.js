"use strict";

let express = require("express");
let bodyParser = require("body-parser");
let session = require('express-session');
let game = require("./src/Game.js");

let games = [];

//server
let app = express();
app.set("view engine", "ejs");
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use(session({
    name: "sid",
    resave: false,
    saveUninitialized: false,
    secret: "test",
    cookie: {
        maxAge: 1000 * 60 * 60 * 2,
        sameSite: true,
        secure: false
    }
}))

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/game", (req, res) => {
    let name = req.body.name;
    let game;
    for(let i = 0; i < games.length; i++){
        if(games[i].Players[0] == null){
            games[i].Players[0] = name;
            game = i;
            break;
        }
        if(games[i].Players[1] == null){
            games[i].Players[1] = name;
            game = i;
            break;
        }
    }

    if(game == null){
        games.push({Players: [name, null], game: new game()});
    }
    
    res.render("game", {
        game: games[game]
    });
})

app.post("/gamestatus", (req, res) => {
    let game = req.body.game;
    console.log(game);
});

app.post("/gamemove", (req, res) => {
    let game = req.body.game;
    let move = req.body.move;
});

app.listen(4000, () => {
    console.log("app wurde gestartet");
});