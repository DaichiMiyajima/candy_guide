/* 
 *  list of plugin for initialization
 */

(function(){

    var plugins = {
        // click items activation
        navigation: {
            func: function navigation(sim, plugin){
                // login
                $("#login").on("click",function(){
                    sim.firebase.authWithOAuthPopup($(this).text(),login);
                });

                var login = function(eror){
                    if (error) {
                        if (error.code === "TRANSPORT_UNAVAILABLE") {
                            // fall-back to browser redirects, and pick up the session
                            // automatically when we come back to the origin page
                            sim.firebase.authWithOAuthRedirect($(this).text(), function(error) {
                                console.log(error);
                            }
                        }
                    }
                };
            }
        }
    }

}

