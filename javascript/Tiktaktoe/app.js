"use strict";

let express = require("express");
let bodyParser = require("body-parser");

let Feld = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

let cur = "X";

function iswon(Feld) {
    if (Feld[0][0] == "X" && Feld[0][1] == "X" && Feld[0][2] == "X") {
        return "X";
    }
    if (Feld[1][0] == "X" && Feld[1][1] == "X" && Feld[1][2] == "X") {
        return "X";
    }
    if (Feld[2][0] == "X" && Feld[2][1] == "X" && Feld[2][2] == "X") {
        return "X";
    }
    if (Feld[0][0] == "X" && Feld[1][0] == "X" && Feld[2][0] == "X") {
        return "X";
    }
    if (Feld[0][1] == "X" && Feld[1][1] == "X" && Feld[2][1] == "X") {
        return "X";
    }
    if (Feld[0][2] == "X" && Feld[1][2] == "X" && Feld[2][2] == "X") {
        return "X";
    }
    if (Feld[0][0] == "X" && Feld[1][1] == "X" && Feld[2][2] == "X") {
        return "X";
    }
    if (Feld[0][2] == "X" && Feld[1][1] == "X" && Feld[2][0] == "X") {
        return "X";
    }


    if (Feld[0][0] == "O" && Feld[0][1] == "O" && Feld[0][2] == "O") {
        return "O";
    }
    if (Feld[1][0] == "O" && Feld[1][1] == "O" && Feld[1][2] == "O") {
        return "O";
    }
    if (Feld[2][0] == "O" && Feld[2][1] == "O" && Feld[2][2] == "O") {
        return "O";
    }
    if (Feld[0][0] == "O" && Feld[1][0] == "O" && Feld[2][0] == "O") {
        return "O";
    }
    if (Feld[0][1] == "O" && Feld[1][1] == "O" && Feld[2][1] == "O") {
        return "O";
    }
    if (Feld[0][2] == "O" && Feld[1][2] == "O" && Feld[2][2] == "O") {
        return "O";
    }
    if (Feld[0][0] == "O" && Feld[1][1] == "O" && Feld[2][2] == "O") {
        return "O";
    }
    if (Feld[0][2] == "O" && Feld[1][1] == "O" && Feld[2][0] == "O") {
        return "O";
    }
}

//server
let app = express();
app.set("view engine", "ejs");
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/move", (req, res) => {
    let player = req.body.player;
    let x = req.body.x;
    let y = req.body.y;

    if(cur == player){
        if(Feld[y][x] == ""){
            Feld[y][x] = player;
        }
        if(cur == "X"){
            cur = "O";
        }else if(cur == "O"){
            cur = "X";
        }
        let won = iswon(Feld);

        if(won == "X" || won == "O"){
            Feld = [
                ["", "", ""],
                ["", "", ""],
                ["", "", ""]
            ];
            cur = "X";
        }

        let Temp2 = false;

        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if(Feld[i][j] == ""){
                    Temp2 = true;
                }
            }
        }
        if(!Temp2){
            Feld = [
                ["", "", ""],
                ["", "", ""],
                ["", "", ""]
            ];
        }
    }
    

    res.send(Feld);
});

app.post("/game", (req, res) => {
    res.send(Feld);
});


app.listen(4000, () => {
    console.log("app wurde gestartet");
});