/* 
 *  list of plugin for index functions
 */

(function(){

    var plugins = {
        // click items activation
        navigation: {
            func: function navigation(sim, plugin){
                // login
                $("#login li").on("click",function(){
                    firebase.auth($(this).text());
                });
            }
        }
    }
    
    window.indexPlugins = [
        plugins.navigation
    ];

})()

