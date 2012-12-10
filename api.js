// api.js

var API;

(function() {

                                   // =====
                                   // Error
                                   // =====

function Error(message) {
    this.message = message;
}

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

API = {
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

                property: function(name, value) {
                    this[name] = value;
                },

                child: function(child) {
                    if (!(child instanceof Child)) {
                        throw new Error('Container can only hold Child ' +
                                        'objects');
                    }
                    this.addChild(child);
                },
            },

            Child: {
                create: function() {
                    return new Child(log);
                },

                child: function(child) {
                    if (!(child instanceof Container)) {
                        throw new Error('Child can only hold Container ' +
                                        'objects');
                    }
                    this.addChild(child);
                },
            },
        };
    },
};

})();

