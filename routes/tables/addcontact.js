var express = require('express');
var router = express.Router();
var pool = require('../db');
//var fxn=require('../fxn');
//var my_validator = require('../my_validator');
var mw = require('../mw');
//var permission=require('../permissions.json');

router.post('/', function(req, res, next) {
    var contact_name = req.body.contact_name;
    var contact_email = req.body.contact_email;
    var contact_number = req.body.contact_number;
    var contact_subject = req.body.contact_subject;
    var contact_message = req.body.contact_message;
  //  var activity_mail = req.body.activity_mail;
  //  var user_id = req.decoded.user_id

    

    var sqlQuery = `insert into contactUs(contact_name,contact_email,contact_number,contact_subject,contact_msg) values ('${contact_name}','${contact_email}','${contact_number}','${contact_subject}','${contact_message}')`;
    pool.query(sqlQuery, function (err, result) {
        if (err) {
            console.log(sqlQuery, err);
            res.json({ success: false, msg: 'something went wrong', });
        }
        else {
            res.json({ success: true, msg: 'succesful entry', });
        }
    });
})
  

module.exports = router;
