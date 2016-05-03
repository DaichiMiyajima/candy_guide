//Main entry point for this app

(function(){

   var initial = true;
   var sim = new sim.Create();

   var start = (function(){

        //using jQuery everywhere
        $(function(){

            // register firebase
            sim.registerFirebase();
            // sim uses plugins with realtime way
            sim.addgpsPlugins(gpsPlugins);

            // login functions are loaded when the page is loaded
            loginPlugins.forEach(function(plugin){
                plugin.func.call(function(){},sim,plugin);
            });

            //App don't maintain any important state
            location.hash = "";

            var connect = function(data){
                // Authorization was fine
                if(data.auth = "auth_OK"){
                    $("#header").hide();
                    $("#candy_guide").show();
                    sim.user = data.info;

                    if(initial){
                        initial = false;
                        // init functions are loaded when the user login
                        initPlugins.forEach(function(plugin){
                            plugin.func.call(function(){},sim,plugin);
                        });
                    }
                }else if(data.user){
                    // new user launch GPS
                    var user = {};
                    user.data = data.user;
                    sim.process(user);
                }else{
                    console.log(data);
            }

            // connect firebase
            var candy = client.connect(connect);
        })
    })()
})()
