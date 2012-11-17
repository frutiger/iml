var API = {
    Container: function() {
        var s_id = 0;

        function Container(log) {
            this.log = log;
            this.id = s_id++;
            this.log('Creating ' + this);
        }

        Container.prototype.addChild = function(child) {
            this.log('Adding ' + child + ' to ' + this);
        };

        Container.prototype.toString = function() {
            return '\'Container' + this.id + '\'';
        };

        Object.defineProperty(Container.prototype, 'property', {
            set: function(value) {
                this.log('Setting \'property\' on ' + this + ' to ' + value);
            },
        });

        return Container;
    }(),

    Child: function() {
        var s_id = 0;

        function Child(log) {
            this.log = log;
            this.id = s_id++;
            this.log('Creating ' + this);
        }

        Child.prototype.toString = function() {
            return '\'Child' + this.id + '\'';
        };

        return Child;
    }(),

    meta: function(log) {
        return {
            Container: {
                create: function() {
                    return new API.Container(log);
                },

                child: function(self, child) {
                    self.addChild(child);
                }
            },

            Child: {
                create: function() {
                    return new API.Child(log);
                },
            },
        };
    },
};
