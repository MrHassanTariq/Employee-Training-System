var express = require("express");
var documents = express.Router();
const cors = require("cors");

// const models = require("../models");
const connection = require("../database/db");
documents.use(cors());

documents.post("/getDocuments", (req, res, next) => {
  connection.query(
    "SELECT * FROM Documents where courseId =",
    req.body.courseId,
    function(err, results, fields) {
      console.log(results);
    }
  );
});

documents.get("/getDocument", (req, res, next) => {
  connection.query(
    "SELECT * FROM document WHERE id = 1 AND id IN (SELECT DocumentId FROM assigneddocument where assignedcourseId = 1)",
    function(err, result) {
      if (err) {
        console.log(err);
        res.json({ error: true });
      } else {
        console.log(result);
        res.json(result);
      }
    }
  );
});

module.exports = documents;
