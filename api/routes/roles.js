var express = require("express");
var roles = express.Router();
const cors = require("cors");

const models = require("../models");
roles.use(cors());

roles.get("/getRoles", (req, res, next) => {
  models.Role.findAll({ attributes: ["id", "name"] }).then(result =>
    res.json(result)
  );
});

module.exports = roles;
