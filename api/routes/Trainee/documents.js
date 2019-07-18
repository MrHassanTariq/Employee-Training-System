var express = require("express");
var documents = express.Router();
const cors = require("cors");

// const models = require("../models");
const connection = require("../../database/db");
documents.use(cors());

documents.get("/getDocuments", (req, res, next) => {
  const params = [req.query.userId, req.query.courseId];
  connection.query(
    "SELECT document.id,document.name FROM document where document.id IN (SELECT assigneddocument.DocumentId FROM assigneddocument where assigneddocument.assignedcourseId IN (SELECT id from assignedcourse where assignedcourse.userId = ? AND assignedcourse.courseId = ?))",
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
  const params = [
    req.body.documentId,
    parseInt(req.body.userId),
    parseInt(req.body.courseId)
  ];
  console.log(params);
  connection.query(
    "UPDATE assigneddocument SET completed = 1 WHERE assigneddocument.DocumentId = ? AND assigneddocument.assignedcourseId IN (SELECT assignedcourse.id FROM assignedcourse where assignedcourse.userId = ? AND assignedcourse.courseId = ?)",
    params,
    function(err, result) {
      if (err) {
        throw err;
      } else {
        res.json(result);
      }
    }
  );
});

module.exports = documents;
