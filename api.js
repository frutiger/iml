// api.js

var API = (function() {

                                   // =====
                                   // Error
                                   // =====

function Error(message) {
    this.message = message;
}

                                   // ======
                                   // Window
                                   // ======

Window.id = 0;

function Window(log) {
    this.log = log;
    this.id = Window.id++;
    this.log('Creating ' + this);
}

Window.prototype.addChild = function(child) {
    this.log('Adding ' + child + ' to ' + this);
};

Window.prototype.toString = function() {
    return '\'Window' + this.id + '\'';
};

Object.defineProperty(Window.prototype, 'title', {
    set: function(value) {
        this.log('Setting \'title\' on ' + this + ' to \'' + value + '\'');
    },
});

Object.defineProperty(Window.prototype, 'width', {
    set: function(value) {
        this.log('Setting \'width\' on ' + this + ' to ' + value);
    },
});

                                   // =====
                                   // Frame
                                   // =====

Frame.id = 0;

function Frame(log) {
    this.log = log;
    this.id = Frame.id++;
    this.log('Creating ' + this);
}

Frame.prototype.toString = function() {
    return '\'Frame' + this.id + '\'';
};

Frame.prototype.addChild = function(child) {
    this.log('Adding ' + child + ' to ' + this);
};

                                   // =====
                                   // Label
                                   // =====

Label.id = 0;

function Label(log) {
    this.log = log;
    this.id = Label.id++;
    this.log('Creating ' + this);
}

Label.prototype.toString = function() {
    return '\'Label' + this.id + '\'';
};

Object.defineProperty(Label.prototype, 'text', {
    set: function(value) {
        this.log('Setting \'text\' on ' + this + ' to \'' + value + '\'');
    },
});

                                    // ===
                                    // API
                                    // ===

return {
    Error: Error,

    init: function() {
        Window.id = 0;
        Frame.id  = 0;
        Label.id  = 0;
    },

    meta: function(log) {
        return {
            Window: {
                create: function() {
                    return new Window(log);
                },

                isProperty: function(name) {
                    return name in {
                        'title': true,
                        'width': true,
                    };
                },

                property: function(name, value) {
                    this[name] = value;
                },

                child: function(child) {
                    if (!(child instanceof Frame)) {
                        throw new Error('Window can only contain Frames');
                    }
                    this.addChild(child);
                },
            },

            Frame: {
                create: function() {
                    return new Frame(log);
                },

                child: function(child) {
                    if (!(child instanceof Frame) &&
                        !(child instanceof Label)) {
                        throw new Error('Frame can only contain Frames and ' +
                                        'Labels');
                    }
                    this.addChild(child);
                },
            },

            Label: {
                create: function() {
                    return new Label(log);
                },

                isProperty: function(name) {
                    return name in {
                        'text': true,
                    };
                },

                property: function(name, value) {
                    this[name] = value;
                },

                child: function(text) {
                    this.text = text.toString();
                },
            },
        };
    },
};

})();

