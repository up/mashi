/*
  Mashi Timeline Toolkit - Module Object Typewriter
  Copyright (c) 2008-2011 Uli Preuss. All Rights Reserved.
  Licensed under the terms of the GNU General Public License, version 2
  see: http://mashi.tv/license.md for details
*/


/* JSLINT OPTIONS ********************************************************************* */

/* jslint 
   white: true, onevar: true, undef: true, eqeqeq: true, bitwise: true, regexp: true, 
   newcap: true, immed: true, strict: true, indent: 2 
*/
/* global 
   setTimeout: false, _m_: false, _ma_: false, 
*/


/* JSDOC TOOLKIT COMMENTS *************************************************************** */

/** @fileOverview Mashi - Module Object.Typewriter */

(function () {

  "use strict";

  if (typeof mashi.object !== "undefined") {
    
    /** 
      * Typewriter run
      * @param {Object} configuration
      *
      * @example
      * infolayer.run({
      *   html: 'Info text',
      *   delay: 60, 
      *   wait: 2000   
      * });
    */
    mashi.object.prototype.run = function (config) {
      _ma_.$(this.id).innerHTML = config.html;
      
      /** @ignore */
      new mashi.object.prototype.typewriter(this.id, config, "").init();
      //new mashi.object.prototype.typewriter(this.id, config, "|").init();
    };
    
    /** @private */
    mashi.object.prototype.typewriter = function (id, config, cursor) {
      var obj = _ma_.$(id);
      obj.typewriter = this;
      if (typeof obj.innerHTML === "undefined") {
        this.running = true;
        return;
      }
      this.delay = (typeof config.delay === "undefined" ? 50 : config.delay);
      this.html = obj.innerHTML;
      this.cursor = (cursor ? cursor : "");
      this.cText = "";
      this.curChar = 0;
      this.running = false;
      this.inTag = false;
      this.tagBuffer = "";
      this.inHTMLEntity = false;
      this.HTMLEntityBuffer = "";

      /** @private */
      this.callback = function () {
        obj.innerHTML = this.html;
        setTimeout(function () {
          _m_.frame.finished = true;
        }, (typeof config.wait === "undefined" ? 0 : config.wait));
      };

      /** @private */
      this.init = function () {
        if (this.running) {
          return;
        }
        if (typeof this.html === "undefined") {
          setTimeout(function () {
            if (_ma_.$(obj.id)) { 
              _ma_.$(obj.id).typewriter.init();
            }
          }, this.delay);
          return;
        }
        if (this.cText === "") {
          obj.innerHTML = "";
        }
        // this.html = this.html.replace(/<([^<])*>/, ""); // Strip html tags
        if (this.curChar < this.html.length) {
          if (this.html.charAt(this.curChar) === "<" && !this.inTag) {
            this.tagBuffer = "<";
            this.inTag = true;
            this.curChar += 1;
            this.init();
            return;
          } else if (this.html.charAt(this.curChar) === ">" && this.inTag) {
            this.tagBuffer += ">";
            this.inTag = false;
            this.cText += this.tagBuffer;
            this.curChar += 1;
            this.init();
            return;
          } else if (this.inTag) {
            this.tagBuffer += this.html.charAt(this.curChar);
            this.curChar += 1;
            this.init();
            return;
          } else if (this.html.charAt(this.curChar) === "&" && !this.inHTMLEntity) {
            this.HTMLEntityBuffer = "&";
            this.inHTMLEntity = true;
            this.curChar += 1;
            this.init();
            return;
          } else if (this.html.charAt(this.curChar) === ";" && this.inHTMLEntity) {
            this.HTMLEntityBuffer += ";";
            this.inHTMLEntity = false;
            this.curChar += 1;
            this.cText += this.HTMLEntityBuffer;
            this.init();
            return;
          } else if (this.inHTMLEntity) {
            this.HTMLEntityBuffer += this.html.charAt(this.curChar);
            this.curChar += 1;
            this.init();
            return;
          } else {
            this.cText += this.html.charAt(this.curChar);
          }
          obj.innerHTML = this.cText;
          obj.innerHTML += (this.curChar < this.html.length - 1 ? (typeof this.cursor === "function" ? this.cursor(this.cText) : this.cursor) : "");
          this.curChar += 1;
          setTimeout(function () {
            if (_ma_.$(obj.id)) { 
              _ma_.$(obj.id).typewriter.init();
            }
          }, this.delay);
        } else {
          this.cText = "";
          this.curChar = 0;
          this.running = false;
          this.callback();
        }
      };
    };
  }
}());
