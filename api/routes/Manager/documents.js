var express = require("express");
var documents = express.Router();
const cors = require("cors");

// const models = require("../models");
const connection = require("../../database/db");
documents.use(cors());

documents.post("/addDocument", (req, res, next) => {
  const paramsQuery1 = [req.body.params.documentName, req.body.params.courseId];
  connection.query(
    "SELECT * FROM Document WHERE document.name =? AND document.courseId =?",
    paramsQuery1,
    function(err, result) {
      if (err) {
        res.json({ err: true });
      } else {
        if (result.length === 0) {
          const paramsQuery2 = [
            req.body.params.courseId,
            req.body.params.documentName,
            req.body.params.documentDescription
          ];
          connection.query(
            "INSERT INTO document (courseId,name,description) VALUES(?,?,?)",
            paramsQuery2,
            function(err, result) {
              if (err) {
                console.log(err);
                // res.json({ err: true });
              } else {
                // console.log(result);
                const documentId = result.insertId;
                connection.query(
                  "SELECT assignedcourse.userId AS UserId,assignedcourse.id AS AssignedcourseId FROM assignedcourse WHERE assignedcourse.courseId =?",
                  [req.body.params.courseId],
                  function(err, result) {
                    if (err) {
                      res.json({ err: true });
                      console.log(err);
                    } else {
                      if (result.length !== 0) {
                        NoOfTarineeInThisCourse = result.length;
                        let paramsQuery4 = [];
                        const AssignedcourseId = result;
                        console.log(
                          "Here",
                          AssignedcourseId[0].AssignedcourseId
                        );
                        connection.query(
                          "UPDATE assignedcourse SET assignedcourse.noOfDocuments = assignedcourse.noOfDocuments + 1  WHERE assignedcourse.courseId =?",
                          [req.body.params.courseId],
                          function(err, result) {
                            if (err) {
                              console.log(err);
                              res.json({ err: true });
                            } else {
                              // console.log(result);
                              for (
                                let i = 0;
                                i < NoOfTarineeInThisCourse;
                                i++
                              ) {
                                paramsQuery4.push([
                                  AssignedcourseId[i].AssignedcourseId,
                                  documentId,
                                  0
                                ]);
                              }
                              console.log(paramsQuery4);
                              connection.query(
                                "INSERT INTO assigneddocument (assignedcourseId,DocumentId,completed) VALUES ?",
                                [paramsQuery4],
                                function(err, result) {
                                  if (err) {
                                    // res.json({ err: true });
                                    console.log(err);
                                  } else {
                                    res.json(result);
                                  }
                                }
                              );
                            }
                          }
                        );
                      } else {
                        res.json({ err: true });
                      }
                    }
                  }
                );
              }
            }
          );
        } else {
          res.json(true);
        }
        // res.json(result);
      }
    }
  );
});

module.exports = documents;
