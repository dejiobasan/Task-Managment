const router = require("express").Router();
let Task = require("../Models/Task.js");
const authenticateToken = require("../Middleware/AuthenticateUser.js");

// create Task
router.route("/createTask").post((req, res) => {
  const {
    username,
    title,
    description,
    category,
    duration,
    type,
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
    Type: type,
    StartDate: Date.parse(startdate),
    DueDate: Date.parse(duedate),
    Status: status,
  });
  newTask
    .save()
    .then(() => res.json("Task Created!"))
    .catch(err => res.status(400).json("Errors: " + err));
});

// view User Tasks with middleware authentication
router.route("/myTasks/:id").get(authenticateToken, (req, res) => {
  Task.findById(req.params.id)
    .then(task => res.json(task))//.filter(task => task.id === req.params.id))
    .catch(err => res.status(400).json("Errors: " + err));
});

//update User Task
router.route("/updateTask/:id").post((req, res) => {
  Task.findById(req.params.id)
    .then(task => {
      task.Username = req.body.username;
      task.Title = req.body.title;
      task.Description = req.body.description;
      task.Category = req.body.category;
      task.Duration = req.body.duration;
      task.type = req.body.type;
      task.StartDate = Date.parse(req.body.startdate);
      task.DueDate = Date.parse(req.body.duedate);
      task.Status = req.body.status;
      task
        .save()
        .then(() => res.json("Task updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Errors: " + err));
});

//Delete User Task
router.route("/deleteTask/:id").delete((req, res) => {
  Task.findOneAndDelete(req.params.id)
    .then(() => res.json("Task Deleted!"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;