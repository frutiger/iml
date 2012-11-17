var log;

var API = {
    Container: function() {
        function Container() {
            log("Creating a 'Container'");
            this.children = [];
        }

        Container.prototype.addChild = function(child) {
            log("Adding a child to 'Container'");
            this.children.push(child);
        };

        Object.defineProperty(Container.prototype, "property", {
            set: function(value) {
                log("Setting 'Container.property' to " + value);
                this.d_property = value;
            },
            get: function() {
                log("Getting 'Container.property'");
                return this.d_property;
            },
            enumerable: true,
        });

        return Container;
    }(),

    Child: function() {
        function Child() {
            log("Creating a 'Child'");
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
