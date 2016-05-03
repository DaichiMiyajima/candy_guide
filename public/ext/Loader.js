(function(){
    var scriptsLoader = {};
    scriptsLoader.header = function(){ 
        //jQuery 2.1.1(http://jquery.com/)
        document.write('<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>');
        //firebase 2.4.2(https://www.firebase.com/)
        document.write('<script src="https://cdn.firebase.com/js/client/2.4.2/firebase.js"></script>');
        //geofire(https://github.com/firebase/geofire-js)
        document.write('<script src="https://cdn.firebase.com/libs/geofire/4.0.0/geofire.min.js"></script>');
        //google maps
        document.write('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCO32axBK69PMVZMgs_oPjKMltoQa4pKI4"></script>');
    };
    scriptsLoader.body = function(){
        //all modules
        document.wirte('');
    };
    window.scriptsLoader = scriptsLoader;
})();
