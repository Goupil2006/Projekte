const express = require("express");
const router = express.Router();
const User = require("../models/user");

//get all
router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		res.status(500).json({ massage: err.massage });
	}
});
//get one
router.get("/:id", getuser, (req, res) => {
	res.json(res.user);
});
//Creating one
router.post("/", async (req, res) => {
	const user = new User({
		name: req.body.name,
		friend: req.body.friend,
	});

	try {
		const newuser = await user.save();
		res.status(201).json(newuser);
	} catch (err) {
		res.status(400).json({ massage: err.message });
	}
});
//Updating one
router.patch("/:id", getuser, async (req, res) => {
	if (req.body.name != null) {
		res.user.name = req.body.name;
	}
	if (req.body.friend != null) {
		res.user.friend = req.body.friend;
	}
	try {
		const updateuser = await res.user.save();
		res.json(updateuser);
	} catch (err) {
		res.status(400).json({ massage: err.message });
	}
});
// Deleting one
router.delete("/:id", getuser, async (req, res) => {
	try {
		await res.user.remove();
		res.json({ massage: "deleted user" });
	} catch (err) {
		res.status(500).json({ massage: err.message });
	}
});

async function getuser(req, res, next) {
	try {
		user = await User.findById(req.params.id);
		if (user == null) {
			return res.status(404).json({ message: "can not finde user" });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}

	res.user = user;
	next();
}

module.exports = router;
