const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(bodyParser.json());
ALLOWED_ORIGINS = ["http://localhost:3000", "http://localhost:3001"];
app.use(cors({ origin: ALLOWED_ORIGINS }));
app.use(cookieParser());
app.use(express.json());
const students = require("./routers/studentRoute");
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/students", students);

module.exports = app;
