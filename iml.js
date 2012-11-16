var IML = {
    instantiate: function(node, meta) {
        if (!meta[node.tagName]) {
            return;
        }

        var metadata = meta[node.tagName];

        var object = meta[node.tagName].create();
        for (var i = 0; i < node.childNodes.length; ++i) {
            meta[node.tagName].child(object,
            IML.instantiate(node.childNodes[i], meta));
        }
        return object;
    }
}

