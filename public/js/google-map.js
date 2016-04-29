google.maps.event.addDomListener(window, 'load', init);


var ref = new Firebase("https://candyguide.firebaseio.com/");
var map;
var yourlatitude ;
var yourlongtitude ;


function init() {
// Get a database reference to our posts
ref.child("users").once('value', function(snapshot, prevChildKey) {
console.log("value");
var arr = new Array();
var markers = new Array();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        yourlatitude = position.coords.latitude;
        yourlongtitude = position.coords.longitude;
        var mylatlng = new google.maps.LatLng(yourlatitude, yourlongtitude);
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
                    icon: createMarker(arr[i][3]),
                    title: arr[i][2]
                });
            markers.push(marker);
            });
            /*
            var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var options = {
                zoom: 17,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(document.getElementById('map'), options);
            */
            //Monitor location
            watchID = navigator.geolocation.watchPosition(onSuccess, onError);
        }, function(e) {
                document.getElementById('message').innerHTML = typeof e == 'string' ? e : e.message;
            });
    } else {
        document.getElementById('message').innerHTML = 'Location APIがサポートされていません。';
    }
});
}

// onSuccess Geolocation
function onSuccess(position) {
        //console.log("latitude:"+position.coords.latitude);
        console.log("onsuccess:");
        //alert(position.coords.latitude);
        yourlatitude = position.coords.latitude;
        yourlongtitude = position.coords.longitude;
        var authData = ref.getAuth();
        var usersRef = ref.child("users").child(authData.uid);
        usersRef.update({
            latitude:position.coords.latitude,
            longitude:position.coords.longitude,
        });
        //console.log(map);
}

// エラー時のコールバック関数は PositionError オブジェクトを受けとる
function onError(error) {
    alert('コード: '        + error.code    + '\n' +
            'メッセージ: '    + error.message + '\n');
}


var i = 0 ;
ref.child("users").on('value', function(snapshot, prevChildKey) {
console.log("value");
var arr = new Array();
var markers = new Array();
        
    if (navigator.geolocation && !yourlatitude && !yourlongtitude) {
        navigator.geolocation.getCurrentPosition(function(position) {
        console.log("true");
            var mylatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        });
    }else{
        console.log("false");
        var mylatlng = new google.maps.LatLng(yourlatitude, yourlongtitude);
    }
    console.log("latitude:"+yourlatitude);
    console.log("longitude:"+yourlongtitude);
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
                    icon: createMarker(arr[i][3]),
                    title: arr[i][2]
                });
            markers.push(marker);
            });
});


function createMarker(imagepath) {
    var bg = document.createElement("canvas");
    bg.width = 200;
    bg.height = 200;
    var bgCtx = bg.getContext("2d");
    /* 黒枠の作成*/
    bgCtx.beginPath();
    bgCtx.fillStyle = "black";
    bgCtx.fillRect(73,135,54,54);
    bgCtx.fill();
    bgCtx.stroke();
    /* 線の作成*/
    bgCtx.beginPath();
    bgCtx.moveTo(100,200);
    bgCtx.lineTo(95,177);
    bgCtx.moveTo(100,200);
    bgCtx.lineTo(105,177);
    bgCtx.stroke();

    /* attach image to bg canvas */ 
    var img =new Image();
    img.crossOrigin = "Anonymous";
    img.src = imagepath;
    
    bgCtx.drawImage(img, 75, 137,50,50);
    return bg.toDataURL();

}