/* 
 *  list of plugin for initialization
 */

(function(){

    var plugins = {

        //Execute GPSPlugins
        executeGPSPlugins: {
            func : function executeGPSPlugins:(sim, plugin){
                sim.GPSPlugins.forEach(function (plugin) {
                    plugin.func.call(sim, plugin);
                })
            }
        }
    }

    window.initPlugins = [
        plugins.executeGPSPlugins:
    ];
})()

