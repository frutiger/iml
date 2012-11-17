var log;

var API = {
    Container: function() {
        var s_id = 0;

        function Container() {
            this.id = s_id++;
            this.children = [];
            log('Creating ' + this);
        }

        Container.prototype.addChild = function(child) {
            this.children.push(child);
            log('Adding ' + child + ' to ' + this);
        };

        Container.prototype.toString = function() {
            return '\'Container' + this.id + '\'';
        };

        Object.defineProperty(Container.prototype, 'property', {
            set: function(value) {
                log('Setting \'property\' on ' + this + ' to ' + value);
                this.d_property = value;
            },
        });

        return Container;
    }(),

    Child: function() {
        var s_id = 0;

        function Child() {
            this.id = s_id++;
            log('Creating ' + this);
        }

        Child.prototype.toString = function() {
            return '\'Child' + this.id + '\'';
        };

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
