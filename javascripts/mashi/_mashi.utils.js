/*
	Copyright (c) 2008-2009, Uli Preuss All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://mashi.tv/license for details
*/

 (function() {

    if (typeof mashi.application.utils == "undefined") {
        mashi.application.prototype.utils = function() {};
        _mu_ = mashi.application.prototype.utils;
    }
    mashi.application.prototype.utils.xxx = function(str) {
        }

    Element.prototype.html = function(str) {
        if (str == undefined) str = '';
        this.innerHTML = str;
    }
    Element.prototype.remove = function() {
    	this.parentNode.removeChild(this)
    }

    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    }
    Element.prototype.addEvent = function(eventtype, fn) {
        if (this.addEventListener) {
            this.addEventListener(eventtype, fn, false);
            return true;
        }
        else if (this.attachEvent) {
            return this.attachEvent("on" + eventtype, fn);
        }
        else {
            return false;
        }
    }

    Element.prototype.hasClassName = function(classname) {
        return this.className.match(new RegExp('(\\s|^)' + classname + '(\\s|$)'));
    }

    Element.prototype.addClassName = function(classname) {
        if (!this.hasClassName(classname)) this.className += " " + classname;
    }

    Element.prototype.removeClassName = function(classname) {
        if (this.hasClassName(classname)) {
            var reg = new RegExp('(\\s|^)' + classname + '(\\s|$)');
            this.className = this.className.replace(reg, ' ');
        }
    }


    /* 
     * Element.prototype im-Internet-Explorer
     * Thomas Werner
     * http://people.avona.com/~thomas.werner/index.php?/archives
     *        /18-Annahme-ausgeloest-und-nicht-aufgefangen-oder-JavaScript-im-Internet-Explorer.html
    */
    if (!window.Element) {
        Element = function() {};
        Element.prototype.__IEFix_modified = true;
        var tempCreateElement = document.createElement;
        var tempGetElementById = document.getElementById;
        var tempGetElementsByName = document.getElementsByName;
        var tempGetElementsByTagName = document.getElementsByTagName;

        document.createElement = function(name) {
            var node = tempCreateElement(name);
            __IEFix_createElementProto(node);
            return node;
        };

        document.getElementById = function(id) {
            var node = tempGetElementById(id);
            __IEFix_createElementProto(node);
            return node;
        };

        document.getElementsByName = function(name) {
            var nodes = tempGetElementsByName(name);
            for (var i in nodes) {
                __IEFix_createElementProto(nodes[i]);
            }
            return nodes;
        };

        document.getElementsByTagName = function(tag) {
            var nodes = tempGetElementsByTagName(tag);
            for (var i in nodes) {
                __IEFix_createElementProto(nodes[i]);
            }
            return nodes;
        };

        function __IEFix_createElementProto(node) {
            if (node.__IEFix_modified) return;
            for (var method in Element.prototype) {
                node[method] = Element.prototype[method];
            }
        }
    }

    // Stellt fest, ob auch wirklich der Internet Explorer gerade am Laufen ist
    var isIe
    /*@cc_on = true@*/
    ;

    // Normalisierung des Internet-Explorer-Verhaltens
    if (isIe) {
        var tmpNode = document.createElement('div');
        var tempGetAttribute = tmpNode.getAttribute;
        var tempSetAttribute = tmpNode.setAttribute;

        Element.prototype.getAttribute = function(name) {
            if (name == 'class') name = 'className';
            if (name == 'style') return this.style.cssText;
            return tempGetAttribute(name);
        };

        Element.prototype.setAttribute = function(name, value) {
            if (name == 'class') name = 'className';
            if (name == 'style') {
                this.style.cssText = value;
            } else {
                tempSetAttribute(name, value);
            }
        };

        Element.prototype.addEventListener = function(event, func) {
            this.attachEvent('on' + event, func);
        };

        Element.prototype.removeEventListener = function(event, func) {
            this.detachEvent('on' + event, func);
        };
    }

}

})();

