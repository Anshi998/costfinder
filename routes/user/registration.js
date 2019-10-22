// const express = require("express");
// const crypto = require("crypto");
// const dotenv = require("dotenv");
// const pool = require("../db");
// dotenv.config();

// const router = express.Router();

// router.post("/", (req, res) => {
//   if (req.body.password !== req.body.confirm) {
//     return res.json({ msg: "Password do not match" });
//   }
//   let key = crypto.pbkdf2Sync(req.body.password, "salt", 10, 10, "sha512");
//   let password = key.toString("hex");

//   let userexist = `SELECT count(email) as count from user where email='${req.body.email}'`;
//   let userquery = pool.query(userexist, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     if (result[0].count >= 1) {
//       return res.json({
//         msg: "Email already exists"
//       });
//     } else {
//       let { username, email } = req.body;
//       let adduserpost = {
//         admin_name: username,
//         admin_email: email,
//         admin_password: password,
//       };
//       let sql = "INSERT INTO admin SET ?";
//       let query = pool.query(sql, adduserpost, (err, result) => {
//         if (err) {
//           console.log(err);
//         }

//         res.status(200).json({ msg: "User created Successfully" });
//       });
//     }
//   });
// });

// module.exports = router;


//email is unique constraint

var express = require('express');
var router = express.Router();
//var func = require('../func.js');
//var edo=require('../edonomix.js');
var pool = require('../db');

// router.get('/',func.auth,function(req, res, next) 
// {
// 	res.json({"success":true,'msg':'add admin page'});     
// });

router.post('/', function (req, res, next) {

  // email is required baki he
  //  console.log(req.body);
  //   req.check('user_name',' user_name should be more than 2 and less than 100 character').isLength({min:2,max:100});
  //   req.check('user_password',' user_password should be more than 2 and less than 100 character').isLength({min:2,max:100});
  //   req.check('user_contactNumber',' user_contactNumber should be more than 2 and less than 100 character').isLength({min:2,max:100});
  //   req.check('user_email',' user_email should be more than 2 and less than 100 character').isEmail().isLength({min:2,max:100});
  //req.check('mobile1',' mobile should be 10 digit').isLength({min:10,max:10}).isInt();
  //req.check('mobile2',' alternate mobile number should be 10 digit ').optional({checkFalsy:true}).isLength({min:10,max:10}).isInt();
  // var verrs=req.validationErrors();
  // if(verrs)
  // {
  // 	res.json({ success:false,msg: verrs[0].msg,});
  // 	}
  // else
  {
    var admin =
    {
      admin_name: req.body.admin_name,
      admin_password: req.body.admin_password,
     // user_role: req.body.user_role,
      admin_email: req.body.admin_email,
     // user_contactNumber: req.body.user_contactNumber,
    };
    pool.query("select idadmin from admin where admin_email=?", admin.admin_email, function (err, result, fields) {
      if (err) {
        console.log(err);
        res.json({ 'success': false, msg: 'something went wrong' });
      }
      else if (result.length == 0) {
        var sql = "Insert into admin SET ? ;";
        pool.query(sql, admin, function (err, result) {
          if (err) {
            console.log(sql, err);
            res.json({ success: false, msg: 'something went wrong', });
          }
          else {
            res.json({ success: true, msg: 'succesful entry', });
          }
        });
      }
      else {
        res.json({ success: false, msg: 'email is not allowed/already registered' });
      }
    });

  }
});


module.exports = router;