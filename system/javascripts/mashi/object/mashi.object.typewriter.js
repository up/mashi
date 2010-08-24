/*
    Copyright (c) 2008-2010, Uli Preuss. All Rights Reserved.
    Available via Academic Free License v.3.0 OR the modified BSD license.
    see: http://mashi.com/license for details
*/


(function() {

    if (typeof _m_.object != "undefined") {
        _m_.object.prototype.run = function(config) {
            _ma_.$(this.id).innerHTML = config.html;
            new _m_.object.prototype.typewriter(this.id, config, "|").run();
        };
        _m_.object.prototype.typewriter = function(id, config, cursor) {
            var obj = _ma_.$(id);
            obj.typewriter = this;
            if (typeof obj.innerHTML == "undefined") {
                this.running = true;
                return;
            }
            this.delay = (typeof config.delay == "undefined" ? 50: config.delay);
            this.html = obj.innerHTML;
            this.cursor = (cursor ? cursor : "");
            this.cText = "";
            this.curChar = 0;
            this.running = false;
            this.inTag = false;
            this.tagBuffer = "";
            this.inHTMLEntity = false;
            this.HTMLEntityBuffer = "";

            this.callback = function() {
                obj.innerHTML = this.html;
                setTimeout(
                  function() {
                    _m_.frame.finished = true;
                  }, ( typeof config.wait == "undefined" ? 0: config.wait )
                );
            };

            this.run = function() {
                if (this.running) return;
                if (typeof this.html == "undefined") {
                    setTimeout("_ma_.$('" + obj.id + "').typewriter.run()", this.delay);
                    return;
                }
                if (this.cText == "") obj.innerHTML = "";
                // this.html = this.html.replace(/<([^<])*>/, ""); // Strip html tags
                if (this.curChar < this.html.length) {
                    if (this.html.charAt(this.curChar) == "<" && !this.inTag) {
                        this.tagBuffer = "<";
                        this.inTag = true;
                        this.curChar++;
                        this.run();
                        return;
                    }
                    else if (this.html.charAt(this.curChar) == ">" && this.inTag) {
                        this.tagBuffer += ">";
                        this.inTag = false;
                        this.cText += this.tagBuffer;
                        this.curChar++;
                        this.run();
                        return;
                    }
                    else if (this.inTag) {
                        this.tagBuffer += this.html.charAt(this.curChar);
                        this.curChar++;
                        this.run();
                        return;
                    }
                    else if (this.html.charAt(this.curChar) == "&" && !this.inHTMLEntity) {
                        this.HTMLEntityBuffer = "&";
                        this.inHTMLEntity = true;
                        this.curChar++;
                        this.run();
                        return;
                    }
                    else if (this.html.charAt(this.curChar) == ";" && this.inHTMLEntity) {
                        this.HTMLEntityBuffer += ";";
                        this.inHTMLEntity = false;
                        this.curChar++;
                        this.cText += this.HTMLEntityBuffer;
                        this.run();
                        return;
                    }
                    else if (this.inHTMLEntity) {
                        this.HTMLEntityBuffer += this.html.charAt(this.curChar);
                        this.curChar++;
                        this.run();
                        return;
                    }
                    else {
                        this.cText += this.html.charAt(this.curChar);
                    }
                    obj.innerHTML = this.cText;
                    obj.innerHTML += (
                    this.curChar < this.html.length - 1 ? (
                    typeof this.cursor == "function" ? this.cursor(this.cText) : this.cursor
                    ) : ""
                    );
                    this.curChar++;
                    setTimeout("_ma_.$('" + obj.id + "').typewriter.run()", this.delay);
                }
                else {
                    this.cText = "";
                    this.curChar = 0;
                    this.running = false;
                    this.callback();
                }
            };
        };
    }
})();

