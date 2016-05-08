// use Firebase(https://firebase.com/) for data connection

(function(){

    var firebase ={};
    var firebaseURL = "https://candyguide-phase1.firebaseio.com/";

    // Firebase accesses
    var ref = new Firebase(firebaseURL);
    var idle = new Firebase(firebaseURL + '.info/connected');
    var geoFire = new GeoFire(ref);
    // initiate geoQuery.
    var geoQuery = geoFire.query({
        center: [0, 0],
        radius: 10
    });

    firebase.auth = function(provider){
        ref.authWithOAuthPopup(provider, function(error){
            if (error) {
                if (error.code === "TRANSPORT_UNAVAILABLE") {
                    // fall-back to browser redirects, and pick up the session
                    // automatically when we come back to the origin page
                    ref.authWithOAuthRedirect(provider, function(error) {
                        console.log(error);
                    });
                }
            }
        });

        ref.onAuth(function(authData){
            //auth was fine. Then set the userInfo
            if(authData){
                ref.child('users').child(authData.uid).set({
                    uid:authData.uid,
                    provider: authData.provider,
                    name: authData.facebook.displayName,
                    profileimage:authData.facebook.profileImageURL,
                });
            }
            else{
                // finally nothing happen for user
                console.log(ref);
            }
        });
    }

    firebase.updatePosition = function updatePosition(position) {
        geoFire.set(
            ref.getAuth().uid,
            [position.coords.latitude, position.coords.longitude]
        ).then(function() {
            console.log("Provided key has been added to GeoFire");
            }, function(error) {
                console.log("Error: " + error);
            });
        
        //update center positon when changing location
        geoQuery.updateCriteria({
            center: [position.coords.latitude, position.coords.longitude]
        });
    }

    firebase.offAuth = function(){
        ref.offAuth(function(){});
    }
    // all realtime actions
    firebase.connect = function(candy){

        var authData = ref.getAuth();

        if(authData){

            // Let the realtime process on
            var data = {};
            data.auth = authData;
            ref.child('users').child(authData.uid).set({
                uid:authData.uid,
                provider: authData.provider,
                name: authData.facebook.displayName,
                profileimage:authData.facebook.profileImageURL,
            });

            firebase.onIdle = function () {
                // not looking at page
                ref.child('users').child(ref.getAuth().uid).child('idle').child('presence').set('idle');
            }
            firebase.onAway = function () {
                ref.child('users').child(ref.getAuth().uid).child('idle').child('presence').set('away');
            }
            firebase.onBack = function (isIdle, isAway) {
                ref.child('users').child(ref.getAuth().uid).child('idle').child('presence').set('online');
            }

            // Listen for user idling
            idle.on('value', function(snapshot) {
                if (snapshot.val()) {
                    // store timestamp
                    // We do not store any session info.
                    ref.child('users').child(ref.getAuth().uid).child('idle').update({presence: 'online', began: Firebase.ServerValue.TIMESTAMP});
                    ref.child('users').child(ref.getAuth().uid).child('idle').onDisconnect().update({presence: 'offline', End: Firebase.ServerValue.TIMESTAMP});
            }
        });


            candy(data);

        }
        else{
            // finally nothing happen for user
            console.log(ref);
        }
    
        // Listen for location changing
        // We only take care within 10 km
        geoQuery.on("key_entered", function(key, location, distance) {
            //actually receive the changing
            console.log(key + " entered query at " + location + " (" + distance + " km from center)");

            var data = {};

            //Listening for changed for users(whithin 10km only)
            ref.child('users').orderByChild('uid').equalTo(key).on('child_changed', function(snapshot)  {
                if(snapshot){
                    var data = {};
                    data.user = {
                        key: key,
                        location: location,
                        info: snapshot.val()
                    }
                    candy(data);
                }
                else{
                    console.log("no data fetched");
                }
            });

            //Listening for added for users(whithin 10km only)
            ref.child('users').orderByChild('uid').equalTo(key).on('child_added', function(snapshot)  {
                if(snapshot){
                    var data = {};
                    data.user = {
                        key: key,
                        location: location,
                        info: snapshot.val()
                    }
                    candy(data);
                }
                else{
                    console.log("no data fetched");
                }
            });
        });
    }

    window.firebase = firebase;
})()
