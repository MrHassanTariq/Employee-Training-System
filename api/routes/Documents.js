var express = require("express");
var documents = express.Router();
const cors = require("cors");

// const models = require("../models");
const connection = require("../database/db");
documents.use(cors());

documents.get("/getDocument", (req, res, next) => {
  const params = [req.body.userId, req.body.courseId];
  connection.query(
    "SELECT * FROM document where document.id IN (SELECT assigneddocument.DocumentId FROM assigneddocument where assigneddocument.assignedcourseId IN (SELECT id from assignedcourse where assignedcourse.userId = ? AND assignedcourse.courseId = ?))",
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
