var express = require("express");
var documents = express.Router();
const cors = require("cors");

// const models = require("../models");
const connection = require("../../database/db");
documents.use(cors());

documents.get("/getDocuments", (req, res, next) => {
  const params = [req.query.userId, req.query.courseId];
  console.log(params);
  connection.query(
    "SELECT document.id,document.name FROM document where document.id IN (SELECT assigneddocument.DocumentId FROM assigneddocument where assigneddocument.completed=0 AND assigneddocument.assignedcourseId IN (SELECT id from assignedcourse where assignedcourse.userId = ? AND assignedcourse.courseId = ?))",
    params,
    function(err, result) {
      if (err) {
        // console.log(err);
        res.json({ err: true });
      } else {
        // console.log(result);
        res.json(result);
      }
    }
  );
});

documents.get("/selectedDocument", (req, res, next) => {
  const params = [req.query.documentId];
  connection.query(
    "SELECT * FROM Document where document.id=?",
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

documents.post("/markComplete", (req, res, next) => {
  const paramsQuery1 = [
    req.body.documentId,
    parseInt(req.body.userId),
    parseInt(req.body.courseId)
  ];
  connection.query(
    "UPDATE assigneddocument SET completed = 1 WHERE assigneddocument.DocumentId = ? AND assigneddocument.assignedcourseId IN (SELECT assignedcourse.id FROM assignedcourse where assignedcourse.userId = ? AND assignedcourse.courseId = ?)",
    paramsQuery1,
    function(err, result) {
      if (err) {
        // console.log(err);
        res.json({ err: true });
      } else {
        const paramsQuery2 = [
          parseInt(req.body.userId),
          parseInt(req.body.courseId)
        ];
        connection.query(
          "SELECT Count(assigneddocument.id) as CompletedDocuments from assigneddocument WHERE assigneddocument.completed =1 AND assigneddocument.assignedcourseId IN (SELECT assignedcourse.id FROM assignedcourse where assignedcourse.userId = ? AND assignedcourse.courseId = ?)",
          paramsQuery2,
          function(err, result) {
            if (err) {
              // res.json({ err: true });
              console.log(err);
            } else {
              const completedDocuments = result[0].CompletedDocuments;
              const paramsQuery3 = paramsQuery2;
              connection.query(
                "SELECT assignedcourse.noOfDocuments as noOfDocuments from assignedcourse where assignedcourse.userId = ? and assignedcourse.courseId =?",
                paramsQuery3,
                function(err, result) {
                  if (err) {
                    // console.log(err);
                    res.json({ err: true });
                  } else {
                    console.log(completedDocuments, result[0].noOfDocuments);
                    if (completedDocuments === result[0].noOfDocuments) {
                      const today = new Date();
                      console.log([today, req.body.userId, req.body.courseId]);
                      connection.query(
                        `UPDATE assignedcourse SET assignedcourse.completed = 1 , completedOn = ? where assignedcourse.userId = ? AND assignedcourse.courseId = ?`,
                        [today, req.body.userId, req.body.courseId],
                        function(err, result) {
                          if (err) {
                            res.json({ err: true });
                            // console.log(err);
                          } else {
                            res.json(result);
                            // console.log(result);
                          }
                        }
                      );
                    } else {
                      res.json(true);
                    }
                  }
                }
              );
            }
          }
        );
        // res.json(result);
        console.log(result);
      }
    }
  );
});

module.exports = documents;
