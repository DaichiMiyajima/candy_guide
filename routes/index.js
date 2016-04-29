var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    /* Google Map Screen*/
    res.render('index', { title: 'bad' });
});

module.exports = router;
