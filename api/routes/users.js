var express = require("express");
var users = express.Router();
const cors = require("cors");

const connection = require("../database/db");
// const connection = new Database();
users.use(cors());

users.post("/register", (req, res, err) => {
  connection.query(
    "SELECT * FROM user where user.email = ?",
    [req.body.email],
    function(err, result) {
      if (err) {
        res.json({ err: true });
      } else {
        if (result.length !== 0) {
          res.json({ status: "User Exists" });
        } else {
          connection.query(
            "INSERT INTO User (email,name,password,roleId) VALUES (?,?,?,?)",
            [req.body.email, req.body.name, req.body.password, req.body.roleId],
            function(err, result, fields) {
              if (err) throw err;
              else {
                // res.append("userid", result.insertId);
                res.json(result);
                // console.log(result.insertId);
              }
            }
          );
        }
      }
    }
  );
});

users.post("/login", (req, res, err) => {
  console.log(req.body.email, req.body.password);
  const params = [req.body.email, req.body.password];
  connection.query(
    "SELECT role.name AS RoleName,user.id,user.name AS UserName from user LEFT JOIN Role ON user.roleId = role.id WHERE user.email =? AND Password =?",
    params,
    function(err, result, fields) {
      if (err) throw err;
      res.json(result);
      // console.log(result);
    }
  );
});

users.post("/home", (req, res, err) => {
  console.log("I am here");
});

module.exports = users;
