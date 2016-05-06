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
                    profileimage:authData.facebook.profileImageURL
                });
            }
            else{
                // finally nothing happen for user
                console.log(ref);
            }
        });
    }

    firebase.updatePosition(position){
        geoFire.set({
            ref.getAuth().uid,
            [position.coords.latitude, position.coords.longitude]
        ).then(function() {
            console.log("Provided key has been added to GeoFire");
            }, function(error) {
                console.log("Error: " + error);
            });
        }
        //update center positon when changing location
        geoQuery.updateCriteria({
            center: [position.coords.latitude, position.coords.longitude]
        });
    }

    firebase.onIdle = function () {
        ref.child('presence').child(ref.getAuth().uid).set('idle');
    }
    firebase.onAway = function () {
        ref.child('presence').child(ref.getAuth().uid).set('away');
    }
    firebase.onBack = function (isIdle, isAway) {
        ref.child('presence').child(ref.getAuth().uid).set('online');
    }

    // all realtime actions
    firebase.connect(candy){

        var authData = ref.getAuth();

        if(authData){

            // Let the realtime process on
            var data.auth = authData;
            candy(data);

            // Listen for user idling
            idle.on('value', function(snapshot) {
                if (snapshot.val()) {

                    ref.child('presence').child(ref.getAuth().uid).onDisconnect().set('offline');
                    ref.child('presence').child(ref.getAuth().uid).set('online');

                    // store session timestamp
                    var sessionRef = ref.child('presence').child(authData.uid).push();
                    sessionRef.child('ended').onDisconnect().set(Firebase.ServerValue.TIMESTAMP);
                    sessionRef.child('began').set(Firebase.ServerValue.TIMESTAMP);
                }
            });

            //Listens for user data changes
            ref.child('users').on('child_changed', function(childsnapshot, prevChildKey){
                if(childsnapsnapshot){
                    var data;
                    data.user = snapshot.val();
                    candy(data);
                }    
                else{
                    console.log("no data fetched");
                }
            });

            //Listen for user data added
            ref.child('users').on('child_added', function(childsnapshot, prevChildKey){
                if(childsnapsnapshot){
                    var data;
                    data.user = snapshot.val();
                    candy(data);
                }    
                else{
                    console.log("no data fetched");
                }
            });

            // Listen for location changing
            // We only take care within 10 km
            geoQuery.on("key_entered", function(key, location, distance) {
                console.log(key + " entered query at " + location + " (" + distance + " km from center)");
                var data;
                data.user = {
                    key: key,
                    location: location
                }
                candy(data);
            });

        }else{
            console.log("authentication required");
        }
    }

    window.firebase = firebase;
})()
