// iml.js

var IML = {
    Error: function(message) {
        this.message = message;
    },

    instantiate: function(meta, getParseError, node) {
        function error(message) {
            throw new (IML.Error)(message);
        }

        function simpleData(node) {
            if (node.nodeType !== Node.ELEMENT_NODE) {
                return;
            }

            if (node.childNodes.length !== 1) {
                return;
            }

            var childNode = node.firstChild;
            if (childNode.nodeType !== Node.TEXT_NODE) {
                return;
            }

            var text = childNode.data.trim().replace(/\s+/g, ' ');

            if (text !== '') {
                var number = parseFloat(text);
                if (!isNaN(number)) {
                    return number;
                }

                return text;
            }
        }

        function instantiateNodes(metadata, type, object, nodes) {
            function nodeIsWhitespace(node) {
                return node.nodeType                === Node.TEXT_NODE &&
                       node.data.replace(/\s*/, '') === '';
            }

            for (var i = 0; i < nodes.length; ++i) {
                var node = nodes[i];

                if (getParseError(node)) {
                    error(getParseError(node));
                }

                if (nodeIsWhitespace(node)) {
                    continue;
                }

                if (metadata.isProperty && metadata.isProperty(node.tagName)) {
                    var value = simpleData(node);
                    if (value === undefined) {
                        error('Property \'' + node.tagName + '\' does not ' +
                              'contain any data');
                    }
                    metadata.property.bind(object)(node.tagName, value);
                }
                else {
                    metadata.child.bind(object)(IML.instantiate(meta,
                                                                getParseError,
                                                                node));
                }
            }
        }

        if (getParseError(node)) {
            error(getParseError(node));
        }

        if (node.nodeType == Node.TEXT_NODE) {
            return node.data;
        }

        if (!meta[node.tagName]) {
            error('\'' + node.tagName + '\' is not recognized');
        }

        var metadata = meta[node.tagName];

        var object = metadata.create();
        for (var i = 0; i < node.attributes.length; ++i) {
            var attrib = node.attributes[i];

            if (!metadata.isProperty) {
                error('\'' + node.tagName + '\' does not declare any ' +
                      'properties and so cannot have any attributes');
            }
            if (!metadata.isProperty(attrib.name)) {
                error('\'' + attrib.name + '\' is not a property on \'' +
                      node.tagName + '\' objects');
            }

            metadata.property.bind(object)(attrib.name, attrib.value);
        }
        instantiateNodes(metadata, node.tagName, object, node.childNodes);
        return object;
    }
}

