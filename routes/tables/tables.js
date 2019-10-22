var express = require('express');
var router = express.Router();

var addcontact = require('./addcontact');
router.use('/addcontact', addcontact)

var addcostfinder = require('./addcostfinder');
router.use('/addcostfinder', addcostfinder)

var addhelp = require('./addhelp');
router.use('/addhelp',addhelp)

var contact = require('./contact');
router.use('/contact', contact)

var help = require('./help');
router.use('/help', help)

var costfinder = require('./costfinder');
router.use('/costfinder', costfinder)

module.exports = router;