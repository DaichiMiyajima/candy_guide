// use Firebase(https://firebase.com/) for data connection

(function(){

    var firebase ={};
    // Firebase access
    var ref = new Firebase("https://candyguide-phase1.firebaseio.com/");

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
                ref.child("users").child(authData.uid).set({
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
        ref.child("users").child(authData.uid).update({
            latitude:position.coords.latitude,
            longitude:position.coords.longitude,
        });
    }

    // all realtime actions
    firebase.connect(candy){

        //Listens for user data changes
        ref.child("users").on('child_changed', userCreate);
        ref.child("users").on('child_added', userCreate);

        var userCreate = function(snapshot, childKey){
            if(snapshot){
                var data;
                data.user = snapshot.val();
                candy(data);
            }    
            else{
                console.log("no data fetched");
            }
        }
    }

    window.firebase = firebase;
})()
