const router = require("express").Router();
let Task = require("../Models/Task.js");

router.route("/createTask").post((req, res) => {
  const {
    username,
    title,
    description,
    category,
    duration,
    startdate,
    duedate,
  } = req.body;
  const newTask = new Task({
    Username: username,
    Title: title,
    Description: description,
    Category: category,
    Duration: duration,
    StartDate: startdate,
    DueDate: duedate,
  });
  newTask
    .save()
    .then(() => res.json("Task Created!"))
    .catch((err) => res.status(400).json("Errors: " + err));
});

router.route("/myTasks").get((req, res) => {
  Task.find();
});
