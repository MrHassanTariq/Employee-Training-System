var express = require("express");
var courses = express.Router();
const cors = require("cors");

// const models = require("../models");
const connection = require("../../database/db");
courses.use(cors());

courses.get("/getCourses", (req, res, next) => {
  let today = new Date();
  const params = [today, req.query.userId];
  connection.query(
    `SELECT course.name,course.id from course WHERE course.endDate > ? AND course.id IN (SELECT assignedcourse.courseId FROM assignedcourse where assignedcourse.completed = 0 AND assignedcourse.userId =?)`,
    params,
    function(err, result) {
      if (err) {
        // console.log(err);
        res.json({ err: true });
      } else {
        res.json(result);
      }
    }
  );
});

module.exports = courses;
