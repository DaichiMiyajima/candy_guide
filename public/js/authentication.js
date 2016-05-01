/* Start-Authentication of Facebook */
function facebook_login(){
    var ref = new Firebase("https://candyguide.firebaseio.com");
    var usersRef = ref.child("users");
    ref.authWithOAuthPopup("facebook", function(error, authData) {
        if (error) {
            if (error.code === "TRANSPORT_UNAVAILABLE") {
                // fall-back to browser redirects, and pick up the session
                // automatically when we come back to the origin page
                ref.authWithOAuthRedirect("facebook", function(error) {
                    // user authenticated with Firebase
                    navigator.geolocation.getCurrentPosition(function(position) {
                        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                        ref.child("users").child(authData.uid).set({
                            uid:authData.uid,
                            provider: authData.provider,
                            name: authData.facebook.displayName,
                            latitude:position.coords.latitude,
                            longitude:position.coords.longitude,
                            profileimage:authData.facebook.profileImageURL
                        });
                        //Move to other screen
                        window.location.href = "./" ;
                    });
                });
            }
        } else if (authData) {
            // user authenticated with Firebase
            navigator.geolocation.getCurrentPosition(function(position) {
                var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                ref.child("users").child(authData.uid).set({
                    uid:authData.uid,
                    provider: authData.provider,
                    name: authData.facebook.displayName,
                    latitude:position.coords.latitude,
                    longitude:position.coords.longitude,
                    profileimage:authData.facebook.profileImageURL
                });
                //Move to other screen
                window.location.href = "./" ;
            });
        }
    });
}
/* End-Authentication of Facebook */

/* Start-Authentication of Twitter */
function twitter_login(){
    var ref = new Firebase("https://candyguide.firebaseio.com");
    ref.authWithOAuthPopup("twitter", function(error, authData) {
        if (error) {
            if (error.code === "TRANSPORT_UNAVAILABLE") {
                // fall-back to browser redirects, and pick up the session
                // automatically when we come back to the origin page
                ref.authWithOAuthRedirect("twitter", function(error) { /* ... */ });
            }
        } else if (authData) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                // user authenticated with Firebase
                var usersRef = ref.child("users");
                ref.child("users").child(authData.uid).set({
                    uid:authData.uid,
                    provider: authData.provider,
                    name: authData.twitter.displayName,
                    latitude:position.coords.latitude,
                    longitude:position.coords.longitude,
                    profileimage:authData.twitter.profileImageURL
                });
            //Move to other screen
                window.location.href = "./" ;
            });
        }
    });
}
/* End-Authentication of Twitter */