//Main entry point for this app

(function(){

   var initial = true;
   var sim = new sim.Create();

   var start = (function(){

        //using jQuery everywhere
        $(function(){

            // sim uses plugins with realtime way
            sim.addPlugins(firebasePlugins);
            sim.addgpsPlugins(gpsPlugins);

            // login functions are loaded when the page is loaded
            indexPlugins.forEach(function(plugin){
                plugin.func.call(function(){},sim,plugin);
            });

            //App don't maintain any important state
            location.hash = "";

            var connect = function(data){
                // Authorization was fine
                if(data.auth){
                    $("#header").hide();
                    $("#candy_guide").show();
                    // Register user
                    stream.user = data.auth;

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

            // connect firebase
            var candy = firebase.connect(connect);
        })
    })()
})()
