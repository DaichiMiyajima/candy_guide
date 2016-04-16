var express = require('express');
var request = require('request');
/* firebase */
var Firebase = require("firebase");
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
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
	})
	
	
	var ref = new Firebase("https://candyguide.firebaseio.com/");
	ref.authWithOAuthPopup("facebook", function(error) {
		if (error) {
			if (error.code === "TRANSPORT_UNAVAILABLE") {
				// fall-back to browser redirects, and pick up the session
				// automatically when we come back to the origin page
				ref.authWithOAuthRedirect("facebook", function(error) {
					if (error) {
						console.log("Failed again!!!!", error);
					}else{
						console.log("suceess!!!!!", error);
						res.render('index', { title: 'sucess' });
					}
				});
			}
			console.log("Login Failed!", error);
		} else {
			// We'll never get here, as the page will redirect on success.
			console.log("success");
			res.render('index', { title: 'sucess' });
			
		}
	});
	res.render('index', { title: 'bad' });
	
	
});

module.exports = router;
