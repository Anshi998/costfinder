var express = require('express');
var router = express.Router();
var pool = require('../db');


router.post('/', function (req, res, next) {

var costfinder = 
{
     costfinder_name : req.body.costfinder_name,
     costfinder_email : req.body.costfinder_email,
     costfinder_contact : req.body.costfinder_contact
}
    var sql = "Insert into costfinder SET ? ;";
    pool.query(sql, costfinder, function (err, result) {
        if (err) {
            console.log(sql, err);
            res.json({ success: false, msg: 'something went wrong', });
        }
        else {
            res.json({ success: true, msg: 'succesful entry', });
        }
    });
})
    



module.exports = router;