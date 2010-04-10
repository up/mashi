/*
	Copyright (c) 2008-2009, Uli Preuss All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://mashi.tv/license for details
*/

 (function() {

    if (typeof mashi.application.history == "undefined") {
        mashi.application.prototype.history = function() {};
        _mh_ = mashi.application.prototype.history;
    }
    mashi.application.prototype.history.addManager = function() {
        this.div = document.createElement("DIV");
        this.div.style.position = "absolute";
        this.div.style.visibility = "hidden";
        document.body.appendChild(this.div);
        var listeners = [];
        var currentHash = window.location.hash;
        var timer = window.setInterval(function() {
            if (window.location.hash != currentHash) {
                currentHash = window.location.hash;
                notifyListeners(currentHash.substring(1));
            }
        },
        100);
        this.add = function(page) {
            this.div.id = page;
            window.location.hash = page;
            currentHash = "#" + page;
        }
        function notifyListeners(page) {
            for (var i = 0; i < listeners.length; i++) {
                listeners[i](page);
            }
        }
        this.addListener = function(callBack) {
            listeners.push(callBack);
        }
        this.removeListener = function(callBack) {
            for (var i = 0; i < listeners.length; i++) {
                if (listeners[i] == callBack) {
                    listeners = listeners.splice(i, 1);
                    return;
                }
            }
        }
    }

}

})();

