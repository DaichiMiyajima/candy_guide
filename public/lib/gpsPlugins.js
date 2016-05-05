/* 
 *  list of plugin for GPS updates
 */

(function(){

    var plugins = {

        // check location API disable
        checkLocationAPI: {
            func: function checkLocationAPI(sim, plugin){
                if(!navigator.geolocation){
                    alert("Location APIがサポートされていません。");
                    return;
                }
            }
        },
        // get current position
        currentPosition: {
            func: function currentPosition(sim, plugin): {
                navigator.geolocation.getCurrentPosition(firebase.updatePosition(position), error, options);

                function error(err){
                    alert("Location の取得に失敗しました。");
                    console.log('ERROR(' + err.code + '): ' + err.message);
                }

                var options {
                    enableHighAccuracy: false,
                    timeout: 5000,
                    maximumAge: 0
                };
            }
        },
        // watch location
        watchPosition: {
            func: function watchPosition(sim, plugin): {
                navigator.geolocation.watchPosition(firebase.updatePosition(position), error, options);

                function error(err){
                    alert("Location の取得に失敗しました。");
                    console.log('ERROR(' + err.code + '): ' + err.message);
                }

                // need high accuracy
                var options {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 100
                };
            }
        }
    }
    
    window.gpsPlugins = [
        plugins.checkLocationAPI,
        plugins.currentPosition,
        plugins.watchPosition
    ];
})()

