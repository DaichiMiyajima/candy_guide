/* 
 *  list of plugin for initialization
 */

(function(){

    var plugins = {

        //Map initialization
        mapInitialization: {
            func : function mapInitialization(sim, plugin){
                var mapOptions = {
                    zoom: 17,
                    center: new google.maps.LatLng(0, 0),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                new google.maps.Map(sim.canvas(), mapOptions);
            }
        }
    }

    window.initPlugins = [
        plugins.mapInitialization
    ];
})()

