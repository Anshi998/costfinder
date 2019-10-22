var express = require("express");
var router = express.Router();
//user
var user = require("./user/user");
router.use("/user", user);

var tables = require("./tables/tables");
router.use("/tables", tables);

module.exports = router;
