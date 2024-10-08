const mongoose = require("mongoose");

const TasksSchema = new mongoose.Schema({
    Username: {type: String, required: true},
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    Category: {type: String, required: true},
    Duration: {type: Number, required: true},
    Type: {type: String, required: true},
    StartDate: {type: Date, required: true},
    DueDate: {type: Date, required: true},
    Status: {type: String, required: true}
}, {
    timestamps: true
});

const Task = new mongoose.model("Task", TasksSchema);

module.exports = Task;