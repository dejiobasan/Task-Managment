//jshint esversion:6

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.TaskDB, {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully!");
});

const TasksRouter = require("./Routes/Tasks");
const UsersRouter = require("./Routes/Users");

app.use("/Tasks", TasksRouter);
app.use("/Users", UsersRouter);

app.listen(port, function () {
    console.log(`server started at port ${port}.`);
});