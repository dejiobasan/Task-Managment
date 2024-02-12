const router = require("express").Router();
let Task = require("../Models/Task.js");
const authenticateToken = require("./Users.js").authenticateToken;

// create Task
router.route("/createTask").post((req, res) => {
  const {
    username,
    title,
    description,
    category,
    duration,
    startdate,
    duedate,
    status,
  } = req.body;
  const newTask = new Task({
    Username: username,
    Title: title,
    Description: description,
    Category: category,
    Duration: duration,
    StartDate: startdate,
    DueDate: duedate,
    Status: status,
  });
  newTask
    .save()
    .then(() => res.json("Task Created!"))
    .catch(err => res.status(400).json("Errors: " + err));
});

//view User Tasks with middleware authentication
router.route("/myTasks/:username", authenticateToken).get((req, res) => {
  Task.findOne(req.params.username)
    .then(task => res.json(task))
    .catch(err => res.status(400).json("Errors: " + err));
});

//update User Task
router.route("/updateTask/:username").post((req, res) => {
  Task.findOne(req.params.username)
    .then(task => {
      task.Username = req.body.username;
      task.Title = req.body.title;
      task.Description = req.body.description;
      task.Category = req.body.category;
      task.Duration = req.body.duration;
      task.StartDate = req.body.startdate;
      task.DueDate = req.body.duedate;
      task.Status = req.body.status;
      task
        .save()
        .then(() => res.json("Task updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Errors: " + err));
});

//Delete User Task
router.route("/deleteTask/:title").delete((req, res) => {
  Task.findOneAndDelete(req.params.title)
    .then(() => res.json("Task Deleted!"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;