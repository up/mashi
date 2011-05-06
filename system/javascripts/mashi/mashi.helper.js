/*
  Mashi Timeline Toolkit - Module Helper
  Copyright (c) 2008-2011 Uli Preuss. All Rights Reserved.
  Licensed under the terms of the GNU General Public License, version 2
  see: http://mashi.tv/license.md for details
*/


/* JSLINT OPTIONS ********************************************************************* */

/* jslint 
   white: true, onevar: true, undef: true, eqeqeq: true, bitwise: true, regexp: true, 
   newcap: true, immed: true, continue: true, strict: true, indent: 2 
*/
/* global 
   window: false, document: false, clearInterval: false, escape: false, unescape: false, 
   mashi: false, _m_: false 
*/


/* JSDOC TOOLKIT COMMENTS *************************************************************** */

/** @fileOverview Mashi - Module Helper */

/** 
  * Alias for mashi.application.prototype.helper 
  * @namespace
*/
var _mhelper_;

(function () {

  "use strict";

  if (typeof mashi.application.helper === "undefined") {

    _mhelper_ = mashi.application.prototype.helper = function () {};

    /** 
      * Helper - Create unique array
      * @param {Array} arrayName
      * @return {Array} arrayName
      *
      * @example
      * _mhelper_.array_unique(my_array);
    */
    _mhelper_.array_unique = function (arrayName) {
      var i, j, newArray = [];
      label: 
      for (i = 0; i < arrayName.length; i += 1) {
        for (j = 0; j < newArray.length; j += 1) {
          if (newArray[j] === arrayName[i]) {
            continue label;
          }
        }
        newArray[newArray.length] = arrayName[i];
      }
      return newArray;
    };

    /** 
      * Helper - Get Style Property
      * @param {String} id
      * @param {String} property
      * @return {String} property value
      *
      * @example
      * _mhelper_.getStyle('header', 'color');
    */
    _mhelper_.getStyle = function (id, styleProp) {
      var y, x = document.getElementById(id);
      if (x.currentStyle) {
        y = x.currentStyle[styleProp];
      } else if (window.getComputedStyle) {
        y = document.defaultView.getComputedStyle(x, null).getPropertyValue(styleProp);
      }
      return y;
    };

    /** 
      * Helper - Test if element has class name
      * @param {HTML-Object} node
      * @param {String} class name
      *
      * @example
      * _mhelper_.hasClass(elem, 'active');
    */
    _mhelper_.hasClass = function (node, className) {
      return node.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    };

    
    /** 
      * Helper - Remove class name
      * @param {HTML-Object} node
      * @param {String} class name
      *
      * @example
      * _mhelper_.removeClass(elem, 'active');
    */
    _mhelper_.removeClass = function (node, className) {
      if (_mhelper_.hasClass(node, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        node.className = node.className.replace(reg, ' ');
      }
    };
    
    
    /** 
      * Helper - Add class name
      * @param {HTML-Object} node
      * @param {String} class name
      *
      * @example
      * _mhelper_.addClass(elem, 'active');
    */
    _mhelper_.addClass = function (node, className) {
      if (!_mhelper_.hasClass(node, className)) {
        node.className += " " + className;
      }
    };


    /** 
      * Helper - Remove child nodes
      * @param {HTML-Object} node
      *
      * @example
      * _mhelper_.removeChildNodes(menu);
    */
    _mhelper_.removeChildNodes = function (node) {
      while (node.childNodes[0]) {
        node.removeChild(node.childNodes[0]);
      }
    };


    /** 
      * Helper - Remove child nodes by class name
      * @param {HTML-Object} node
      * @param {String} class name
      *
      * @example
      * _mhelper_.removeChildNodes(menu, 'disabled');
    */
    _mhelper_.removeChildNodesByClassName = function (node, className) {
      
      var i;
      
      for (i = 0; i < node.childNodes.length; i += 1) {
        if (_mhelper_.hasClass(node.childNodes[i], className)) {
          node.removeChild(node.childNodes[i]);
        }
      }
    };


    /** 
      * Helper - Set Cookie
      * @param {String} cookie name
      * @param {String} cookie value
      * @param {Number} expiredays
      *
      * @example
      * _mhelper_.setCookie(menu, 'disabled');
    */
    _mhelper_.setCookie = function (c_name, value, expiredays) {
      var exdate = new Date();
      exdate.setDate(exdate.getDate() + expiredays);
      document.cookie = c_name + "=" + escape(value) + ((expiredays === null) ? "" : ";expires=" + exdate.toUTCString());
    };

    /** 
      * Helper - Get Cookie
      * @param {String} cookie name
      *
      * @example
      * _mhelper_.getCookie('my_cookie');
    */
    _mhelper_.getCookie = function (c_name) {
      var c_start, c_end;
      if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start !== -1) {
          c_start = c_start + c_name.length + 1;
          c_end = document.cookie.indexOf(";", c_start);
          if (c_end === -1) {
            c_end = document.cookie.length;
          }
          return unescape(document.cookie.substring(c_start, c_end));
        }
      }
      return "";
    };


    /** 
      * Helper - Find left position of an element;
      * (c) Peter-Paul Koch
      * @param {HTML-Object} node
      *
      * @example
      * _mhelper_.findPosY(elem);
    */
    _mhelper_.findPosY = function (obj) {
      var curtop = 0;
      if (obj.offsetParent) {
        while (1) {
          curtop += obj.offsetTop;
          if (!obj.offsetParent) {
            break;
          }
          obj = obj.offsetParent;
        }
      } else if (obj.y) {
        curtop += obj.y;
      }
      return curtop;
    };

    /** 
      * Helper - Find top position of an element;
      * (c) Peter-Paul Koch
      * @param {HTML-Object} node
      *
      * @example
      * _mhelper_.findPosX(elem);
    */
    _mhelper_.findPosX = function (obj) {
      var curleft = 0;
      if (obj.offsetParent) {
        while (1) {
          curleft += obj.offsetLeft;
          if (!obj.offsetParent) {
            break;
          }
          obj = obj.offsetParent;
        }
      } else if (obj.x) {
        curleft += obj.x;
      }
      return curleft;
    };


    /** 
      * Helper - Clear all intervals
      *
      * @example
      * _mhelper_.clearAllIntervals();
    */
    _mhelper_.clearAllIntervals = function () {
      
      var ival;
      
      for (ival in _m_.intervals) {
        if (_m_.intervals.hasOwnProperty(ival)) {
          clearInterval(_m_.intervals[ival]);
        }
      }
    };


     /** 
       * Helper - Add event; 
       * written by Dean Edwards, 2005
       * with input from Tino Zijdel, Matthias Miller, Diego Perini
       * @param {HTML-Object} node
       * @param {String} event type (without 'on')
       * @param {Function} node
       * 
       * @example
       * _mhelper_.addEvent(link, 'click', my_click_handler);
     */
    _mhelper_.addEvent = function (element, type, handler) {
      if (element.addEventListener) {
        element.addEventListener(type, handler, false);
      } else {
        // assign each event handler a unique ID
        if (!handler.$$guid) {
          handler.$$guid = _mhelper_.addEvent.guid += 1;
        }
        // create a hash table of event types for the element
        if (!element.events) {
          element.events = {};
        }
        // create a hash table of event handlers for each element/event pair
        var handlers = element.events[type];
        if (!handlers) {
          handlers = element.events[type] = {};
          // store the existing event handler (if there is one)
          if (element["on" + type]) {
            handlers[0] = element["on" + type];
          }
        }
        // store the event handler in the hash table
        handlers[handler.$$guid] = handler;
        // assign a global event handler to do all the work
        element["on" + type] = _mhelper_.handleEvent;
      }
    };

    // a counter used to create unique IDs
    _mhelper_.addEvent.guid = 1;

    /** 
      * Helper - Remove event 
      * @param {HTML-Object} node
      * @param {String} event type (without 'on')
      * @param {Function} node
      * 
      * @example
      * _mhelper_.removeEvent(link, 'click', my_click_handler);
    */
    _mhelper_.removeEvent = function (element, type, handler) {
      if (element.removeEventListener) {
        element.removeEventListener(type, handler, false);
      } else {
        // delete the event handler from the hash table
        if (element.events && element.events[type]) {
          delete element.events[type][handler.$$guid];
        }
      }
    };

    /** @private */
    _mhelper_.handleEvent = function (event) {
      var handlers, i, returnValue = true;
      // grab the event object (IE uses a global event object)
      event = event || _mhelper_.fixEvent(((this.ownerDocument || this.document || this).parentWindow || window).event);
      // get a reference to the hash table of event handlers
      handlers = this.events[event.type];
      // execute each event handler
      for (i in handlers) {
        if (handlers.hasOwnProperty(i)) {
          this.handleEvent = handlers[i];
          if (this.handleEvent(event) === false) {
            returnValue = false;
          }
        }
      }
      return returnValue;
    };

    /** @private */
    _mhelper_.fixEvent = function (event) {
      event.preventDefault = _mhelper_.fixEvent.preventDefault;
      event.stopPropagation = _mhelper_.fixEvent.stopPropagation;
      return event;
    };
    /** @private */
    _mhelper_.fixEvent.preventDefault = function () {
      this.returnValue = false;
    };
    /** @private */
    _mhelper_.fixEvent.stopPropagation = function () {
      this.cancelBubble = true;
    };
    

    /** 
      * Helper - Trim string, 
      * (c) Douglas Crockford
      * @ignore
      * @example
      * ' abc  '.trim();
    */
    String.prototype.trim = function () {
      return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
    };

  }

}());
