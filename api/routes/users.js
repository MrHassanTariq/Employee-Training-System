var express = require("express");
var users = express.Router();
const cors = require("cors");

const connection = require("../database/db");
// const connection = new Database();
users.use(cors());

users.post("/register", (req, res, err) => {
  connection.query(
    "INSERT INTO User (email,name,password,roleId) VALUES (?,?,?,?)",
    [req.body.email, req.body.name, req.body.password, req.body.roleId],
    function(err, result, fields) {
      if (err) throw err;
      res.json(result);
    }
  );
});
module.exports = users;
