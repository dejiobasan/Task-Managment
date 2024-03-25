const router = require("express").Router();
let User = require("../Models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


//Create a User
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

//User Login
router.route("/Login").post((req, res) => {
  const { username, password } = req.body;

  User.findOne({ Username: username }).then((user) => {
    if(!user) {
        console.error("User not found!");
        res.status(401).json({
            message: "Login failed!"
        });
    } else {
        bcrypt.compare(password, user.Password, (err, result) => {
            if (err) {
                console.error(err);
                res.status(401).json({ 
                    message: "Login failed!" 
                });
            } else if (result) {
                const token = jwt.sign({ user: user.Username}, process.env.jwtSecret, {
                    expiresIn: process.env.JWT_expires_in,
                });
                res.status(200).json({
                    token: token,
                    success: true,
                    message: "Login successful",
                });
            } else {
                res.status(401).json({
                    message: "Login failed!"
                });
            }
        })
    }
  }).catch(err => {
    console.error(err);
    res.status(401).json({
        message: "Login failed!"
    });
  });
});

//middleware
function authenticateToken(req, res, next) {
  const authHeader = req.header['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.status(401).send('No token provided')
  
  jwt.verify(token, process.env.jwtSecret, (err, user) => {
    if(err) return res.sendStatus(403)
    req.user = user;
    next()
  });
};



module.exports = {router, authenticateToken};
