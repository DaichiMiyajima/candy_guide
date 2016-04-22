var ref = new Firebase("https://candyguide.firebaseio.com/");
// Create a GeoFire index
var geoFire = new GeoFire(ref);
var i = 0 ;

ref.child("users").on('value', function(snapshot, prevChildKey) {
var arr = new Array();
var markers = new Array();
	navigator.geolocation.getCurrentPosition(function(position) {
		var mylatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		var mapOptions = {
				zoom: 17,
				center: mylatlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		var map = new google.maps.Map(document.getElementById("map"),mapOptions);
		snapshot.forEach(function(childSnapshot) {
			arr[i] = new Array();
			// key will be "fred" the first time and "barney" the second time
			var key = childSnapshot.key();
			// childData will be the actual contents of the child
			var childData = childSnapshot.val();
			arr[i][0] = childData.latitude;
			arr[i][1] = childData.longitude;
			arr[i][2] = childData.name;
			arr[i][3] = childData.profileimage
			i = i ; 1;
			var image = {
				url: arr[i][3],
				size: new google.maps.Size(81, 81),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(17, 34),
				scaledSize: new google.maps.Size(60, 60),
				draggable:true
			};
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(arr[i][0], arr[i][1]),
				map: map,
				icon: image,
				title: arr[i][2]
			});
		markers.push(marker);
		});
	});
});

