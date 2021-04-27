"use strict";

let express = require("express");
let bodyParser = require("body-parser");

//server
let app = express();
app.set("view engine", "ejs");
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.get("/index", (req, res) => {
    res.render("index");
});

app.listen(4000, () => {
    console.log("app wurde gestartet");
});