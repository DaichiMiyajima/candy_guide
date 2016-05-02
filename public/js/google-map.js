google.maps.event.addDomListener(window, 'load', init);

// Firebase
var ref = new Firebase("https://candyguide.firebaseio.com/");
// Create a GeoFire index
var geoFire = new GeoFire(ref);
var googlemap;
var markers = new Array();

/* When loading screen */
function init() {
    var authData = ref.getAuth();
    var usersRef = ref.child("users").child(authData.uid);
    if (!authData) {
        window.location.href = "./login" ;
    }
    // Get a database reference to our posts
    ref.child("users").once('value', function(snapshot, prevChildKey) {
          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(function(position) {
                  var mylatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                  //user update
                  usersRef.update({
                      latitude:position.coords.latitude,
                      longitude:position.coords.longitude,
                  });
                  
                  var mapOptions = {
                      zoom: 17,
                      center: mylatlng,
                      mapTypeId: google.maps.MapTypeId.ROADMAP
                  }
                  googlemap = new google.maps.Map(document.getElementById("map"),mapOptions);
                  snapshot.forEach(function(childSnapshot) {
                      var childData = childSnapshot.val();
                      createMarker(childData.latitude, childData.longitude, childData.name, childData.profileimage, childSnapshot.key(), googlemap, markercreate);
                  });
                  //Monitor location
                  watchID = navigator.geolocation.watchPosition(
                      // onSuccess Geolocation
                      function(position) {
                        //within 50m → update user
                        if(position.coords.accuracy<=100){
                            usersRef.update({
                                latitude:position.coords.latitude,
                                longitude:position.coords.longitude,
                            });
                        }
                      }, 
                      // エラー時のコールバック関数は PositionError オブジェクトを受けとる
                      function(error) {},
                      {enableHighAccuracy: true,timeout:10000,maximumAge: 100}
              );},function(e) {
                  alert(e.message);
              });
          } else {
              alert("Location APIがサポートされていません。");
          }
    });
    // When changing the location
    ref.child("users").on('child_changed', function(snapshot, prevChildKey) {
        var chngedata = snapshot.val();
        for (var i = 0; i < markers.length; i++) {
            if(markers[i]["key"] == chngedata.uid){
                markers[i].setPosition(new google.maps.LatLng(chngedata.latitude, chngedata.longitude));
                var authData = ref.getAuth();
                if(authData.uid == chngedata.uid){
                    googlemap.panTo(new google.maps.LatLng(chngedata.latitude, chngedata.longitude));
                }
            }
        }
    });
    // When changing the location
    ref.child("users").on('child_added', function(snapshot, addChildKey) {
        if(addChildKey){
            var adddata = snapshot.val();
            createMarker(adddata.latitude, adddata.longitude, adddata.name, adddata.profileimage, adddata.uid, googlemap, markercreate);
        }
    });
}


// marker作成
function markercreate(latitude,longitude,googlemap,title,key,imagepath) {
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        map: googlemap,
        icon: imagepath,
        title: title
    });
    marker["key"] = key;
    var jugde = new Boolean(true);
    for (var i = 0; i < markers.length; i++) {
        if(markers[i]["key"] == key){
            jugde = false;
        }
    }
    if(jugde){
        markers.push(marker);
    }
}

// canvasでimage加工
function createMarker(latitude,longitude,title,imagepath,key,googlemap,callback) {
    // attach image to bg canvas
    var img =new Image();
    img.crossOrigin = "Anonymous";
    img.src = imagepath;
    img.onload = function(){
        var bg = document.createElement("canvas");
        bg.width = 200;
        bg.height = 200;
        var bgCtx = bg.getContext("2d");
        // 黒枠の作成
        bgCtx.beginPath();
        bgCtx.fillStyle = "black";
        bgCtx.fillRect(73,135,54,54);
        bgCtx.fill();
        bgCtx.stroke();
        // 線の作成
        bgCtx.beginPath();
        bgCtx.moveTo(100,200);
        bgCtx.lineTo(95,177);
        bgCtx.moveTo(100,200);
        bgCtx.lineTo(105,177);
        bgCtx.stroke();
        
        bgCtx.drawImage(img, 75, 137,50,50);
        callback(latitude,longitude,googlemap,title,key,bg.toDataURL());
    }
}