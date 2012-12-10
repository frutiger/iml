// api.js

                                 // =========
                                 // Container
                                 // =========

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

Object.defineProperty(Container.prototype, 'name', {
    set: function(value) {
        this.log('Setting \'name\' on ' + this + ' to \'' + value + '\'');
    },
});

Object.defineProperty(Container.prototype, 'data', {
    set: function(value) {
        this.log('Setting \'data\' on ' + this + ' to ' + value);
    },
});

                                   // =====
                                   // Child
                                   // =====

function Child(log) {
    this.log = log;
    this.id = Child.id++;
    this.log('Creating ' + this);
}

Child.id = 0;

Child.prototype.toString = function() {
    return '\'Child' + this.id + '\'';
};

Child.prototype.addChild = function(child) {
    this.log('Adding ' + child + ' to ' + this);
};

                                    // ===
                                    // API
                                    // ===

var API = {
    init: function() {
        Container.id = 0;
        Child.id     = 0;
    },

    meta: function(log) {
        return {
            Container: {
                create: function() {
                    return new Container(log);
                },

                isProperty: function(name) {
                    return name in {
                        'name': true,
                        'data': true,
                    };
                },

                canContain: function(name) {
                    return name in {
                        'Child': true,
                    };
                },

                property: function(name, value) {
                    this[name] = value;
                },

                child: function(child) {
                    this.addChild(child);
                },
            },

            Child: {
                create: function() {
                    return new Child(log);
                },

                canContain: function(name) {
                    return name in {
                        'Container': true,
                    };
                },

                child: function(child) {
                    this.addChild(child);
                },
            },
        };
    },
};

