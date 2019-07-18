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
                res.json(result);
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
