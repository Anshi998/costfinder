var express = require("express");
var router = express.Router();
//var fxn = require('../fxn');
// var edo=require('../edonomix.js');
var pool = require("../db");
var jwt = require("jsonwebtoken");
var jwtkey = "supersecretkey";

router.post(
  "/",
  function(req, res, next) {
    var admin = {
      admin_email: req.body.admin_email,
      admin_password: req.body.admin_password
    };
    pool.query(
      "select *  from admin where admin_email=?",
      admin.admin_email,
      function(err, result, fields) {
        if (err) {
          console.log(err);
          res.json({ success: false, msg: "something went wrong" });
        } else if (result.length == 1) {
          if (admin.admin_password === result[0].admin_password) {
            console.log("####" + result[0].admin_email);
            jwt.sign(
              { idadmib: result[0].idadmin, admin_name: result[0].admin_name },
              jwtkey,
              { expiresIn: "48h", algorithm: "HS384" },
              function(err, token) {
                if (err) {
                  console.log(err);
                  return res.json({ success: false, msg: "system failure" });
                }
                // res.cookie('token',token, {maxAge: 48*60*60*1000, httpOnly: true });
                //console.log("&&&&&&&"+token);
                //req.token = token;
                //console.log('below token')
                //console.log(token)
                res.json({
                  success: true,
                  msg: "login successful",
                  key: token,
                  idadmin: result[0].idadmin,
                  admin_name: result[0].admin_name
                });
                // next();
              }
            );
          } else {
            //wrong pass
            res.json({
              success: false,
              msg: "admin login page invalid admin name/password"
            });
          }
        } else {
          res.json({ success: false, msg: "admin login page wrong email" });
        }
      }
    );
  }
  // }
);

module.exports = router;
