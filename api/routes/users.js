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

users.post("/login", (req, res, err) => {
  console.log(req.body.email, req.body.password);
  const params = [req.body.email, req.body.password];
  connection.query(
    "SELECT role.name from user LEFT JOIN Role ON user.roleId = role.id WHERE user.email =? AND Password =?",
    params,
    function(err, result, fields) {
      if (err) console.log(err);
      res.json(result);
    }
  );
});

users.post("/home", (req, res, err) => {
  console.log("I am here");
});

module.exports = users;
