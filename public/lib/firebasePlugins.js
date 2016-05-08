/* 
 *  Correspond to realtime things
 */

(function(){

    var map;
    var markers ={};
    var infoWindow = {};
    var icons = {};

    var plugins = {

        renderMap: {
            func: function renderMap(data, sim, plugin) {
                // If own user changing location. Draw map
                if(data.user.key == sim.user.uid && data.user.location){
                    var latlng = new google.maps.LatLng(data.user.location[0] ,data.user.location[1]);
                    var mapOptions = {
                        zoom: 17,
                        center: latlng,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    }
                    if(!map){
                        map = new google.maps.Map($('#map')[0] ,mapOptions);
                    }
                    else{
                        //map.panTo(latlng);
                    }
                }
                this();
            }
        },
        createMarkers:{
            func: function createMarkers(data, sim, plugin){
                if(data.user.key && !markers[data.user.key]){
                    var latlng = new google.maps.LatLng(data.user.location[0] ,data.user.location[1]);
                    var markerOption = {
                        map: map,
                        position: latlng
                    }
                    markers[data.user.key] = new google.maps.Marker(markerOption);
                }
                this();
            }
        },
        createInfoWindow:{
            func: function createInfoWindow(data, sim, plugin){
                if(!infoWindow[data.user.key] && data.user.info.idle.presence){
                    infoWindow[data.user.key] = new google.maps.InfoWindow({ 
                        content: data.user.info.idle.presence
                    });
                }
                this();
            }
        },
        createIcon: {
            func: function createIcon(data, sim, plugin){
                if(!icons[data.user.info.uid] && data.user.info.profileimage){
                    // attach image to bg canvas
                    var img =new Image();
                    img.crossOrigin = "Anonymous";
                    img.src = data.user.info.profileimage;
                    img.onload = function(that){
                        var bg = document.createElement("canvas");
                        bg.width = 54;
                        bg.height = 60;
                        var bgCtx = bg.getContext("2d");
                        // •˜g‚Ìì¬
                        bgCtx.beginPath();
                        bgCtx.fillStyle = "black";
                        bgCtx.fillRect(0,0,54,54);
                        bgCtx.fill();
                        bgCtx.stroke();
                        // ü‚Ìì¬
                        bgCtx.beginPath();
                        bgCtx.moveTo(27,60);
                        bgCtx.lineTo(24,54);
                        bgCtx.moveTo(27,60);
                        bgCtx.lineTo(30,54);
                        bgCtx.stroke();
                        bgCtx.drawImage(img, 2, 2,50,50);

                        icons[data.user.info.uid] = bg.toDataURL();
                        markers[data.user.key].setIcon(icons[data.user.key]);
                    }
                }
                this();
            }
        },
                    
        // tentative code to check the result. will fix soon
        handleMarkers:{
            func: function handleMarkers(data, sim, plugin) {
                // update location
                if(markers[data.user.key]){
                    var latlng = new google.maps.LatLng(data.user.location[0] ,data.user.location[1]);
                    markers[data.user.key].setPosition(latlng);
                }
                // update icon
                if(icons[data.user.key]){
                    markers[data.user.key].setIcon(icons[data.user.key]);
                }
                // update idles
                if(infoWindow[data.user.key] && data.user.info.idle.presence){

                    if(!data.user.info.idle.presence == "offline"){
                        var millis = (new Date()).getTime() - (new Date(data.user.info.idle.End)).getTime();
                        var units   = {
                            second: Math.round(millis/1000),
                            minute: Math.round(millis/1000/60),
                            hour:   Math.round(millis/1000/60/60),
                            day:    Math.round(millis/1000/60/60/24),
                            week:   Math.round(millis/1000/60/60/24/7),
                            month:  Math.round(millis/1000/60/60/24/30), // aproximately
                            year:   Math.round(millis/1000/60/60/24/365), // aproximately
                        };
                        var txt = "";
                        for(var unit in units) { 
                            var val = units[unit];
                            if(val > 0) {
                                txt = "";
                                var u = val + " " + unit;
                                if(val > 1) {
                                    u = u + "s";
                                }
                                txt = u;
                            }
                        };
                    }
                    else{
                        var a =  (new Date()).getTime();
                        var b =  (new Date(data.user.info.idle.began)).getTime();
                        var millis = (new Date()).getTime() - (new Date(data.user.info.idle.began)).getTime();
                        var units   = {
                            second: Math.round(millis/1000),
                            minute: Math.round(millis/1000/60),
                            hour:   Math.round(millis/1000/60/60),
                            day:    Math.round(millis/1000/60/60/24),
                            week:   Math.round(millis/1000/60/60/24/7),
                            month:  Math.round(millis/1000/60/60/24/30), // aproximately
                            year:   Math.round(millis/1000/60/60/24/365), // aproximately
                        };

                        var txt = "";
                        for(var unit in units) { 
                            var val = units[unit];
                            if(val > 0) {
                                txt = "";
                                var u = val + " " + unit;
                                if(val > 1) {
                                    u = u + "s";
                                }
                                txt = u;
                            }
                        };
                    }

                    infoWindow[data.user.key].setContent(data.user.info.idle.presence + ": " + txt);

                }else{
                }
                this();
            }
        },   
        handleInfoWindow:{
            func : function handleInfoWindow(data, sim, plugin) {
                if(infoWindow[data.user.key]){
                    if(!infoWindow[data.user.key].view){
                        infoWindow[data.user.key].open(map, markers[data.user.key]);
                    }
                }
                this();
            }
        }
    }

    window.firebasePlugins = [
        plugins.renderMap,
        plugins.createMarkers,
        plugins.createInfoWindow,
        plugins.createIcon,
        plugins.handleMarkers,
        plugins.handleInfoWindow
    ];
})()

