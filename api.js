var log;

var API = {
    Container: function() {
	function Container() {
            log("Creating 'Container'");
            this.children = [];
        }

        Container.prototype.addChild = function(child) {
            log("Adding child to 'Container'");
            this.children.push(child);
        };

        return Container;
    }(),

    Child: function() {
        function Child() {
            log("Adding child to 'Child'");
        }

        return Child;
    }(),

    meta: function(logger) {
        log = logger;

        return {
            Container: {
                create: function() {
                    return new API.Container();
                },
    
                child: function(self, child) {
                    self.addChild(child);
                }
            },
    
            Child: {
                create: function() {
                    return new API.Child();
                },
            },
        };
    },
};
