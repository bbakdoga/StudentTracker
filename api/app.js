var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var errorHandler = require("./error/error_handler");

var logger = require("morgan");

global.__basedir = __dirname;

// User Specific Routes
var usersRouter = require("./routes/users");
// Non User Specific Routes
var router = require("./routes/routes");
const { dirname } = require("path");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/", router);


app.use(errorHandler);

module.exports = app;
