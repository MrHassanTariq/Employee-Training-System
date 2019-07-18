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

courses.get("/getCourses", (req, res, next) => {
  const params = [req.query.userId];
  connection.query(
    "SELECT * FROM course WHERE course.userId =?",
    req.query.userId,
    function(err, result) {
      if (err) {
        res.json({ err: true });
        // throw err;
      } else {
        res.json(result);
      }
    }
  );
});

courses.get("/usersInCourse", (req, res, next) => {
  connection.query(
    "SELECT * from user where user.roleId = 2 AND user.id NOT IN (SELECT assignedcourse.userId from assignedcourse where assignedcourse.courseId =?)",
    req.query.courseId,
    function(err, result) {
      if (err) {
        res.json({ err: true });
      } else {
        res.json(result);
      }
    }
  );
});

courses.post("/assignCourses", (req, res, next) => {
  const paramsQuery1 = [req.body.params.courseId];
  connection.query(
    "SELECT COUNT(document.ID) as NoOfDocuments FROM document WHERE document.courseId =?",
    paramsQuery1,
    function(err, result) {
      if (err) {
        res.json({ error: true });
      } else {
        const paramsQuery2 = [
          req.body.params.userId,
          req.body.params.courseId,
          0,
          result[0].NoOfDocuments
        ];
        connection.query(
          "INSERT INTO assignedcourse (userId,courseId,completed,noOfDocuments) VALUES(?,?,?,?)",
          paramsQuery2,
          function(err, result) {
            if (err) {
              res.json({ err: true });
              // console.log(err);
            } else {
              const paramsQuery3 = [req.body.params.courseId];
              const assignedCourseId = result.insertId;
              connection.query(
                "SELECT document.id AS ID FROM Document WHERE document.courseId =?",
                paramsQuery3,
                function(err, result) {
                  if (err) {
                    res.json({ error: true });
                  } else {
                    if (result.length === 0) {
                      res.json(result);
                    } else {
                      let paramsQuery4 = [];
                      for (let i = 0; i < result.length; i++) {
                        paramsQuery4.push([assignedCourseId, 0, result[i].ID]);
                      }
                      console.log(paramsQuery4);
                      connection.query(
                        "INSERT INTO assigneddocument (assignedcourseId,completed,documentId) VALUES ?",
                        [paramsQuery4],
                        function(err, result) {
                          if (err) {
                            // res.json({ error: true });
                            console.log(err);
                          } else {
                            res.json(result);
                          }
                        }
                      );
                    }
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

module.exports = courses;
