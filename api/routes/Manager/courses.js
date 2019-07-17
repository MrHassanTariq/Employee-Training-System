var express = require("express");
var courses = express.Router();
const cors = require("cors");

// const models = require("../models");
const connection = require("../../database/db");
courses.use(cors());

courses.post("/createCourse", (req, res, next) => {
  const params = [
    req.body.params.courseName,
    req.body.params.userId,
    req.body.params.endDate
  ];

  connection.query(
    "INSERT INTO course (name,userId,endDate) VALUES(?,?,?)",
    params,
    function(err, result) {
      if (err) {
        res.json({ error: true });
      } else {
        res.json(result);
      }
    }
  );
});

module.exports = courses;
