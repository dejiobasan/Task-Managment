const router = require("express").Router();
let User = require("../Models/User.js");
const bcrypt = require("bcrypt");

router.route("/CreateUser").post((req, res) => {
  const { username, password } = req.body;
  const saltRounds = process.env.saltRounds;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    const newUser = new User({
      Username: username,
      Password: hash,
    });

    if (err) {
      console.error(err);
    } else {
      newUser
        .save()
        .then(() => {
          res.json("User Created Successfully!");
        })
        .catch((err) => res.status(400).json("Error: " + err));
    }
  });
});

module.exports = router;