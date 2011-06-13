/*
 * MASHI TIMELINE TOOLKIT
 * Core library
 * Development Version
 * http://mashi.tv/
 *
 * Copyright (c) 2008 - 2011 Uli Preuss
 * Licensed under the terms of the GNU General Public License, version 2
 * (see http://mashi.tv/license.md for details)
 *
 * Parts of this software based on the ingenuity of Douglas Crockford, 
 * Peter-Paul Koch, John Resig, Dean Edwards, Robert Penner, Richard Willis, 
 * Liam Galvin, Stoyan Stefanov, Dusan Janovsky, Joe Segura, Nicholas Zakas, 
 * Andrea Giammarchi and others. A special thanks to Henri Sivonen for his 
 * post about 'HTML5 Script Execution Changes in Firefox 4'. 
*/


/* JSLINT OPTIONS ********************************************************************* */

/*jslint 
   white: true, onevar: true, undef: true, newcap: true, regexp: true, plusplus: true, 
   bitwise: true, strict: true, continue: true, indent: 2 
*/
/*global 
   navigator: false, _mac_: false, document: false, G_vmlCanvasManager: false, 
   setInterval: false, window: false, clearInterval: false, setTimeout: false, 
   XMLHttpRequest: false, ActiveXObject: false, XMLSerializer: false, 
   XPathResult: false 
*/


/* JSDOC TOOLKIT DOC COMMENTS ********************************************************* */
/**
  * @fileOverview Mashi - Core Library
  * @author <a href="mailto:uli@mashi.tv">Uli Preuss</a>
*/

/** 
  * @name mashi
  * @namespace
  * @description Namespace of mashi toolkit
*/
/** 
  * @name mashi.frame
  * @namespace
  * @description Namespace of mashi.frame object
*/
/** 
  * Status of frame (finished or not) 
  * @name mashi.frame.finished
  * @default false 
  *
  * @example
  * app.add('auto', function() {
  *   // your code here
  *   _m_.frame.finished = true;
  * });
*/
/** 
  * Fading between two frames (backgrounds and text layer)
  * @public
  * @name mashi.frame.fading
  * @default true 
  *
  * @example
  * app.add('auto', function() {
  *   // your code here
  *   _m_.frame.fading = false; // for the next frames!
  * });
*/
/** 
  * @name _m_
  * @description Alias for mashi
*/
/** 
  * @name _ma_
  * @description Alias for mashi.application
*/
/** 
  * @name _WebKit_
  * @deprecated Only for module and plugin development!
  * @description Test if Browser is WebKit {true/false}
*/
/** 
  * @name _Safari_
  * @deprecated Only for module and plugin development!
  * @description Test if Browser is Safari {true/false}
*/
/** 
  * Test if Browser is Chrome {true/false}
  * @name _Chrome_
  * @deprecated Only for module and plugin development!
*/
/** 
  * Test if Browser is Opera {true/false}
  * @name _Opera_
  * @deprecated Only for module and plugin development!
*/
/** 
  * Test if Browser is IE {true/false}
  * @name _IE_
  * @deprecated Only for module and plugin development!
*/
/** 
  * Test if Browser is IE 6 {true/false}
  * @name _IE_6_
  * @deprecated Only for module and plugin development!
*/
/** 
  * Test if Browser is IE 7 {true/false}
  * @name _IE_7_
  * @deprecated Only for module and plugin development!
*/
/** 
  * Test if Browser is IE 8 {true/false}
  * @name _IE_8_
*/
/** 
  * Test if Browser is IE 6 or 7 {true/false}
  * @name _IE_6_7_
  * @deprecated Only for module and plugin development!
*/
/** 
  * Test if Browser is 6 or 8 {true/false}
  * @name _IE_6_8_
  * @deprecated Only for module and plugin development!
*/
/** 
  * Test if Browser is IE 7 or 8 {true/false}
  * @name _IE_7_8_
  * @deprecated Only for module and plugin development!
*/
/** 
  * Test if Browser is IE 6 or 7 or 8 {true/false}
  * @name _IE_6_7_8_
  * @deprecated Only for module and plugin development!
*/
/** 
  * Test if Browser is IE 9 {true/false}
  * @name _IE_9_
*/
/** 
  * Path to Mashi Application directory
  * @name MASHI_APP_PATH
*/

var mashi, _m_, _ma_, _WebKit_, _Safari_, _Chrome_, _Opera_, 
  _IE_, _IE_6_, _IE_7_, _IE_8_, _IE_6_7_, _IE_6_8_, _IE_7_8_, _IE_6_7_8_, _IE_9_,
  MASHI_APP_PATH = MASHI_APP_PATH ? MASHI_APP_PATH : '';

(function () {

  "use strict";

  /* mashi object */
  mashi = {
    version: '1.0.0',
    id: arguments[0],
    namespace: null,
    position: {
      X: null,
      Y: null
    },
    frame: {
      object: null,
      array: [],
      current: 'odd',
      odd: null,
      oddid: null,
      even: null,
      evenid: null,
      interval: 0,
      num: 0,
      finished: false,
      fading: true
    },
    label: {
      stage: 'stageframe',
      canvas: 'canvasframe',
      text: {
        self: 'textframe',
        parent: 'textframe_p',
        grandparent: 'textframe_gp'
      },
      button: {
        base: 'controls-button-',
        start: 'controls-button-start',
        stop: 'controls-button-stop'
      }
    },
    delay: {
      sum: 0,
      auto: false
    },
    accessible: null,
    canvas: false,
    path: '',
    image: {
      array: []
    },
    fade: {},
    meta: {},
    buttons: {},
    control: {},
    loaded_modules: [],
    intervals: [],
    pager: 'pager',
    running: false,
    min: false
  };

  /* default app configuration */
  mashi.defaults = {
    meta: {
      namespace: 'app',
      title: 'none',
      author: 'unknown'
    },
    animation: {
      fade: {
        duration: 300,
        steps: 20,
        start: 0,
        end: 1
      },
      canvas: false,
      start: false,
      rewind: false,
      accessible: 'stage'
    },
    buttons: {
      type: false,
      text: false,
      position: {
        vertical: 'bottom',
        horizontal: 'right'
      }
    },
    style: {
      backgroundImage: 'none',
      backgroundColor: '#FFFFFF',
      reset: true
    },
    frames: []
  };

  _m_ = mashi; // internal shortcut

  // get browsers versions
  _m_.uA = function (re) {
    var nua = navigator.userAgent;
    return (re.test(nua)) ? true : false;
  };
  _WebKit_ = _m_.uA(/WebKit/);
  _Safari_ = (_m_.uA(/Safari/) && !_m_.uA(/Chrome/)) ? true : false;
  _Chrome_ = (_m_.uA(/Safari/) && _m_.uA(/Chrome/)) ? true : false;
  _Opera_ = _m_.uA(/Opera/);
  _IE_ = _IE_6_7_8_ = _m_.uA(/MSIE (6|7|8)/);
  _IE_6_ = _m_.uA(/MSIE 6/);
  _IE_7_ = _m_.uA(/MSIE 7/);
  _IE_8_ = _m_.uA(/MSIE 8/);
  _IE_6_7_ = _m_.uA(/MSIE (6|7)/);
  _IE_6_8_ = _m_.uA(/MSIE (6|8)/);
  _IE_7_8_ = _m_.uA(/MSIE (7|8)/);
  _IE_9_ = _m_.uA(/MSIE 9/);

  /** 
    * @constructor
    * @example
    * var app = new mashi.application();
  */
  mashi.application = function () {

    var parentNode, oldcontent, frame_clone, canvasframe, textframe_gp, textframe_p, textframe, 
      started, startTime, timestamp, all, old_bg_color, old_bg_image;
   
    /** 
      * Type of Distribution. 
      * @default false 
      *
      * @example
      * // If 'system' directory in the same directory 
      * // as the 'application' directory:
      * app.distributed = false;
      *  
      * // otherwise (eg. loading 'system' directory 
      * // from Appspot-CDN):
      * app.distributed = true;
    */
    this.distributed = false;
    this.global = {};
    this.section = null;
    this.javascripts = {
      files: 0,
      loaded: 0
    };
    this.hook = {
      before: null,
      after: null
    };

    _m_.self = this;
    _ma_ = this;

    /** 
      * App configuration. Here you can change the settings of your application. 
      * @param {Object}  configuration                                       App configuration object.
      * @param {Object}  configuration.meta                                  App meta object.
      * @param {String}  [configuration.meta.author="unknown"]               App author name.
      * @param {String}  [configuration.meta.title="none"]                   App title.
      * @param {String}  [configuration.meta.namespace="app"]                App namespace.
      * @param {String}  [configuration.display=namespace]                   Target id.
      * @param {Object}  configuration.animation                             App animation object.
      * @param {Object}  configuration.animation.fade                        App animation fade object.
      * @param {String}  [configuration.animation.fade.duration="300"]       Fade duration.
      * @param {String}  [configuration.animation.fade.steps="20"]           Fade steps.
      * @param {String}  [configuration.animation.fade.start="1"]            Fade opacity start value.
      * @param {String}  [configuration.animation.fade.end="0"]              Fade opacity end value.
      * @param {Boolean} [configuration.animation.canvas="false"]            Append canvas layer.
      * @param {Boolean} [configuration.animation.start="false"]             Automatical app start.
      * @param {Boolean} [configuration.animation.rewind="false"]            App rewind at end.
      * @param {String}  [configuration.animation.accessible="stage"]        Accessible Layer (Stage or Text).
      * @param {Object}  configuration.buttons                               App buttons object (requires module controls).
      * @param {String}  [configuration.buttons.type="none"]                 App buttons type (none, single, movie, slideshow, all).
      * @param {Object}  configuration.buttons.position                      App buttons position data.
      * @param {String}  [configuration.buttons.position.vertical="bottom"]  App buttons vertical position (top, middle, bottom).
      * @param {String}  [configuration.buttons.position.horizontal="right"] App buttons horizontal position (left, center, right).
      *
      * @example
      * app.config(configuration);
    */
    this.config = function (c) {

      if (_ma_.global.wait !== true) {
        setTimeout(function () {
          _ma_.config(c);
          _ma_.global.wait = true;
        }, 1000);
        return;
      }

      // Load user configuration or if not defined, use default values from _m_.defaults object
      // Meta data
      this.title = (c.meta !== undefined  && c.meta.title !== undefined) ? c.meta.title : _m_.defaults.meta.title;
      this.author = (c.meta !== undefined && c.meta.author !== undefined) ? c.meta.author : _m_.defaults.meta.author;
      _m_.namespace = (c.meta !== undefined && c.meta.namespace !== undefined) ? c.meta.namespace : _m_.defaults.meta.namespace;
      //_m_.namespace = _ma_.getInstanceName();

      // Background layer IDs
      _m_.frame.oddid = (c.display !== undefined) ? c.display : _m_.namespace;
      _m_.frame.evenid = (c.display !== undefined) ? c.display + "-copy" : _m_.namespace + "-copy";
      // Animation (fading, canvas, rewind, autostart, accessiblity layer)
      _m_.fade.duration = (c.fade !== undefined && c.fade.duration !== undefined) ? c.fade.duration : _m_.defaults.animation.fade.duration;
      _m_.fade.steps = (c.fade !== undefined && c.fade.steps !== undefined) ? c.fade.steps : _m_.defaults.animation.fade.steps;
      _m_.fade.start = (c.fade !== undefined && c.fade.start !== undefined) ? c.fade.start : _m_.defaults.animation.fade.start;
      _m_.fade.end = (c.fade !== undefined && c.fade.end !== undefined) ? c.fade.end : _m_.defaults.animation.fade.end;
      _m_.reset = (c.style !== undefined && c.style.reset !== undefined) ? c.style.reset : _m_.defaults.reset;
      _m_.canvas = (c.animation !== undefined && c.animation.canvas !== undefined) ? c.animation.canvas : _m_.canvas;
      _m_.start = (c.animation !== undefined && c.animation.start !== undefined) ? c.animation.start : _m_.defaults.animation.start;
      _m_.rewind = (c.animation !== undefined && c.animation.rewind !== undefined) ? c.animation.rewind : _m_.defaults.animation.rewind;
      _m_.accessible = (c.animation !== undefined && c.animation.accessible !== undefined) ? c.animation.accessible : _m_.defaults.animation.accessible;

      // App controls (buttons)
      _m_.buttons.type = (c.buttons !== undefined && c.buttons.type !== undefined) ? c.buttons.type : _m_.defaults.buttons.type;
      _m_.buttons.text = (c.buttons !== undefined && c.buttons.text !== undefined) ? c.buttons.text : _m_.defaults.buttons.text;
      _m_.buttons.vertical = (c.buttons !== undefined && c.buttons.position !== undefined && c.buttons.position.vertical !== undefined) ? c.buttons.position.vertical : _m_.defaults.buttons.position.vertical;
      _m_.buttons.horizontal = (c.buttons !== undefined && c.buttons.position !== undefined && c.buttons.position.horizontal !== undefined) ? c.buttons.position.horizontal : _m_.defaults.buttons.position.horizontal;

      // Cancel app, if target HTML element (id === namespace) not exists 
      if (this.$(_m_.frame.oddid) === null) {
        return;
      }
      
      this.addMashiStylesheets();
      
      this.frames = _m_.frame.array;

      // Create app layer (backgrounds, stage, text, canvas) 
      this.createLayer();

      // If module 'controls' is loaded, create app controls (buttons) 
      if (typeof _mac_ !== "undefined" && _m_.buttons.type !== 'none') {
        _mac_.create();
      }

      // If module 'preloder' is loaded, start image preload from frameset(s)
      if (typeof this.preloader !== "undefined" && this.frames.length > 0) {
        this.$("mashi-controls").style.display = "none";
        this.preloader.init();
      } else if (_m_.start === true) { // otherwise start app, if 'auto start' is defined
        this.start();
      }
      
      _m_.test_object = new mashi.object({
        id: "test_object"
      });


    };

    /** 
      * Get length of mashi application
      * @param {String} timeunit (msec, sec, min)
      * @return {String}
      * 
      * @example
      * app.getLength('msec');
    */
    this.getLength = function (timeunit) {
      this.str = '';
      if (timeunit === 'msec') {
        this.str += _m_.delay.sum + ' msecs';
      } else if (timeunit === 'sec' || timeunit === '') {
        this.str += _m_.delay.sum / 1000 + ' secs';
      } else if (timeunit === 'min') {
        this.str += _m_.delay.sum / 60000 + ' mins';
      }
      return this.str;
    };

    /** 
      * Create app layer
      * @private
    */
    this.createLayer = function () {

      _m_.frame.odd = this.$(_m_.frame.oddid);
      oldcontent = _m_.frame.odd.innerHTML;
      _m_.frame.odd.innerHTML = "";
      _m_.frame.odd.style.display = "block";
      _m_.position.X = this.findPosX(_m_.frame.odd) + "px"; // ???
      _m_.position.Y = this.findPosY(_m_.frame.odd) + "px"; // ???
      parentNode = _m_.frame.odd.parentNode;
      parentNode.style.position = 'relative';

      if (!this.$(_m_.frame.evenid)) {
        frame_clone = _m_.frame.odd.cloneNode(true);
        frame_clone.setAttribute('id', _m_.frame.evenid);
        frame_clone.setAttribute('class', _m_.id);
        parentNode.appendChild(frame_clone);
        _m_.frame.even = this.$(_m_.frame.evenid);
        _m_.frame.even.style.position = "absolute";
      }

      if (_m_.canvas === true) {
        canvasframe = document.createElement('canvas');
        canvasframe.setAttribute('class', _m_.id);
        canvasframe.setAttribute('id', _m_.label.canvas);
        canvasframe.setAttribute('width', _m_.frame.odd.offsetWidth);
        canvasframe.setAttribute('height', _m_.frame.odd.offsetHeight);
        canvasframe.style.position = "absolute";
        canvasframe.style.zIndex = "101";
        parentNode.appendChild(canvasframe);

        // iecanvas hack
        if (!canvasframe.getContext) {
          if (typeof G_vmlCanvasManager !== 'undefined') {
            G_vmlCanvasManager.initElement(canvasframe);
            canvasframe = _m_.self.$(_m_.label.canvas);
          }
        }
      }

      if (!this.$(_m_.label.stage)) {
        _m_.stageframe = _m_.frame.odd.cloneNode(true);
        _m_.stageframe.setAttribute('id', _m_.label.stage);
        _m_.stageframe.style.zIndex = (_m_.accessible === "stage") ? "110" : "102";
        _m_.stageframe.style.backgroundColor = "transparent";
        parentNode.appendChild(_m_.stageframe);
      }
      if (!this.$(_m_.label.text.self)) {
        textframe_gp = document.createElement('div');
        textframe_gp.setAttribute('class', _m_.id);
        textframe_gp.setAttribute('id', _m_.label.text.grandparent);
        textframe_gp.style.zIndex = "103";
        parentNode.appendChild(textframe_gp);
        parentNode.style.overflow = 'hidden';
        textframe_p = document.createElement('div');
        textframe_p.setAttribute('id', _m_.label.text.parent);
        textframe_p.style.zIndex = "104";
        textframe_gp.appendChild(textframe_p);
        textframe = document.createElement('div');
        textframe.setAttribute('id', _m_.label.text.self);
        textframe.style.zIndex = "105";
        textframe_p.appendChild(textframe);
        if (_m_.frame.array.length === 0) {
          textframe.innerHTML = oldcontent;
        }
      }
      _m_.frame.object = this.$(_m_.frame.oddid);

    };

    /** 
      * Start app
      *
      * @example
      * app.start();
    */
    this.start = function () {

      /*
      if (_m_.frame.num === 0 && _mao_.objects.length > 0) {
      // remove objects if exists
      for(var i=0;1< _mao_.objects.length; i += 1) {
        var obj = this.$(_mao_.objects[i]);
        obj.parentNode.removeChild(obj);
      }
      }
      */
      
      _ma_.global.stop = true;
      
      if (_m_.frame.num === _m_.frame.array.length) {
        this.clearStage();
      }

      if (_m_.canvas === true) {

        if (_IE_8_) {
          _m_.stageframe = this.$(_m_.label.stage);
          //this.$(_m_.label.text.self).innerHTML = "";
          //_m_.stageframe.innerHTML = "";
          if (_m_.running === false) {
            var el = this.$(_m_.label.canvas);
            el.parentNode.removeChild(el);

            canvasframe = document.createElement('canvas');
            canvasframe.setAttribute('class', _m_.id);
            canvasframe.setAttribute('id', _m_.label.canvas);
            canvasframe.setAttribute('width', _m_.frame.odd.offsetWidth);
            canvasframe.setAttribute('height', _m_.frame.odd.offsetHeight);
            canvasframe.style.position = "absolute";
            canvasframe.style.zIndex = "101";

            parentNode = _m_.frame.odd.parentNode;
            parentNode.insertBefore(canvasframe, _m_.stageframe);
            // iecanvas hack
            if (typeof G_vmlCanvasManager !== 'undefined') {
              G_vmlCanvasManager.initElement(canvasframe);
              canvasframe = _m_.self.$(_m_.label.canvas);
            }

          }

        }

      }
      if (_m_.buttons.type === "single") {
        if (this.$(_m_.label.button.start)) {
          this.$(_m_.label.button.start).style.display = "none";
        }
        if (this.$(_m_.label.button.stop)) {
          this.$(_m_.label.button.stop).style.display = "inline-block";
        }
      }
      started = false;
      startTime = 0;
      timestamp = 0;

      all = _m_.frame.array.length;
      if (_m_.frame.num <= 0 || all - 1 === _m_.frame.num || all === _m_.frame.num) {
        _m_.frame.num = 0;
      } else {
        _m_.frame.num += 1;
      }

      if (all > 0 && _m_.frame.array[_m_.frame.num] !== undefined) {

        // main function
        _m_.frame.interval = setInterval(function () {

          // debugger: show frame number
          if (_ma_.$('frame-counter')) {
            if (_m_.frame.num < _m_.frame.array.length) {
              _ma_.$('frame-counter').innerHTML = _m_.frame.num + 1;
            }
          }

          // Get Section
          if (_m_.frame.array[_m_.frame.num] !== undefined) {
            _m_.self.section = _m_.frame.array[_m_.frame.num][2];
          }

          if (_m_.frame.num < all) {
            if (_ma_.isOdd(_m_.frame.num)) {
              if (_m_.frame.current === 'even') {
                old_bg_color = _ma_.$(_m_.frame.evenid).style.backgroundColor;
                old_bg_image = _ma_.$(_m_.frame.evenid).style.backgroundImage;
                if (_m_.frame.num !== 0) {
                  if (_m_.frame.fading === true) {
                    _ma_.fadeOut(_m_.frame.evenid, _m_.fade.duration, _m_.fade.steps, _m_.fade.end);
                  }
                }
                _m_.frame.object = _ma_.$(_m_.frame.oddid);
                _m_.frame.object.style.backgroundColor = old_bg_color;
                _m_.frame.object.style.backgroundImage = old_bg_image;
                if (_m_.frame.fading === true) {
                  _ma_.fadeIn(_m_.frame.oddid, _m_.fade.duration, _m_.fade.steps, _m_.fade.start);
                  _ma_.fadeIn(_m_.label.text.self, _m_.fade.duration, _m_.fade.steps, _m_.fade.start);
                }
              }
              _m_.frame.current = 'odd';
            } else {
              if (_m_.frame.current === 'odd') {
                if (_ma_.$(_m_.frame.oddid) === null) { return; }
                old_bg_image = _ma_.$(_m_.frame.oddid).style.backgroundImage;
                if (_m_.frame.num !== 0) {
                  if (_m_.frame.fading === true) {
                    _ma_.fadeOut(_m_.frame.oddid, _m_.fade.duration, _m_.fade.steps, _m_.fade.end);
                  }
                }
                _m_.frame.object = _ma_.$(_m_.frame.evenid);
                _m_.frame.object.style.backgroundColor = old_bg_color;
                _m_.frame.object.style.backgroundImage = old_bg_image;
                if (_m_.frame.fading === true) {
                  _ma_.fadeIn(_m_.frame.evenid, _m_.fade.duration, _m_.fade.steps, _m_.fade.start);
                  _ma_.fadeIn(_m_.label.text.self, _m_.fade.duration, _m_.fade.steps, _m_.fade.start);
                }
              }
              _m_.frame.current = 'even';
            }
          }
          if (_m_.frame.num < all) {
            this.delay = _m_.frame.array[_m_.frame.num][0];
            if (this.delay === "auto") {
              //_m_.frame.finished = false;
              if (started === false) {
                _ma_.callSlideFunc();
                started = true;
              }
              if (_m_.frame.finished === true) {
                _m_.frame.num += 1;
                started = _m_.frame.finished = false;
              }
            } else {
              if (startTime === 0) {
                startTime = (new Date()).getTime();
                _ma_.callSlideFunc();
              }
              timestamp = (new Date()).getTime();
              if (startTime + this.delay <= timestamp) {
                startTime = timestamp = 0;
                _m_.frame.num += 1;
              }
            }
          } else {
            clearInterval(_m_.frame.interval);
            if (_m_.rewind === true) {
              //_ma_.flipToNumber(0);
              _ma_.start();
            }
            if (_m_.buttons.type === "single") {
              _ma_.$(_m_.label.button.start).style.display = "inline-block";
              _ma_.$(_m_.label.button.stop).style.display = "none";
            }
          }
          _m_.running = true;
        }, 25);
      }
    };

    /** 
      * Stop app
      *
      * @example
      * app.stop();
    */
    this.stop = function () {
      clearInterval(_m_.frame.interval);
      if (_m_.buttons.type === "single") {
        this.$(_m_.label.button.start).style.display = "inline-block";
        this.$(_m_.label.button.stop).style.display = "none";
      }
    };

    /** 
      * Flip to first app frame
      *
      * @example
      * app.first();
    */
    this.first = function () {
      this.flipToNumber(0);
    };

    /** 
      * Flip to previous app frame
      *
      * @example
      * app.prev();
    */
    this.prev = function () {
      if (_m_.frame.num > 0) {
        _m_.frame.num -= 1;
        this.flipToNumber(_m_.frame.num);
      }
    };

    /** 
      * Flip to next app frame
      *
      * @example
      * app.next();
    */
    this.next = function () {
      if (_m_.frame.num < _m_.frame.array.length - 1) {
        _m_.frame.num += 1;
        this.flipToNumber(_m_.frame.num);
      }
    };

    /** 
      * Flip to last app frame
      *
      * @example
      * app.last();
    */
    this.last = function () {
      _m_.frame.num = _m_.frame.array.length - 1;
      this.flipToNumber(_m_.frame.num);
      this.hideEmptyDisplay();
    };

    /** 
      * Add frame to mashi application
      * @param {Number|String} delay in milliseconds or'auto' (finish frame with '_m_.frame.finished = true' statement from frame function  )
      * @param {Function} fn
      * 
      * @example
      * app.add(1000, function () {});
    */
    this.add = function (delay, fn) {
      if (arguments.length === 2) {
        _m_.frame.array.push([delay, fn]);
      } else if (arguments.length === 3) {
        _m_.frame.array.push([delay, fn, arguments[2]]);
      }
      if (delay === 'auto') {
        _m_.delay.auto = true;
      } else {
        _m_.delay.sum += delay;
      }
    };

    /** 
      * Add frame section to mashi application
      * @param {String} frame section id (for usage as unique jump target like 'app.flipToSection('contact');')
      * @param {Function} [callback]
      * 
      * @example
      * app.addSection('contact', function () {});
    */
    this.addSection = function () {

      // Clear the text layer
      _m_.self.add(100, function () {
        _m_.self.set({
          html: ' '
        });
      });

      var arg;
      if (arguments[1] && (typeof arguments[1] !== 'function')) {
        arg = arguments[1];
        if (arguments[2] && (typeof arguments[2] === 'function')) {
          window.addFunc = arguments[2];
        }
      } else if (arguments[1] && (typeof arguments[1] === 'function')) {
        window.addFunc = arguments[1];
      }

      _m_.self.add(100, function () {
        _m_.self.clearStage(arg);
        if (window.addFunc) {
          window.addFunc();
        }
      }, arguments[0]); // ?????????

    };

    /** 
      * Wait / Add empty frame
      * @param {Integer} duration
      * 
      * @example
      * app.wait(1000);
    */
    this.wait = function (duration) {
      if (!arguments[1]) {
        _m_.self.add(duration, function () {});
      } else {
        _m_.self.add(duration, arguments[1]);
      }
    };

    /** 
      * Set frame properties
      * @param {Object} params                                           Frame params object.
      * @param {Object} params.position                                  Frame params position object.
      * @param {String} params.position.vertical (style.verticalAlign)   Frame vertical position.
      * @param {String} params.position.horizontal (style.textAlign)     Frame horizontal position.
      * @param {String} params.position.padding (style.padding)          Frame padding.
      * @param {Object} params.style (css properties)                    Frame style object.
      * @param {String} params.html (innerHTML)                          Frame text content.
      * 
      * @example
      * app.set(params);
    */
    this.set = function (params) {
      
      var property;
      
      if (textframe === undefined) { return; }
      if (!params || params === '' || params === 'undefined') {
        textframe.innerHTML = "";
        return;
      }
      if (params.position && params.position.vertical) {
        textframe.style.verticalAlign = params.position.vertical;
      }
      if (params.position && params.position.horizontal) {
        textframe.style.textAlign = params.position.horizontal;
      }
      if (params.position && params.position.padding) {
        textframe.style.padding = params.position.padding;
      }
      if (params.style) {
        for (property in params.style) {
          if (params.style.hasOwnProperty(property)) {
            if (/background/i.test(property)) {
              _m_.frame.object.style[property] = params.style[property];
            } else {
              textframe.style[property] = params.style[property];
            }
          }
        }
      }

      if (params.html !== undefined) {
        textframe.innerHTML = (params.html !== '') ? params.html : ' ';
      }
    };

    /** 
      * Shortcut for document.getElementById
      * @param {String} id Element id.
      * 
      * @example
      * var header = app.$('header');
    */
    this.$ = function (id) {
      return document.getElementById(id);
    };

    /** 
      * Shortcut for document.getElementsByTagName
      * @param {String} id Tag name.
      * 
      * @example
      * var divs = app.$$('div');
    */
    this.$$ = function (tagname) {
      return document.getElementsByTagName(tagname);
    };

    /** 
      * Flip to frame by number
      * @param {Integer} i Frame number.
      * 
      * @example
      * app.flipToNumber(7);
    */
    this.flipToNumber = function (i) {
      if (_m_.frame.array[i] !== undefined) {
        clearInterval(_m_.frame.interval);
        this.clearDisplay();
        _m_.frame.num = i;
        this.callSlideFunc();
      }
    };

    /** 
      * Flip to frame section by id
      * @param {String} id Section id.
      * 
      * @example
      * app.flipToSection('contact');
    */
    this.flipToSection = function (id) {
      
      var i;
      
      for (i = 0; i < _m_.frame.array.length; i += 1) {
        if (_m_.frame.array[i][2] && _m_.frame.array[i][2] === id) {
          _m_.self.flipToNumber(i - 1);
          _m_.self.start();
        }
      }
    };

    /** @private */
    this.clearBackground = function (id) {
      if (this.$(id) === null) { return; }
      this.$(id).style.backgroundImage = "none";
      this.$(id).style.backgroundColor = "transparent";
    };

    /** @private */
    this.hideEmptyDisplay = function () {
      if (_m_.frame.current === 'odd') {
        _m_.frame.even.style.display = "none";
      } else {
        _m_.frame.odd.style.display = "none";
      }
    };

    /** @private */
    this.clearDisplay = function () {
      this.clearBackground(_m_.frame.oddid);
      this.clearBackground(_m_.frame.evenid);
    };

    /** @private */
    this.clearStage = function () {

      var a, stage, divs, k, i, l, a2 = [];
      a = arguments[0];
      stage = this.$(_m_.label.stage);
      divs = stage.getElementsByTagName('div');

      switch (typeof a) {

      case 'undefined':
        stage.innerHTML = '';
        break;

      case 'string':
        for (k = divs.length - 1; k >= 0; k -= 1) {
          if (divs[k].id !== a) {
            try {
              stage.removeChild(divs[k]);
            } catch (e) {}
          }
        }
        break;

      case 'object':
        if (a instanceof Array) {
          //No non-array-objects supported
          for (i = 0; i < divs.length; i += 1) {
            for (l = 0; l < a.length; l += 1) {
              if (divs[i].id === a[l]) {
                a2[i] = 'nodelete';
              } else {
                if (a2[i] !== 'nodelete') {
                  a2[i] = 'delete';
                }
              }
            }
          }
          for (k = a2.length; k >= 0; k -= 1) {
            if (a2[k] === 'delete') {
              stage.removeChild(divs[k]);
            }
          }
        }
        break;
      }

    };

    /** @private */
    this.callSlideFunc = function () {

      /* Post Hook */
      if (_m_.running === true) {
        if (_ma_.hook.post !== null && typeof _ma_.hook.post === 'function') {
          _ma_.hook.post();
        }
      }

      /* Pre Hook */
      if (_ma_.hook.pre !== null && typeof _ma_.hook.pre === 'function') {
        _ma_.hook.pre();
      }

      if (_m_.frame.array[_m_.frame.num] !== 'undefined') {
        if (typeof _m_.frame.array[_m_.frame.num][1] !== 'string') {
          _m_.frame.array[_m_.frame.num][1]();
        }
      }
    };

    /** @private */
    this.isOdd = function (num) {
      return num % 2;
    };

    /** @private */
    this.findPosY = function (obj) {
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

    /** @private */
    this.findPosX = function (obj) {
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

    /** @private */
    this.setOpacity = function (id, value) {

      var finalValue, element;

      finalValue = (value > 1) ? 1 : ((value < 0) ? 0 : value);
      element = this.$(id);
      if (element === null) {
        return;
      }
      /* FF/Opera/Safari/Chrome */
      element.style.opacity = finalValue;
      /* IE8 */
      element.style.MsFilter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + (finalValue * 100) + ")";
      /* IE6/IE7 */
      element.style.filter = "alpha(opacity=" + (finalValue * 100) + ")";

    };

    /** @private */
    this.fadeIn = function (id, fade_duration, fade_steps, fade_start) {
      
      var i;
      
      for (i = 0; i <= 1; i += (1 / fade_steps)) {
        setTimeout("_ma_.setOpacity('" + id + "', " + i + ")", i * fade_duration);
      }

    };

    /** @private */
    this.fadeOut = function (id, fade_duration, fade_steps, fade_end) {

      var i;
      
      for (i = 0; i <= fade_end; i += (1 / fade_steps)) {
        setTimeout("_ma_.setOpacity('" + id + "', " + (1 - (2 * (1 / fade_steps)) - i) + ")", i * fade_duration);
      }
      /*
      if ( _IE_8_ && _ma_.$(id).hasChildNodes() ) {
        _ma_.$(id).removeChild( _ma_.$(id).firstChild );     
      }
      */

    };

    /** 
      * Add scenery object to stage layer 
      * @param {Object} params                                           Scenery params object.
      * @param {String} params.id                                        Scenery object id.
      * @param {Object} params.style (css properties)                    Scenery style object.
      * @param {String} params.className                                 Scenery object className.
      * 
      * @example
      * app.scenery({
      *  id: 'background', 
      *  className: 'parallax', 
      *  style: {
      *    backgroundImage: "url(" + MASHI_APP_PATH + "parallax.jpg)"
      *  }
      * });
    */ 
    this.scenery = function (params) {

      var property, scenery = document.createElement('div');
      if (params.className) {
        scenery.setAttribute((document.all ? 'className' : 'class'), params.className);
      }
      if (params.style) {
        for (property in params.style) {
          if (params.style.hasOwnProperty(property)) {
            scenery.style[property] = params.style[property];
          }
        }
      }
      if (params.id) {
        scenery.id = params.id; 
        _ma_.$('stageframe').appendChild(scenery);
      }

    };

    /** @private */
    this.setPath = function (path) {
      _m_.path = path;
    };

    /** @private */
    this.addScript = function (src) {
      
      _ma_.javascripts.files += 1;

      var headID, newScript;
      headID = document.getElementsByTagName("head")[0];
      newScript = document.createElement('script');
      newScript.type = 'text/javascript';
      newScript.defer = 'defer';
      newScript.async = false;
      newScript.src = src;
      /** @private */
      newScript.onreadystatechange = function () {
        if (newScript.readyState === 'loaded') {
          newScript.onreadystatechange = null;
          _ma_.javascripts.loaded += 1;
        }
      };
      /** @private */
      newScript.onload = function () {
        _ma_.javascripts.loaded += 1;
      };
      headID.appendChild(newScript);

    };

    /** 
      * Checks if all scripts loaded and fires the callback function.
      * @param {Function} callback Callback function
      * 
      * @example
      * app.isReady(function () {});
    */ 
    this.isReady = function (callback) {
      var ival = setInterval(function () {
        if (_ma_.javascripts.loaded >= _ma_.javascripts.files) {
          callback();
          clearInterval(ival);
        }
      }, 100);
    };

    /** @private */
    this.addStylesheet = function (href) {

      var headID, newStylesheet;

      headID = document.getElementsByTagName("head")[0];
      newStylesheet = document.createElement('link');
      newStylesheet.type = 'text/css';
      newStylesheet.rel = 'stylesheet';
      newStylesheet.href = href + '.css';
      headID.appendChild(newStylesheet);

    };

    /** @private */
    this.addMashiStylesheets = function () {

      var fullpath = _ma_.getBasePath(), 
        basepath = fullpath.split("system")[0],
        path2systemStyles = basepath + 'system/stylesheets/',
        path2appStyles = basepath + 'application/',
        lbody = document.getElementsByTagName("body")[0],
        limg = document.createElement("img");
      
      limg.src = basepath + "system/images/loader.gif";
      limg.width = "100px";
      limg.height = "100px";
      lbody.appendChild(limg);

      if (_m_.reset) {
        _ma_.addStylesheet(path2systemStyles + 'mashi.reset');
      }
      _ma_.addStylesheet(path2systemStyles + 'mashi');

      if (_Opera_) { 
        _ma_.addStylesheet(path2systemStyles + 'mashi.hacks.opera'); 
      } else if (_IE_) { 
        _ma_.addStylesheet(path2systemStyles + 'mashi.hacks.ie'); 
      }

      if (_IE_6_) { 
        _ma_.addStylesheet(path2systemStyles + 'mashi.hacks.ie6'); 
      } else if (_IE_7_) { 
        _ma_.addStylesheet(path2systemStyles + 'mashi.hacks.ie7'); 
      } else if (_IE_8_) { 
        _ma_.addStylesheet(path2systemStyles + 'mashi.hacks.ie8'); 
      }

      if (_ma_.distributed) {
        _ma_.addStylesheet(MASHI_APP_PATH + 'custom');
      } else {
        _ma_.addStylesheet(path2appStyles + 'custom');
      }

    };
  
    /** @private */
    this.getBasePath = function () {
      var scripts, all, src, l, i;
      scripts = this.$$("script");
      all = scripts.length;
      for (i = 0; i < all; i += 1) {
        src = scripts[i].getAttribute("src");
        if (src !== null) {
          l = src.lastIndexOf("/") + 1;
          if (src.slice(l) === "mashi.min.js" || src.slice(l) === "mashi.all.min.js") {
            mashi.min = true;
          }
          if (src.slice(l) === "mashi.js" || src.slice(l) === "mashi.min.js" || src.slice(l) === "mashi.all.min.js") {
            return src.slice(0, l);
          }
        }
      }
      return false;
    };

    // TODO: Fix it for IE (method not used yet)
    /** @private */
    this.getInstanceName = function () {
      
      var v;
      
      for (v in window) {
        if (window.hasOwnProperty(v)) {
          try {
            // v !== '_ma_' only for chrome8 
            if (v !== '_ma_' && window[v] instanceof mashi.application) {
              return v;
            }
          } catch (e) {}
        }
      }
      return false;
    };

    /** 
      * Get each element with a given class name 
      * @constructor
      * @param {String} selector CSS selector      
    */ 
    this.each = function (selector) {

      var parts, tagname, classname, classElements = [],
        i, j, els, pattern, toggleOpacity, delay, speed, steps, opacity, num, k, l, fade, initTimeout;

      parts = selector.split('.');
      if (parts.length > 1) {
        tagname = (parts[0] !== '') ? parts[0] : 'div';
        classname = parts[1];
      } else {
        tagname = 'div';
        classname = selector;
      }

      _m_.stageframe = _ma_.$(_m_.label.stage);
      els = _m_.stageframe.getElementsByTagName(tagname);
      pattern = new RegExp("(^|\\s)" + classname + "(\\s|$)");
      for (i = 0, j = 0; i < els.length; i += 1) {
        if (pattern.test(els[i].className)) {
          classElements[j] = els[i];
          j += 1;
        }
      }

      /** @private */
      toggleOpacity = function (c) {

        delay = (c.delay) ? c.delay : 10;
        speed = (c.speed) ? c.speed : _m_.defaults.animation.fade.speed;
        steps = (c.steps) ? c.steps : _m_.defaults.animation.fade.steps;
        opacity = c.opacity;

        num = 0;
        fade = (c.type === 'out') ? _ma_.fadeOut : _ma_.fadeIn;

        for (k = 0, l = 0; k < classElements.length; k += 1) {
          if (classElements[k]) {
            l += delay;
            initTimeout(fade, l, classElements[num].id, speed, steps, opacity);
            num += 1;
          }
        }
      };

      /** @private */
      initTimeout = function (fade, l, id, speed, steps, opacity) {
        setTimeout(function () {
          fade(id, speed, steps, opacity);
        }, l);

      };

      /** @lends mashi.application#each */
      return {

        /** 
          * Disappear all matched elements / objects 
          * @param {Object} configuration Disappear configuration object
          * 
          * @example
          * app.each('.asset').disappear({
          *   delay: 50,
          *   speed: 1000,
          *   steps: 20,
          *   opacity: 1
          * });

        */ 
        disappear: function (c) {
          c = (c) ? c : {};
          c.opacity = (c.opacity) ? c.opacity : 1;
          c.type = 'out';
          toggleOpacity(c);
        },

        /** 
          * Appears all matched elements / objects 
          * @param {Object} configuration Appear configuration object
          * 
          * @example
          * app.each('.asset').appear({
          *   delay: 50,
          *   speed: 1000,
          *   steps: 20,
          *   opacity: 1
          * });
        */ 
        appear: function (c) {
          c = (c) ? c : {};
          c.opacity = (c.opacity) ? c.opacity : 0;
          c.type = 'in';
          toggleOpacity(c);
        },

        /** 
          * Removes all matched elements / objects 
          * 
          * @example
          * app.each('.asset').remove();
        */ 
        remove: function () {
          
          var k;
          
          for (k = 0; k < classElements.length; k += 1) {
            if (classElements[k]) {
              classElements[k].parentNode.removeChild(classElements[k]);
            }
          }

        }

      };

    };

  };

  /** 
    * Load plugin.
    * @constructor
    * @param {String} component Path and name of plugin (without '.js' file extension)
    *
    * @example
    * // canvas/circles.js
    * mashi.plugin('canvas.circles');
  */
  mashi.plugin = function (component) {

    var base_path, root_path, component_path;

    if (!component) {
      return;
    } else {
      base_path = _m_.self.getBasePath();
      root_path = base_path.split('system')[0];
      component_path = component.split('.').join('/');
      _m_.self.addScript(root_path + 'plugins/' + component_path + '.js');
    }

  };

  /** 
    * Load mashi frameset.
    * @constructor
    * @param {String} component Path and name of frameset (without '.js' file extension)
    *
    * @example
    * // content/app.js
    * mashi.frameset('content.app');
  */
  mashi.frameset = function () {

    var base_path, root_path, component_path,
      component = arguments[0] ? arguments[0] : false;

    if (!component) {
      return;
    } else {
      if (!_ma_.distributed) {
        base_path = _m_.self.getBasePath();
        root_path = base_path.split('system')[0] + 'application/';
      } else {
        root_path = MASHI_APP_PATH;
      }
    }
    component_path = component.split('.').join('/');      
    _m_.self.addScript(root_path + component_path + '.js');

  };

  /** 
    * Load mashi module.
    * @constructor
    * @param {String} component Path and name of module (without '.js' file extension)
    *
    * @example
    * mashi.module('preloader');
    * 
    * mashi.module('object.animation'); 
    * // loads module object automatically
    *
    * mashi.module('all'); 
    * // all modules in one file (minified)
  */
  mashi.module = function (component) {

    var module, modname, i;

    if (!component) {
      return;
    }

    module = {
      path: '',
      name: '',
      base: _m_.self.getBasePath(),
      parts: component.split('.')
    };
    
    if (component === 'all') {
      _m_.self.addScript(module.base + 'mashi/mashi.modules.min.js');
    } else {

      for (i = 0; i < module.parts.length; i += 1) {
        if (i > 0) {
          module.path += "/";
          module.name += ".";
        }
        module.path += module.parts[i];
        module.name += module.parts[i];
        if (i >= 0) {
          if (!this.loaded_modules[module.name]) {
            this.loaded_modules[module.name] = true;
            if (i === 1 && module.parts.length === 2) {
              modname = this.id + '/' + module.parts[0] + '/' + _m_.id + '.' + module.name;
            } else {
              modname = this.id + '/' + _m_.id + '.' + module.name;
            }
            if (module.parts[0] !== this.id && module.parts.length === 3 && modname.split('/').length === 2) {
              modname = ''; // silly. only for jslint ..
            } else {
              _m_.self.addScript(module.base + modname + '.js');
            }
          }
        }
      }
    }
  };

  /** 
    * Simple timeline method.
    * @constructor
    *
    * @example
    * var my_timeline = new mashi.timeline();
  */
  mashi.timeline = function () {

    var ival, delay, _self = this;

    this.frames = [];
    this.started = false;
    this.num = this.startTime = this.timestamp = 0;
    
    /** @private */
    this.getTimestamp = function () {
      return (new Date()).getTime();
    };
    
    /** @private */
    this.call = function (fn) {
      fn();
    };

    /** 
      * Add frame to the timeline.
      * @param {Integer} delay
      * @param {Function} fn
      *
      * @example
      * timeline.add(1000, function () {});
    */
    this.add = function (delay, fn) {
      this.frames.push([delay, fn]);
    };
    
    /** 
      * Start timeline.
      *
      * @example
      * timeline.start();
    */
    this.start = function () {
      if (this.frames.length > 0) {
        _self = this;
        ival = setInterval(function () {
          if (_self.num < _self.frames.length) {
            delay = _self.frames[_self.num][0];
            if (delay === "auto") {
              if (_self.started === false) {
                _self.call(_self.frames[_self.num][1]);
                _self.started = true;
              }
              if (_m_.frame.finished === true) {
                _self.num += 1;
                _self.started = _m_.frame.finished = false;
              }
            } else {
              if (_self.startTime === 0) {
                _self.startTime = _self.getTimestamp();
                _self.call(_self.frames[_self.num][1]);
              }
              _self.timestamp = _self.getTimestamp();
              if (_self.startTime + delay <= _self.timestamp) {
                _self.startTime = _self.timestamp = 0;
                _self.num += 1;
              }
            }
          } else {
            clearInterval(ival);
            _self.num = 0;
          }
        }, 100);
      }
    };

  };

  /** 
    * Simple XHR method to import XML/HTML fragments via XPath queries
    * @constructor
    * @param {String} xml_source Source file
    * @param {String} xpath XPath address part
    * @return {String} XML/HTML fragment  (as string)
    *
    * @example
    * var items = mashi.xpath('items.xml', '/root/items');
  */
  mashi.xpath = function (xml_source, xpath) {

    /** @private */
    this.loadXMLDoc = function (file) {
      var xhr;
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }

      xhr.open("GET", file, false);
      if (xhr.overrideMimeType) {
        xhr.overrideMimeType('text/xml');
      }
      xhr.send(null);
      return xhr.responseXML;
    };

    /** @private */
    this.innerXML = function (node) {
      return (node.xml || (new XMLSerializer().serializeToString(node)) || "").replace(new RegExp("(^<w*" + node.tagName + "[^>]*>)|(<w*/w*" + node.tagName + "[^>]*>$)", "gi"), "");
    };

    try {
      var xml, nodes, xmlObj, all, i, content = '';

      xml = this.loadXMLDoc(xml_source);
      
      if (window.ActiveXObject) { // code for IE
        nodes = xml.selectNodes(xpath);
        all = nodes.length;
        for (i = 0; i < all; i += 1) {
          xmlObj = nodes[i];
          content = this.innerXML(xmlObj);
        }
      } else if (document.implementation && document.implementation.createDocument) { // code for Safari, Firefox, Opera, etc.
        nodes = xml.evaluate(xpath, xml, null, XPathResult.ANY_TYPE, null);

        while (xmlObj === nodes.iterateNext()) {
          content = this.innerXML(xmlObj);
        }
      }
      if (content !== '') {
        return content;
      }
    } catch (e) {}

    return false;

  };

}("mashi"));

