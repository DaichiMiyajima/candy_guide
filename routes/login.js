var express = require('express');
var request = require('request');
var Firebase = require("firebase");
var router = express.Router();


/* GET home page. */
router.get('/login', function(req, res, next) {
	//ヘッダーを定義
	var headers = {
		'Content-Type':'application/json'
	}

	//オプションを定義
	var options = {
		url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCO32axBK69PMVZMgs_oPjKMltoQa4pKI4',
		method: 'POST',
		headers: headers,
		json: true
	}

	//リクエスト送信
	request(options, function (error, response, body) {
		//コールバックで色々な処理
		console.log('body::::::::::::::'+JSON.stringify(body));
	});

/* Google Map Screen*/	
res.render('login', { title: 'login' });
});
module.exports = router;
