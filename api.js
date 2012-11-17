function Container(log) {
    this.log = log;
    this.id = Container.id++;
    this.log('Creating ' + this);
}

Container.id = 0;

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

function Child(log) {
    this.log = log;
    this.id = Child.id++;
    this.log('Creating ' + this);
}

Child.id = 0;

Child.prototype.toString = function() {
    return '\'Child' + this.id + '\'';
};

var API = {
    meta: function(log) {
        return {
            Container: {
                create: function() {
                    return new Container(log);
                },

                child: function(self, child) {
                    self.addChild(child);
                }
            },

            Child: {
                create: function() {
                    return new Child(log);
                },
            },
        };
    },
};
