var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/login', function(req, res, next) {
	/* Google Map Screen*/	
	res.render('login', { title: 'login' });
});
module.exports = router;
