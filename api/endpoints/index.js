var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var cors = require('cors');

router.use(bodyParser.json())
router.use(cors());

router.use('/users/',require('./users'));
router.use('/apartments/',require('./apartments'));
router.use('/reservations/',require('./reservations'));

module.exports = router;