var express = require('express');
var router = express.Router();
var pool = require('../db');

router.post('/', function (req, res, next) {
    
    var help_name = req.body.help_name;
    var help_email = req.body.help_email;
    var help_number = req.body.help_number;
    var help_room = req.body.help_room;
    var help_bathroom = req.body.help_bathroom;
    var help_area = req.body.help_area;


    var sqlQuery = `insert into help(help_name,help_email,help_number,help_room,help_bathroom,help_area) values ('${help_name}','${help_email}','${help_number}','${help_room}','${help_bathroom}','${help_area}')`;
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
