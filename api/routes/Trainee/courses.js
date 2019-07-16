var express = require("express");
var courses = express.Router();
const cors = require("cors");

// const models = require("../models");
const connection = require("../../database/db");
courses.use(cors());

courses.get("/getCourses", (req, res, next) => {
  const params = [req.query.userId];
  connection.query(
    "SELECT course.name,course.id from course WHERE course.id IN (SELECT assignedcourse.courseId FROM assignedcourse where assignedcourse.userId =?)",
    params,
    function(err, result) {
      if (err) {
        res.json({ err: true });
      } else {
        res.json(result);
      }
    }
  );
});

module.exports = courses;
