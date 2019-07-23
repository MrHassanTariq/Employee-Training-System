var express = require("express");
var courses = express.Router();
const cors = require("cors");

const connection = require("../../database/db");
courses.use(cors());

courses.get("/getCourses", (req, res, next) => {
  connection.query("SELECT * FROM Course", function(err, result) {
    if (err) {
      res.json({ err: true });
    } else {
      res.json(result);
    }
  });
});

module.exports = courses;
