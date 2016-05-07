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
                if(data.user.key == sim.user.info.uid && data.user.location){
                    var latlng = new google.maps.LatLng(data.user.location[0] ,data.user.location[1]);
                    var mapOptions = {
                        zoom: 17,
                        center: latlng,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    }
                    if(!map){
                        map = new google.maps.Map(sim.canvas() ,mapOptions);
                    }
                    else{
                        map.panTo(latlng);
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
                if(!infoWindow[data.user.key] && data.user.info.presence){
                    infoWindow[data.user.key] = new google.maps.InfoWindow({ 
                        content: data.user.info.presence
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
                    img.onload = function(){
                        var bg = document.createElement("canvas");
                        bg.width = 54;
                        bg.height = 60;
                        var bgCtx = bg.getContext("2d");
                        // çïògÇÃçÏê¨
                        bgCtx.beginPath();
                        bgCtx.fillStyle = "black";
                        bgCtx.fillRect(0,0,54,54);
                        bgCtx.fill();
                        bgCtx.stroke();
                        // ê¸ÇÃçÏê¨
                        bgCtx.beginPath();
                        bgCtx.moveTo(27,60);
                        bgCtx.lineTo(24,54);
                        bgCtx.moveTo(27,60);
                        bgCtx.lineTo(30,54);
                        bgCtx.stroke();
                        bgCtx.drawImage(img, 2, 2,50,50);

                        icons[data.user.info.uid] = bg.toDataURL();
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
                else if(!markers[data.user.key].getIcon() && icons[data.user.key]){
                    markers[data.user.key].setIcon(icons[data.user.key]);
                }
                // update idles
                else if(infoWindow[data.user.key] && data.user.info.presence){
                    infoWindow[data.user.key].setContent(data.user.info.presence);
                }else{
                }
                this();
            }
        },   
        handleInfoWindow:{
            func function handleInfoWindow(data, sim, plugin) {
                if(!infoWindow[data.user.key].view){
                    infoWindow[data.user.key].open(map, makers[data.user.key]);
                }
                this();
            }
        }
    }

    window.firebasePlugins = [
        plugins.renderMap,
        plugins.createMarkers,
        plugins.createIcon,
        plugins.handleMarkers,
        plugins.handleInfoWindow
    ];
})()

