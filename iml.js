var IML = {
    instantiate: function(node, meta) {
        if (node.tagName === "parsererror") {
            throw new Error(node.childNodes[1].innerText);
        }

        if (node.nodeType == Node.TEXT_NODE) {
            return node.data;
        }

        if (!meta[node.tagName]) {
            throw new Error('"' + node.tagName + '" is not recognized');
        }

        var metadata = meta[node.tagName];

        var object = meta[node.tagName].create();
        for (var i = 0; i < node.attributes.length; ++i) {
            var attrib = node.attributes[i];
            if (!(attrib.name in object)) {
                throw new Error('"' + attrib.name
                             + '" is not a property on "' + node.tagName + '"');
            }
            object[attrib.name] = attrib.value;
        }
        for (var i = 0; i < node.childNodes.length; ++i) {
            var childNode = node.childNodes[i];

            if (childNode.nodeType === Node.TEXT_NODE &&
                                     childNode.data.replace(/\s*/, '') === '') {
                continue;
            }

            meta[node.tagName].child(object, IML.instantiate(childNode, meta));
        }
        return object;
    }
}

