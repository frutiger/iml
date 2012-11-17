var IML = {
    instantiate: function(node, meta) {
        if (node.tagName === "parsererror") {
            throw new Error(node.childNodes[1].innerText);
        }

        if (!meta[node.tagName]) {
            throw new Error('"' + node.tagName + '" is not recognized');
        }

        var metadata = meta[node.tagName];

        var object = meta[node.tagName].create();
        for (var i = 0; i < node.childNodes.length; ++i) {
            var childNode = node.childNodes[i];
            meta[node.tagName].child(object, IML.instantiate(childNode, meta));
        }
        return object;
    }
}

