// var express = require('express');
// var router = express.Router();
// //var fxn=require('../fxn');
// var mw=require('../mw');
// var pool = require('../db');
// var my_validator = require('../my_validator');

// router.get('/',/* mw.auth,*/ (req, res, next) => {
//     let gethelpQuery = `SELECT * FROM help;`;

//     pool.query(gethelpQuery)
//         .then((result) => {
//             if (result.length >= 0) {
//                 res.status(200).json({ success: true, "Help": result });
//             }
//             else {
//                 res.status(200).json({ success: true, "msg": "No records found" });
//             }
//         })
//         .catch(err => { fxn.handleError(err, 'server err', req, res) })

// });

// module.exports = router;

var express = require('express');
var router = express.Router();
// var func = require('../func.js');
// var edo = require('../edonomix.js');
var mw = require('../mw');
var pool = require('../db');


// func.auth2
router.get('/', mw.auth, function (req, res, next) {
    // pool.getConnection(function(err,con)
    // {
    //   if (err) {
    //     res.json({'success':false,'msg':'db connection failed'});
    //   } 
    //   else{
    pool.query("select * from costfinder", function (err, costfinderresult, fields) {
        // con.release();
        // con.releaseConnection();
        if (err) {
            console.log(err);
            res.json({ 'success': false, 'msg': 'something went wrong' });
        }
        // else if(result.length==0)
        // {
        //   res.json({"success":true,'msg':'Data Not Available'});
        // }
        else {
            res.json({ "success": true, 'msg': 'all help list ', 'categorydata': costfinderresult });
        }
    });
    // }               
    // });
});


module.exports = router;