// logger.js

var Logger = (function() {

                                   // ======
                                   // Logger
                                   // ======

function Logger(element) {
    this.element = element;
    this.element.style.overflowY = "scroll";

    this.entry = 0;
}

Logger.prototype.scrollAnchor = function() {
    if (this.element.scrollHeight === (
                         this.element.scrollTop + this.element.offsetHeight)) {
        return 'bottom';
    }
};

Logger.prototype.scroll = function(anchor) {
    if (anchor === 'bottom') {
        this.element.scrollTop = this.element.scrollHeight;
    }
};

Logger.prototype.clear = function() {
    this.element.innerHTML = '';
    this.entry = 0;
};

function createLogEntry(outputElement, number, text) {
    var doc = outputElement.ownerDocument;
    var item = doc.createElement('span');
    item.innerText = number + ': ' + text;
    outputElement.appendChild(item);
    outputElement.appendChild(doc.createElement('br'));
    return item;
}

Logger.prototype.log = function(text) {
    createLogEntry(this.element, this.entry++, text);
};

Logger.prototype.error = function(text) {
    var item = createLogEntry(this.element, this.entry++, text);
    item.style.color = 'red';
    item.style.fontWeight = 800;
};

return Logger;

}());
