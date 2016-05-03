// represent the sim

(function(){
    var sim = {};
    sim.Create = function Create(){
        this.plugins = [];
    }

    sim.Create.prototype = {
        user: {
            name: null,
            user_id: null
        },
        // register more plugins for stream processing
        addGPSPlugins: function (plugins) {
            this.plugins.push.apply(this.plugins, plugins);
        },
        //where we draw
        canvas: function(){
            return $("#map");
        },
        //process the list of plugins for a guide
        process: function (user) {
            var that = this;
            var i = 0;
            function next () {
                var plugin = that.plugins[i++];
                if(plugin) {
                    plugin.func.displayName = plugin.name;
                    plugin.func.call(next, user, that, plugin)
                }
            }
            next();
        },
        //count is icremented in the gpsPlugin
        count:0
    };
    window.sim = sim;
})()
