/*
  Mashi Timeline Toolkit - Module Object
  Copyright (c) 2008-2011 Uli Preuss. All Rights Reserved.
  Licensed under the terms of the GNU General Public License, version 2
  see: http://mashi.tv/license.md for details
*/


/* JSLINT OPTIONS ********************************************************************* */

/* jslint 
   white: true, onevar: true, undef: true, eqeqeq: true, bitwise: true, regexp: false, 
   newcap: true, immed: true, strict: true, indent: 2 
*/
/* global 
   document: false, setInterval: false, mashi: false, _m_: false, _ma_: false, 
   _mhelper_: false, _IE_: false, _IE_6_7_: false, _IE_8_: false, _IE_7_8_: false, 
   _mIEhacks_: false 
*/


/* JSDOC TOOLKIT COMMENTS *************************************************************** */

/** @fileOverview Mashi - Module Object */

/** Alias for mashi.application.prototype.object */
var _mao_;

(function () {

  "use strict";

  if (typeof mashi.application.object === "undefined") {

    if (mashi.min === false) {
      mashi.module('helper');
    }
    if (_IE_) {
      mashi.module('IEhacks');
    }

   /** @private */ 
   mashi.application.prototype.object = function () {};
    
    _mao_ = mashi.application.prototype.object;
    _mao_._namespace = "mashi";
    _mao_.zindex = 500;
    _mao_.objects = [];

    /** 
      * Create a mashi object
      * @constructor
      * @param {Object} params                                           Object configuration.
      * @param {Object} params.id                                        Object id.
      * @param {Object} params.style                                     Object style (css properties).
      * @param {Object} params.className                                 Object class name.
      * @param {String} params.html (innerHTML)                          Inner HTML.
      *
      * @example
      * var hamlet = new mashi.object(params);
    */
    mashi.object = function (params) {

      var type, property;

      // Set object ID
      this.id = params.id;
      this.obj = _ma_.$(this.id);

      // Set object Class
      if (params.className) {
        this.class_name = params.className;
      } else {
        this.class_name = '';
      }

      // Set object Style
      if (params.style) {
        this.style = {};
        for (property in params.style) {
          if (params.style.hasOwnProperty(property)) {
            this.style[property] = params.style[property];
          }
        }
      }

      // Set parent node (append to ..)
      this.targetObj = (params.appendTo) ? (_ma_.$(params.appendTo) ? _ma_.$(params.appendTo) : _m_.stageframe.parentNode.parentNode) : _m_.stageframe;

      if (!this.obj) {

        // Add new object id to array
        _mao_.objects.push(this.id);

        // don't forget to set the necessary styles of the stage
        //this.targetObj.style.position = "relative";
        this.targetObj.style.overflow = "hidden";
        this.targetObj.appendChild(_mao_.createObject(this.id, this.class_name, this.style));
        this.obj = _ma_.$(this.id);

        if (typeof this.style !== 'undefined' && typeof this.style.backgroundImage !== 'undefined') {
          this.src = this.style.backgroundImage.match(/(?:[^\(\/]*\/)['|"]*([^\)]+)/g);
          if (_IE_ && this.style.backgroundImage.match(/\.png/i) !== null) {
            _mIEhacks_.pngChildHack(this.obj, this.src);
          } else {
            this.obj.style.backgroundImage = "url(" + this.src + ")";
          }
        }
        if (typeof this.style !== 'undefined' && typeof this.style.textShadow !== 'undefined') {
          if (_IE_6_7_) {
            _mIEhacks_.pngChildHack(this.obj, '');
            _mIEhacks_.textShadow(this.obj, this.style.textShadow, this.style.fontFamily);
          } else if (_IE_8_) {
            _mIEhacks_.pngChildHack(this.obj, '');
            _mIEhacks_.textShadow(this.obj, this.style.textShadow, this.style.fontFamily, true);
          }
        }

      } else {
        this.obj.style.display = "inline-block";
        if (params.style && params.style.left) {
          this.obj.style.left = params.style.left;
        }
        if (params.style && params.style.top) {
          this.obj.style.top = params.style.top;
        }
        this.obj.style.backgroundImage = "url(" + this.obj.rel + ")";
      }

      // Set object Events
      if (params.event) {
        for (type in params.event) {
          if (typeof params.event[type] === 'function') {
            _mhelper_.addEvent(this.obj, type, params.event[type]);
          }
        }
      }

      // Set object inner HTML
      this.html = (params.html) ? params.html : '';

      if (_IE_) {
        _mIEhacks_.addHTML(this.obj, this.html);
      } else {
        this.obj.innerHTML = this.html;
      }

      /** 
        * Set/change object properties, class name or/and inner html
        * @param {Object} params                                           Object configuration.
        * @param {Object} params.style                                     Style object (css properties).
        * @param {String} params.html                                      Change inner HTML.
        * @param {String} params.$html                                     Add inner HTML.
        * 
        * @example
        * app.set(params);
      */
      this.set = function (params) {

        var property, _object, src;

        _object = this.obj;

        if (!params || params === '') {
          _object.innerHTML = "";
          return;
        }

        if (params.type === 'textanimation') {
          _ma_.$(_object.id).innerHTML = params.html;
        }

        if (params.style) {

          for (property in params.style) {
            if (params.style.hasOwnProperty(property)) {
              if (_IE_ && property === "backgroundImage" && params.style[property].match(/\.png/i) !== null) {
                src = params.style[property].match(/(?:[^\(\/]*\/)['|"]*([^\)]+)/g);
                _mhelper_.removeChildNodesByClassName(_object, 'isChild');
                _mIEhacks_.pngChildHack(_object, src);
              }

              if (_IE_ && property === "textShadow") {
                if (_IE_6_7_) {
                  if (params.style[property] !== '') {
                    _mIEhacks_.textShadow(_object, params.style[property], params.style.fontFamily);
                  }
                } else if (_IE_8_) {
                  if (params.style[property] !== '') {
                    _mIEhacks_.textShadow(_object, params.style[property], params.style.fontFamily, true);
                  }
                }
              } else if (_IE_ && property === "fontSize") {
                if (_ma_.$(_object.id + '_text') !== null) {
                  _ma_.$(_object.id + '_text').style.fontSize = params.style[property];
                } else {
                  _ma_.$(_object.id).style.fontSize = params.style[property];
                }
              } else {
                _object.style[property] = params.style[property];
              }
            }

          }

        }

        if (params.html !== undefined && params.type !== 'textanimation') {

          this.html = (params.html !== '') ? params.html : ' ';

          if (_IE_) {
            if (typeof _ma_.$(_object.id + '_text') !== 'object') {
              _mIEhacks_.addHTML(_object, this.html);
            } else {
              if (_ma_.$(_object.id + '_text') !== null) {
                _ma_.$(_object.id + '_text').innerHTML = this.html;
              } else {
                _ma_.$(_object.id).innerHTML = this.html;
              }
            }
          } else {
            _object.innerHTML = this.html;
          }
        } else if (params.$html) {
          if (_IE_) {
            if (_ma_.$(_object.id + '_text') !== null) {
              _ma_.$(_object.id + '_text').innerHTML += params.$html;
            } else {
              _ma_.$(_object.id).innerHTML += params.$html;
            }
          } else {
            _object.innerHTML += params.$html;
          }

        }
      };

      /** 
        * Set pager loop
        * Not used yet ??????????
        * @ignore
      */
      this.addPager = function () {

        _m_.self.pager = arguments[0];
        _m_.self.pager.id = this.obj.id;

        setInterval(function () {

          var pager = _m_.self.pager.before;
          pager += _m_.frame.num + 1;
          pager += _m_.self.pager.splitter;
          pager += _m_.self.frames.length;
          pager += _m_.self.pager.after;

          _m_.self.$(_m_.self.pager.id).innerHTML = pager;

        }, 100);

      };

    };
    
    /** @private */
    _mao_.createObject = function (id, class_name, style) {

      var property;

      this.object = document.createElement('div');
      this.object.id = id;
      this.object.style.position = "absolute";
      if (class_name !== '') {
        this.object.className = class_name;
      }

      for (property in style) {
        if (style.hasOwnProperty(property) && property !== 'backgroundImage') {
          this.object.style[property] = style[property];
          this.object.rel = style[property];
        }
      }
      if (this.object.style.padding) {
        if (!_IE_7_8_) {
          this.object.style.width = parseInt(this.object.style.width, 10) - (parseInt(this.object.style.padding, 10) * 2) + "px";
          this.object.style.height = parseInt(this.object.style.height, 10) - (parseInt(this.object.style.padding, 10) * 2) + "px";
        }
      } else {
        this.object.style.padding = "0px";
      }

      return this.object;

    };

  }

}());
