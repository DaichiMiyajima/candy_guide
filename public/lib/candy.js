//Main entry point for this app

(function(){

   var initial = true;
   var sim = new userSim.Create();

   var start = (function(){

        //using jQuery everywhere
        $(function(){

            // sim uses plugins with realtime way
            sim.addPlugins(firebasePlugins);
            sim.addGPSPlugins(gpsPlugins);

            // login functions are loaded when the page is loaded
            indexPlugins.forEach(function(plugin){
                plugin.func.call(function(){},sim,plugin);
            });

            //App don't maintain any important state
            location.hash = "";

            $("#header").show();
            $("#candy_guide").hide();

            var connect = function(data){

                // Authorization was fine
                if(data.auth){
                    $("#header").hide();
                    $("#candy_guide").show();
                    // Register user
                    sim.user = data.auth;

                    if(initial){
                        initial = false;
                        // init functions are loaded when the user login
                        initPlugins.forEach(function(plugin){
                            plugin.func.call(function(){},sim,plugin);
                        });
                    }
                }else if(data.user){
                    // Let the realtime process on
                    sim.process(data);
                }else{
                    console.log(data);
                }
            }

            // connect firebase
            var candy = firebase.connect(connect);
        })
    })()
})()
