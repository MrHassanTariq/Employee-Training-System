var express = require("express");
var roles = express.Router();
const cors = require("cors");

// const models = require("../models");
const connection = require("../database/db");
roles.use(cors());

// module.exports = roles;

roles.get("/getRoles", (req, res, next) => {
  connection.query("Select * FROM roles", function(err, result) {
    if (err) {
      console.log(err);
      res.json({ error: true });
    } else {
      res.json(result);
    }
  });
  console.log("I am here");
});

module.exports = roles;
