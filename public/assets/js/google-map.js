google.maps.event.addDomListener(window, 'load', init);

var ref = new Firebase("https://candyguide.firebaseio.com/");
function init() {
	// Get a database reference to our posts
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			var options = {
				zoom: 17,
				center: latlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var map = new google.maps.Map(document.getElementById('map'), options);
		}, function(e) {
				document.getElementById('message').innerHTML = typeof e == 'string' ? e : e.message;
			});
		} else {
			document.getElementById('message').innerHTML = 'Location APIがサポートされていません。';
		}
}
