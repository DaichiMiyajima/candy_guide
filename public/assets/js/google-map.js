google.maps.event.addDomListener(window, 'load', init);

function init() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			var options = {
				zoom: 17,
				center: latlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var map = new google.maps.Map(document.getElementById('map'), options);
			var image = {
				url: '/public/assets/images/thumb_160227211_1024.jpg',
				size: new google.maps.Size(101, 101),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(17, 34),
				scaledSize: new google.maps.Size(75, 75),
				draggable:true
			};
			var marker = new google.maps.Marker({
				position: latlng,
				map: map,
				title: '現在地',
				icon: image,
				labelClass: "label", // the CSS class for the label
			});
			
			infoWindow = new google.maps.InfoWindow({ // 吹き出しの追加
				content: '<div class="sample">TAM 大阪</div>' // 吹き出しに表示する内容
			});
			marker.addListener('click', function() { // マーカーをクリックしたとき
				infoWindow.open(map, marker); // 吹き出しの表示
			});

		}, function(e) {
				document.getElementById('message').innerHTML = typeof e == 'string' ? e : e.message;
			});
		} else {
			document.getElementById('message').innerHTML = 'Location APIがサポートされていません。';
	}
}
