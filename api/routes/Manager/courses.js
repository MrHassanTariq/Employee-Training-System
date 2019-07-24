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
        // console.log(result);
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
                console.log(err);
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
        // console.log(result);
      }
    }
  );
});

//Query to assign courses to Trainees
courses.post("/assignCourses", (req, res, next) => {
  const paramsQuery1 = [req.body.params.courseId];

  //Count the Number of documents of the selected course to be inserted in course table
  connection.query(
    "SELECT COUNT(document.ID) as NoOfDocuments FROM document WHERE document.courseId =?",
    paramsQuery1,
    function(err, result) {
      if (err) {
        res.json({ error: true });
      } else {
        let paramsQuery2 = [];
        const selectedusers = req.body.params.selectedUsers; //Users selected by manager
        const NoOfDocuments = result[0].NoOfDocuments; //Number Of Documents
        //Creating values for BULK Insert in assignedCourse Table for each User
        for (let i = 0; i < selectedusers.length; i++) {
          paramsQuery2.push([
            selectedusers[i].value,
            req.body.params.courseId,
            0,
            NoOfDocuments,
            null
          ]);
        }
        //Inserting all the students in assignedCourse table
        connection.query(
          "INSERT INTO assignedcourse (userId,courseId,completed,noOfDocuments,completedOn) VALUES ?",
          [paramsQuery2],
          function(err, result) {
            if (err) {
              res.json({ err: true });
              // console.log(err);
            } else {
              //Getting all the inserted Ids in the last query
              connection.query(
                `SELECT id FROM (SELECT * FROM assignedcourse ORDER By id DESC LIMIT ${
                  selectedusers.length
                } ) AS AC Order BY id ASC`,
                function(err, result) {
                  if (err) {
                    res.json({ err: true });
                  } else {
                    const paramsQuery3 = [req.body.params.courseId];
                    const NumberOfInsertedIds = result.length; //Number of IDs courses assigned in last query
                    console.log("NumberOfInsertedIds", NumberOfInsertedIds);
                    const InsertedIds = result; //Saving all IDs inserted in last query
                    //selecting all documents of that particular course
                    connection.query(
                      "SELECT document.id AS ID FROM Document WHERE document.courseId =?",
                      paramsQuery3,
                      function(err, result) {
                        if (err) {
                          res.json({ error: true });
                          // console.log(err);
                        } else {
                          if (result.length === 0) {
                            res.json(result);
                          } else {
                            //creating bulk values tobe inserted in assignedDocument table(assigning each fetched document to all the users)
                            let paramsQuery4 = [];
                            for (let j = 0; j < NumberOfInsertedIds; j++) {
                              for (let i = 0; i < result.length; i++) {
                                paramsQuery4.push([
                                  InsertedIds[j].id,
                                  0,
                                  result[i].ID
                                ]);
                              }
                            }
                            //Finally runinng the last nested query to assign all documents to all users
                            console.log("Patrameters", [paramsQuery4]);
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
