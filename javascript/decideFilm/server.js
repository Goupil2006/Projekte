if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodeOverride = require("method-override");

const initializePassport = require("./passport-config.js");
initializePassport(
	passport,
	(email) => users.find((user) => user.email === email),
	(id) => users.find((user) => user.id === id)
);

let users = [];

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodeOverride("_method"));

app.get("/", checkAuthentication, (req, res) => {
	res.render("index.ejs", { name: req.user.name });
});

app.get("/login", checknotAuthentication, (req, res) => {
	res.render("login.ejs");
});

app.post(
	"/login",
	checknotAuthentication,
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/login",
		failureFlash: true,
	})
);

app.get("/register", checknotAuthentication, (req, res) => {
	res.render("register.ejs");
});

app.post("/register", checknotAuthentication, async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		users.push({
			id: Date.now().toString(),
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword,
		});
		res.redirect("/login");
	} catch {
		res.redirect("/register");
	}
	console.log(users);
});

app.delete("/logout", (req, res) => {
	req.logout();
	res.redirect("/login");
});

function checkAuthentication(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	return res.redirect("/login");
}

function checknotAuthentication(req, res, next) {
	if (req.isAuthenticated()) {
		return res.redirect("/");
	}

	return next();
}

app.listen(3000);
