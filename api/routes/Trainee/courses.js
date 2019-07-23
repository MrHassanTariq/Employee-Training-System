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
    `SELECT course.name,course.id,course.endDate from course WHERE course.endDate > ? AND course.id IN (SELECT assignedcourse.courseId FROM assignedcourse where assignedcourse.completed = 0 AND assignedcourse.userId =?)`,
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

courses.get("/getDetails", (req, res, next) => {
  const userId = req.query.userId;
  connection.query(
    "SELECT COUNT(*) AS NumberOfCourses FROM assignedcourse LEFT JOIN Course ON assignedcourse.courseId = Course.id WHERE assignedcourse.userId =?",
    [userId],
    function(err, result) {
      if (err) {
        res.json({ err: true });
      } else {
        var NumberOfCourses = result[0].NumberOfCourses;
        connection.query(
          "SELECT COUNT(*) AS CompletedCourses FROM assignedcourse LEFT JOIN Course ON assignedcourse.courseId = Course.id WHERE assignedcourse.completed = 1 AND assignedcourse.userId =?",
          [userId],
          function(err, result) {
            if (err) {
              res.json({ err: true });
            } else {
              var CompletedCourses = result[0].CompletedCourses;
              res.json({
                NumberOfCourses: NumberOfCourses,
                CompletedCourses: CompletedCourses
              });
            }
          }
        );
      }
    }
  );
});

courses.get("/getAllCourses", (req, res, next) => {
  const params = [req.query.userId];
  console.log(params);
  connection.query(
    "SELECT * FROM assignedcourse LEFT JOIN Course ON assignedcourse.courseId = Course.id WHERE assignedcourse.userId =? AND assignedcourse.completed =0",
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
