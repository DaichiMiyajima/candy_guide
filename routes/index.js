var express = require('express');
var request = require('request');
var Firebase = require("firebase");
var ref = new Firebase("https://candyguide.firebaseio.com");
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {

	var authData = ref.getAuth();
	console.log("authData(index):"+authData);
	//console.log("authData(req):"+req);

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
		//console.log('body::::::::::::::'+JSON.stringify(body));
	});

	/* Google Map Screen*/	
	res.render('index', { title: 'bad' });
});

module.exports = router;
