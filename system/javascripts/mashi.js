/**
  * M A S H I - Javascript Timeline Toolkit
  * http://mashi.tv/
  *
  * Copyright (c) 2008 - 2010 Uli Preuss
  * Dual licensed under the AFL and BSD licenses:
  *  a) Academic Free License v.3.0 OR
  *  b) Modified BSD license.
  * see: http://mashi.com/license for details
  *
  * Parts of this software based on the ingenuity of:
  * Peter-Paul Koch, John Resig, Thomas Werner, Dušan Janovský, Joe Segura, 
  * Douglas Crockford, Andrea Giammarchi and others
 *
*/

"use strict";

var MASHI_APP_PATH = MASHI_APP_PATH ? MASHI_APP_PATH : '';

(function() {
    // object
    mashi = {
    	  version: '0.9.2',
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
        running: false
    };

    /* Mashi Data Object - default value */
    _MDO_ = { 
        meta : {
        	  namespace: 'MYAPP',
            title: 'none',
            author: 'unknown'
        },
        animation : {
            fade : {
                duration: 300,
    	          steps: 20,
    	          start: 0,
    	          end: 1
            },
            canvas: false, 
            start: false,
            rewind: false,
            accessible: 'text'
        },
        buttons : {
            type: false,
            text: false,
            position : {
                vertical: 'bottom',
                horizontal: 'right'
            }
        },
        style : {
      		  backgroundImage: 'none',
      		  backgroundColor: '#FFFFFF'
        },
        frames : []
    }
    
    _m_ = mashi; // Shortcut
    
    // get browsers versions
    _m_.uA = function(re) { 
      return (re.test(navigator.userAgent)) ? true : false; 
    };
    _WebKit_ = _m_.uA(/WebKit/);
    _Opera_ = _m_.uA(/Opera/);
    _IE_ = _IE_6_7_8_ = _m_.uA(/MSIE (6|7|8)/);
    _IE_6_ = _m_.uA(/MSIE 6/);
    _IE_7_ = _m_.uA(/MSIE 7/);
    _IE_8_ = _m_.uA(/MSIE 8/);
    _IE_6_7_ = _m_.uA(/MSIE (6|7)/);
    _IE_6_8_ = _m_.uA(/MSIE (6|8)/);
    _IE_7_8_ = _m_.uA(/MSIE (7|8)/);
    
    
    // application method
    mashi.application = function() {
      
        _m_.self = this;
                
        this.config = function(c) {

            // OPTIONS
            // load user configuration or (if not defined) default values
            var u = undefined;
            _m_.namespace = (c.meta.namespace !== u) ? c.meta.namespace : _MDO_.meta.namespace;
            this.title = (c.meta !== u && c.meta.title !== u) ? c.meta.title : _MDO_.meta.title;
            this.author = (c.meta !== u && c.meta.author !== u) ? c.meta.author : _MDO_.meta.author;
            _m_.frame.oddid = (c.display !== u) ? c.display : _m_.namespace;
            _m_.frame.evenid = (c.display !== u) ? c.display + "-copy" : _m_.namespace + "-copy";
            _m_.fade.duration = (c.fade !== u && c.fade.duration !== u) ? c.fade.duration : _MDO_.animation.fade.duration;
            _m_.fade.steps = (c.fade !== u && c.fade.steps !== u) ? c.fade.steps : _MDO_.animation.fade.steps;
            _m_.fade.start = (c.fade !== u && c.fade.start !== u) ? c.fade.start : _MDO_.animation.fade.start;
            _m_.fade.end = (c.fade !== u && c.fade.end !== u) ? c.fade.end : _MDO_.animation.fade.end;
            _m_.canvas = (c.animation !== u && c.animation.canvas !== u) ? c.animation.canvas : _m_.canvas;
            _m_.start = (c.animation !== u && c.animation.start !== u) ? c.animation.start : _MDO_.animation.start;
            _m_.rewind = (c.animation !== u && c.animation.rewind !== u) ? c.animation.rewind : _MDO_.animation.rewind;
            _m_.accessible = (c.animation !== u && c.animation.accessible !== u) ? c.animation.accessible : _MDO_.animation.accessible;
            _m_.buttons.type = (c.buttons !== u && c.buttons.type !== u) ? c.buttons.type : _MDO_.buttons.type;
            _m_.buttons.text = (c.buttons !== u && c.buttons.text !== u) ? c.buttons.text : _MDO_.buttons.text;
            _m_.buttons.vertical = (
              c.buttons !== u && c.buttons.position !== u && c.buttons.position.vertical !== u
            ) ? c.buttons.position.vertical : _MDO_.buttons.position.vertical;
            _m_.buttons.horizontal = (
              c.buttons !== u && c.buttons.position !== u && c.buttons.position.horizontal !== u
            ) ? c.buttons.position.horizontal : _MDO_.buttons.position.horizontal;
            
            // cancel if target element not exists 
            if(this.$(_m_.frame.oddid) === null) return;
 
            this.frames = _m_.frame.array;
            this.createLayer();

            if(typeof _mac_ !== "undefined" && _m_.buttons.type !== 'none') {
              _mac_.create();
            }
            
            if (typeof this.preloader !== "undefined" && this.frames.length > 0) {
                this.preloader.init();
            } 
            else if (_m_.start === true) {
                this.start();
            }
                        
            
        };

        this.getLength = function(timeunit) {
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

        this.createLayer = function() {
            _m_.frame.odd = this.$(_m_.frame.oddid);
            var oldcontent = _m_.frame.odd.innerHTML;
            _m_.frame.odd.innerHTML = "";
            _m_.frame.odd.style.display = "block";
            _m_.position.X = this.findPosX(_m_.frame.odd) + "px"; // ???
            _m_.position.Y = this.findPosY(_m_.frame.odd) + "px"; // ???
            var parentNode = _m_.frame.odd.parentNode;
            parentNode.style.position = 'relative';
            
            if (!this.$(_m_.frame.evenid)) {
                var frame_clone = _m_.frame.odd.cloneNode(true);
                frame_clone.setAttribute('id', _m_.frame.evenid);
                frame_clone.setAttribute('class', _m_.id);
                parentNode.appendChild(frame_clone);
                _m_.frame.even = this.$(_m_.frame.evenid);
                _m_.frame.even.style.position = "absolute";
            }

            if (_m_.canvas === true) {
              canvasframe = document.createElement('canvas');
              canvasframe.setAttribute('id', 'canvasframe');
              canvasframe.setAttribute('width', _m_.frame.odd.offsetWidth);
              canvasframe.setAttribute('height', _m_.frame.odd.offsetHeight);
              canvasframe.style.position = "absolute";
              canvasframe.style.zIndex = "101";
              parentNode.appendChild(canvasframe);
              // iecanvas hack
              if (!canvasframe.getContext) {     
                  G_vmlCanvasManager.initElement(canvasframe);
                  canvasframe = _m_.self.$('canvasframe');
              }
            }

            if (!this.$('stageframe')) {
                stageframe = _m_.frame.odd.cloneNode(true);
                stageframe.setAttribute('id', 'stageframe');
                stageframe.style.zIndex = ( _m_.accessible === "stage" ) ? "110" : "102";
                stageframe.style.backgroundColor = "transparent";
                parentNode.appendChild(stageframe);
            }
            if (!this.$('textframe')) {
                textframe_gp = document.createElement('div');
                textframe_gp.setAttribute('class', _m_.id);
                textframe_gp.setAttribute('id', 'textframe_gp');
                textframe_gp.style.zIndex = "103";
                parentNode.appendChild(textframe_gp);
                parentNode.style.overflow = 'hidden';
                textframe_p = document.createElement('div');
                textframe_p.setAttribute('id', 'textframe_p');
                textframe_p.style.zIndex = "104";
                textframe_gp.appendChild(textframe_p);
                textframe = document.createElement('div');
                textframe.setAttribute('id', 'textframe');
                textframe.style.zIndex = "105";
                textframe_p.appendChild(textframe);
                if(_m_.frame.array.length === 0) {
                  textframe.innerHTML =  oldcontent;
                }
            }
            _m_.frame.object = this.$(_m_.frame.oddid);
        };

        this.start = function() {
          
          if( _m_.frame.num === _m_.frame.array.length) { 
            // Clear Stage
            this.$('stageframe').innerHTML = '';
          }
          
          if(_m_.running === true && _m_.canvas === true) {
              var el = this.$('canvasframe');
              el.parentNode.removeChild(el);              

              var canvasframe = document.createElement('canvas');
              canvasframe.setAttribute('id', 'canvasframe');
              canvasframe.setAttribute('width', _m_.frame.odd.offsetWidth);
              canvasframe.setAttribute('height', _m_.frame.odd.offsetHeight);
              canvasframe.style.position = "absolute";
              canvasframe.style.zIndex = "101";
              
              var parentNode = _m_.frame.odd.parentNode;
              var stageframe = this.$('stageframe');
              parentNode.insertBefore(canvasframe, stageframe);
              // iecanvas hack
              if (!canvasframe.getContext) {
                  G_vmlCanvasManager.initElement(canvasframe);
                  canvasframe = _m_.self.$('canvasframe');
              }
              this.$('textframe').innerHTML = "";
              stageframe.innerHTML = "";
              _m_.running = false;

          }
            if (_m_.buttons.type === "single") {
                if (this.$('controls-button-start')) {this.$('controls-button-start').style.display = "none";}
                if (this.$('controls-button-stop')) {this.$('controls-button-stop').style.display = "inline-block";}
            }
            var started = false,
            startTime = 0,
            timestamp = 0;
      
            var all = _m_.frame.array.length;
            if (_m_.frame.num <= 0 || all - 1 === _m_.frame.num || all === _m_.frame.num) {
                _m_.frame.num = 0;
            } else {
                _m_.frame.num++;
            }

            if (all > 0 && _m_.frame.array[_m_.frame.num] !== undefined) {
                _ma_ = this;

                // main function
                _m_.frame.interval = setInterval(function() {
                  
                    // debugger: show frame number
                    if( _ma_.$('frame-counter')) {
                      if(_m_.frame.num < _m_.frame.array.length) {
                        _ma_.$('frame-counter').innerHTML = _m_.frame.num + 1
                      };
                    }
                    
                    if (_m_.frame.num < all) {
                        if (_ma_.isOdd(_m_.frame.num)) {
                            if (_m_.frame.current === 'even') {
                              var old_bg_color = _ma_.$(_m_.frame.evenid).style.backgroundColor;
                              var old_bg_image = _ma_.$(_m_.frame.evenid).style.backgroundImage;
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
                                    _ma_.fadeIn('textframe', _m_.fade.duration, _m_.fade.steps, _m_.fade.start);
                                }
                            }
                            _m_.frame.current = 'odd';
                        } else {
                            if (_m_.frame.current === 'odd') {
                              var old_bg_image = _ma_.$(_m_.frame.oddid).style.backgroundImage;
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
                                    _ma_.fadeIn('textframe', _m_.fade.duration, _m_.fade.steps, _m_.fade.start);
                                }
                            }
                            _m_.frame.current = 'even';
                        }
                    }
                    if (_m_.frame.num < all) {
                        this.delay = _m_.frame.array[_m_.frame.num][0];
                        if (this.delay === "auto") {
                            if (started === false) {
                                _ma_.callSlideFunc();
                                started = true;
                            }
                            if (_m_.frame.finished === true) {
                                _m_.frame.num++;
                                started = _m_.frame.finished = false;
                            }
                        } else {
                            if (startTime === 0) {
                                startTime = (new Date()).getTime();
                                _ma_.callSlideFunc();
                            }
                            timestamp = (new Date()).getTime();
                            if (startTime + delay <= timestamp) {
                                startTime = timestamp = 0;
                                _m_.frame.num++;
                            }
                        }
                    } else {
                        clearInterval(_m_.frame.interval);
                        if (_m_.rewind === true) {
                            _ma_.flipToNumber(0);
                            _ma_.start();
                        }
                        if (_m_.buttons.type === "single") {
                            _ma_.$('controls-button-start').style.display = "inline-block";
                            _ma_.$('controls-button-stop').style.display = "none";
                        }
                        _m_.running = true;
                    }
                },
                5);
            }
        };

        this.stop = function() {
            clearInterval(_m_.frame.interval);
            if (_m_.buttons.type === "single") {
                this.$('controls-button-start').style.display = "inline-block";
                this.$('controls-button-stop').style.display = "none";
            }
        };

        this.first = function() {
            this.flipToNumber(0);
        };

        this.prev = function() {
            if (_m_.frame.num > 0) {
                _m_.frame.num--;
                this.flipToNumber(_m_.frame.num);
            }
        };

        this.next = function() {
            if (_m_.frame.num < _m_.frame.array.length - 1) {
                _m_.frame.num++;
                this.flipToNumber(_m_.frame.num);
            }
        };

        this.last = function() {
            _m_.frame.num = _m_.frame.array.length - 1;
            this.flipToNumber(_m_.frame.num);
            this.hideEmptyDisplay();
        };

        this.add = function(delay, fn) {
            _m_.frame.array.push([delay, fn]);
            if (delay === 'auto') {
                _m_.delay.auto = true;
            } else {
                _m_.delay.sum += delay;
            }
        };

        this.set = function(params) {
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
                for (prop in params.style) {
                    if (params.style.hasOwnProperty(prop)) {
                        _m_.frame.object.style[prop] = params.style[prop];
                    }
                }
            }
            
            if (params.html) {
                textframe.innerHTML = params.html;
            }
        };

        this.$ = function(id) {
            return document.getElementById(id);
        };

        this.$$ = function(tagname) {
            return document.getElementsByTagName(tagname);
        };

        this.flipToNumber = function(i) {
            if (_m_.frame.array[i] !== undefined) {
                clearInterval(_m_.frame.interval);
                this.clearDisplay();
                _m_.frame.num = i;
                this.callSlideFunc();
            }
        };

        this.clearBackground = function(id) {
            this.$(id).style.backgroundImage = "url()";
            this.$(id).style.backgroundColor = "transparent";
        };

        this.hideEmptyDisplay = function() {
            if (_m_.frame.current === 'odd') {
                _m_.frame.even.style.display = "none";
            } else {
                _m_.frame.odd.style.display = "none";
            }
        };

        this.clearDisplay = function() {
            this.clearBackground(_m_.frame.oddid);
            this.clearBackground(_m_.frame.evenid);
        };

        this.callSlideFunc = function() {
            if (_m_.frame.array[_m_.frame.num] !== 'undefined') {
                if (typeof _m_.frame.array[_m_.frame.num][1] === 'string') {
                    // eval(_m_.frame.array[_m_.frame.num][1]);
                } else {
                    _m_.frame.array[_m_.frame.num][1]();
                }
            }
        };

        this.isOdd = function(num) {
            return num % 2;
        };

        this.findPosY = function(obj) {
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

        this.findPosX = function(obj) {
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

        this.setOpacity = function(id, value) {
          
           var finalValue = (value > 1) ? 1: ((value < 0) ? 0: value);
           var element = this.$(id);
           element.style.opacity = finalValue; /* FF/Opera/Safari/Chrome */
           element.style.MsFilter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + (finalValue * 100) + ")";	/* IE8 */
           element.style.filter = "alpha(opacity=" + (finalValue * 100) + ")";	/* IE6/IE7 */
                    
        };

        this.fadeIn = function(id, fade_duration, fade_steps, fade_start) {

            // Extrawurst for MSIE
            if (_IE_ && typeof jQuery != 'undefined') {
                _ma_.setOpacity(id, 0);
                $('#' + id).css({
                    opacity: fade_start
                }).animate({
                    opacity: 1
                },
                (fade_duration * 2), '');

                if ($('#' + id + '_shadow')) {
                    $('#' + id + '_shadow').css({
                        opacity: fade_start
                    }).animate({
                        opacity: 1
                    },
                    (fade_duration * 2));
                }
            }
            else {
                for (i = 0; i <= 1; i += (1 / fade_steps)) {
                    setTimeout("_ma_.setOpacity('" + id + "', " + i + ")", i * fade_duration);
                }
            }

        };

        this.fadeOut = function(id, fade_duration, fade_steps, fade_end) {

            // Extrawurst for MSIE
            if (_IE_ && typeof jQuery != 'undefined') {
                $('#' + id).css({
                    opacity: fade_end
                }).animate({
                    opacity: 0
                },
                (fade_duration * 2), '');
                if ($('#' + id + '_shadow')) {
                    $('#' + id + '_shadow').css({
                        opacity: fade_end
                    }).animate({
                        opacity: 0
                    },
                    (fade_duration * 2));
                }
                if ($('#' + id + '_text')) {
                    $('#' + id + '_text').css({
                        opacity: fade_end
                    }).animate({
                        opacity: 0
                    },
                    (fade_duration * 2));
                }
            }
            else {
                for (i = 0; i <= fade_end; i += (1 / fade_steps)) {
                    setTimeout("_ma_.setOpacity('" + id + "', " + (1 - (2 * (1 / fade_steps)) - i) + ")", i * fade_duration);
                }
            }

        };

        this.setPath = function(path) { 
          _m_.path = path;
        };

        this.getBasePath = function() {
            var scripts = this.$$("script");
            var all = scripts.length;
            for (var i = 0; i < all; i++) {
                var src = scripts[i].getAttribute("src");
                var l = src.lastIndexOf("/") + 1;
                if (src !== null) {
                    if (src.slice(l) == "mashi.js") {
                        return src.slice(0, l);
                    }
                }
            }
        };
        
        this.each = function(selector, callback) {
          
          var parts = selector.split('.');
          if(parts.length > 1) {
            var tagname = (parts[0] !== '')? parts[0] : 'div';
            var classname = parts[1];
          }
          else {
            var tagname = 'div';            
            var classname = selector;            
          }
          
          var classElements = new Array();
          var stageframe = _ma_.$('stageframe');
          var els = stageframe.getElementsByTagName(tagname);
          var pattern = new RegExp("(^|\\s)"+classname+"(\\s|$)");
          for (var i = 0, j = 0; i < els.length; i++) {
              if ( pattern.test(els[i].className) ) {
                  classElements[j] = els[i];
                  j++;
              }
          }
          
          var toggleOpacity = function(c) {

            var delay = (c.delay)?c.delay:10;
            var speed = (c.speed)?c.speed:_MDO_.animation.fade.speed;
            var steps = (c.steps)?c.steps:_MDO_.animation.fade.steps;
            var opacity = c.opacity;

            var num = 0;
            var fade = (c.type === 'out') ? _ma_.fadeOut : _ma_.fadeIn;

            for (var k = 0, l = 0; k < classElements.length; k++) {
                if ( classElements[k] ) {
                    setTimeout(function(){
                      fade(classElements[num++].id, speed, steps, opacity);                    
                    }, l+=delay );
                }
              }
          };
                      
          return { 
            
            // PUBLIC FUNCTIONS
            
            disappear: function(c) {
              c = (c)?c:{};
              c.opacity = (c.opacity)?c.opacity:1;
              c.type = 'out';
              toggleOpacity(c);
            },  
            appear: function(c) {
              c = (c)?c:{};
              c.opacity = (c.opacity)?c.opacity:0;
              c.type = 'in';
              toggleOpacity(c);
            },  
            remove: function() {

              for (var k = 0, l = 0; k < classElements.length; k++) {
                  if ( classElements[k] ) {
                      classElements[k].parentNode.removeChild(classElements[k]);
                  }
              }
              
            }
            
          }

       };

    };

    // load plugin method ........................................................................
    mashi.plugin = function(component) {  

        if (!component) { return; } 
        else {      
            var base_path = _m_.self.getBasePath();
            var root_path = base_path.split('system')[0];
            var plugin_path = root_path + 'plugins/' + component + '.js';
            document.write('<script src="' + plugin_path + '" type="text/javascript"></script>');
        }
      
    };
        
    // load frameset method ........................................................................
    mashi.frameset = function(component) {  

        if (!component) { return; } 
        else {      
            var base_path = _m_.self.getBasePath();
            var root_path = base_path.split('system')[0];
            var component_path_parts = component.split('.');
            var component_path = root_path + 'application/' + component_path_parts[0] + '/' + component_path_parts[1] + '.js';
            document.write('<script src="' + component_path + '" type="text/javascript"></script>');
        }
      
    };
        
    // load modules method ........................................................................
    mashi.module = function(component) {  

        if (!component) { return } 
      
        var module = { 
          path: '', 
          name: '', 
          base: _m_.self.getBasePath(), 
          parts: component.split('.') 
        };

        for (var i = 0; i < module.parts.length; i++) {
            if (i > 0) {
                module.path += "/";
                module.name += ".";
            }
            module.path += module.parts[i];
            module.name += module.parts[i];
            if (i > 0) {
                if (!this.loaded_modules[module.name]) {
                    this.loaded_modules[module.name] = true;
                    if (i === 2 && module.parts.length === 3) {
                        modname = this.id + '/' + module.parts[1] + '/' + module.name;
                    } 
                    else {
                        modname = this.id + '/' + module.name;
                    }
                    if (module.parts[0] !== this.id && module.parts.length === 3 && modname.split('/').length === 2) {
                        // ...
                    } 
                    else {
                        document.write('<script src="' + module.base + modname + '.js" type="text/javascript"></script>');
                    }
                }
            }
        }
    };
        
    // timeline method ...........................................................................
    mashi.timeline = function() {
    	this.frames = []; 
    	this.started = false;
    	var _self = this;
    	this.num = this.startTime = this.timestamp = 0; 
    	this.getTimestamp = function() { return (new Date).getTime() };
    	this.add = function(delay, fn) { 
    	  this.frames.push([delay, fn]);
    	};
    	this.call = function(fn) { 
    	  fn();
    	};
    	this.start = function() {
    		if(this.frames.length > 0) {
    			var _self = this;
    			var ival = setInterval(function(){
    				if (_self.num < _self.frames.length) {
    					var delay = _self.frames[_self.num][0];
    					if (delay == "auto") {
    						if(	_self.started == false) {
    							_self.call(_self.frames[_self.num][1]);
    							_self.started = true;					
    						}
    						if(	_m_.frame.finished == true) {
    							_self.num++;
    							_self.started = _m_.frame.finished = false;					
    						}
    					}
    					else {
    						if(	_self.startTime == 0) {
    							_self.startTime = _self.getTimestamp();
    							_self.call(_self.frames[_self.num][1]);
    						}
    						_self.timestamp = _self.getTimestamp();
    						if(	_self.startTime + delay <= _self.timestamp) {
    							_self.startTime = _self.timestamp = 0;
    							_self.num++;
    						}
    					}
    				}
        		else {
        		  clearInterval(ival);
        		  _self.num = 0;
        		}
    			}, 100);
    		}
    	}
      
    };
    
    // simple xhr / xpath method ...........................................................................
    mashi.fetch = function(xml_source, xpath) {
      
      this.loadXMLDoc = function(file) {
          var xhr;
          if (window.XMLHttpRequest) {
              xhr = new XMLHttpRequest();
          } 
          else {
              xhr = new ActiveXObject("Microsoft.XMLHTTP");
          }
          
          xhr.open("GET", file, false);
          if(xhr.overrideMimeType) {
              xhr.overrideMimeType('text/xml');
          }
          xhr.send(null);
           return xhr.responseXML;
      };
      
      this.innerXML = function(node) {
          return (node.xml || (new XMLSerializer().serializeToString(node)) || "").replace(
          new RegExp("(^<w*" + node.tagName + "[^>]*>)|(<w*/w*" + node.tagName + "[^>]*>$)", "gi"), "");
      };
      
      try {
        var xml, nodes,
        xmlObj,
        content = '';
        
        xml = this.loadXMLDoc(xml_source);
        // code for IE
        if (window.ActiveXObject) {
          nodes = xml.selectNodes(xpath);
          var all = nodes.length;
          for (i = 0; i < all; i++) {
              xmlObj = nodes[i];
              content = this.innerXML(xmlObj);
          }
        }
        // code for Safari, Firefox, Opera, etc.
        else if (document.implementation && document.implementation.createDocument) {
          nodes = xml.evaluate(xpath, xml, null, XPathResult.ANY_TYPE, null);

          while( xmlObj = nodes.iterateNext() ) {
            content = this.innerXML(xmlObj);
          }
        }
        if(content !== '') {return content;};
      }
      catch(e) {}

    };
    
    /* Auto loading of necessary mashi stylesheets */
    (function(){
      
      var _dummyapp_ = new mashi.application();
      var basePath = _dummyapp_.getBasePath();
      var baseUrl = basePath.split('system');
      
      this.addCSS = function(name) {
        
        var stylesheet = '' +
        '<link' +
        '  rel="stylesheet"' +
        '  type="text/css"' +
        '  href="' + baseUrl[0] + 'system/stylesheets/' + name + '.css"' +
        '/>';
        document.write(stylesheet);
      }
      
      this.addCSS('mashi.reset');
      this.addCSS('mashi');
      
      if (_Opera_) { this.addCSS('mashi.hacks.opera'); }
      else if (_IE_) { this.addCSS('mashi.hacks.ie'); }
      
      if (_IE_6_) { this.addCSS('mashi.hacks.ie6'); }
      else if (_IE_7_) { this.addCSS('mashi.hacks.ie7'); }
      else if (_IE_8_) { this.addCSS('mashi.hacks.ie8'); }
      
      
      document.write(
        '<link' +
        '  rel="stylesheet"' +
        '  type="text/css"' +
        '  href="' + baseUrl[0] + 'application/custom.css"' +
        '/>'
      );
      
    })();
        
})("mashi");

