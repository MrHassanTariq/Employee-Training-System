var express = require("express");
var courses = express.Router();
const cors = require("cors");

// const models = require("../models");
const connection = require("../../database/db");
courses.use(cors());

courses.post("/createCourse", (req, res, next) => {
  // console.log("Here");
  connection.query(
    "SELECT * FROM course where course.name =?",
    req.body.params.courseName,
    function(err, result) {
      if (err) {
        // console.log(err);
        res.json({ err: true });
      } else {
        console.log(result);
        if (result.length === 0) {
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
        } else {
          console.log("Here");
          res.json({ status: "Course Exists" });
        }
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

courses.get("/getCourseDetails", (req, res, next) => {
  const params = [req.query.courseId];
  connection.query(
    "SELECT user.name,user.email,assignedcourse.completedOn,assignedcourse.completed from User JOIN assignedcourse ON user.id = assignedcourse.userId where assignedcourse.courseId =?",
    params,
    function(err, result) {
      if (err) {
        console.log(err);
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
        const today = new Date();
        const paramsQuery2 = [
          req.body.params.userId,
          req.body.params.courseId,
          0,
          result[0].NoOfDocuments
        ];
        connection.query(
          "INSERT INTO assignedcourse (userId,courseId,completed,noOfDocuments,completedOn) VALUES(?,?,?,?,null)",
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

courses.get("/getDetails", (req, res, next) => {
  const userId = req.query.userId;
  connection.query(
    "SELECT COUNT(*) AS NumberOfCourses FROM Course WHERE Course.userId =?",
    [userId],
    function(err, result) {
      if (err) {
        res.json({ err: true });
      } else {
        var NumberOfCourses = result[0].NumberOfCourses;
        connection.query(
          "SELECT COUNT(*) AS CompletedCourses FROM assignedcourse LEFT JOIN Course ON assignedcourse.courseId = Course.id WHERE assignedCourse.completed = 1 AND course.userId =?",
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

module.exports = courses;
