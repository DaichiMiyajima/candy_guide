/* 
 *  list of plugin for initialization
 */

(function(){

    var plugins = {

        //Execute GPSPlugins
        executeGPSPlugins: {
            func : function executeGPSPlugins(sim){
                sim.GPSPlugins.forEach(function (plugin) {
                    plugin.func.call(sim, plugin);
                })
            }
        },
        //Watch idle status.
        //using idle.js. see(https://github.com/shawnmclean/Idle.js)
        startIdleTrace: {
            func : function startIdleTrace(sim, plugin){
                var idle = new Idle();
                idle.onHidden = firebase.onIdle;
                idle.onAway = firebase.onAway;
                idle.onAwayBack = firebase.onBack;
                idle.setAwayTimeout(2000);
                idle.start();
            }
        }
    }

    window.initPlugins = [
        plugins.executeGPSPlugins,
        plugins.startIdleTrace
    ];
})()
