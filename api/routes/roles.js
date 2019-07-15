var express = require("express");
var roles = express.Router();
const cors = require("cors");

// const models = require("../models");
const connection = require("../database/db");
// const connection = new Database();
roles.use(cors());

// module.exports = roles;

roles.get("/getRoles", (req, res, next) => {
  connection.query("Select * FROM role", function(err, result) {
    if (err) {
      console.log(err);
      res.json({ error: true });
    } else {
      res.json(result);
    }
  });
});

module.exports = roles;
