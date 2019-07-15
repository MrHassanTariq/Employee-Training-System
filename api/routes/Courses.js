var express = require("express");
var courses = express.Router();
const cors = require("cors");

// const models = require("../models");
const connection = require("../database/db");
courses.use(cors());

// module.exports = roles;

courses.get("/getCourses", (req, res, next) => {
  connection.query("Select * FROM course", function(err, result) {
    if (err) {
      console.log(err);
      res.json({ error: true });
    } else {
      res.json(result);
    }
  });
});

courses.post("/getDocuments", (req, res, next) => {
  console.log(req.body);
  connection.query(
    "SELECT * FROM Documents where courseId =",
    req.body.courseId,
    function(err, results, fields) {
      console.log(results);
    }
  );
});

module.exports = courses;
