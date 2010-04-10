/*
 * MASHI PLAYER
 * Examples and documentation at: http://mashi.tv/
 * Copyright (c) 2008 - 2010 Uli Preuss
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Requirements: no
 * Compatible with prototype, scriptaculous, jquery, yui, dojo, ext and .. ??? 
 *
 * Parts of this software based on the ingenuity and work of:
 *	1) PPK (http://www.quirksmode.org/js/findpos.html)
 *  2) Thomas Werner (http://people.avona.com/~thomas.werner/index.php?/archives/
 *     18-Annahme-ausgeloest-und-nicht-aufgefangen-oder-JavaScript-im-Internet-Explorer.html)
 *  3) Dušan Janovský (http://www.jakpsatweb.cz/css/priklady/vertical-horizontal-align-valid-solution-en.html), 
 *     Joe Segura (http://cssbeauty.com/skillshare/discussion/980/vertical-centrealign-div-in-ie7-beta3/)
 *
 */

"use strict";

/* globals */
var slide_fade = true,
slide_finished = false;

 (function() {
    // object literal
    mashi = {
    	  version: "0.9.0",
    	  id: arguments[0],
        position: {
            X: null,
            Y: null
        },
        slide: {
            object: null,
            array: [],
            current: "odd",
            odd: null,
            oddid: null,
            even: null,
            evenid: null,
            interval: 0,
            num: 0
        },
        frame: {
            finished: false,
        },
        delay: {
            sum: 0,
            auto: false
        },
        accessible: null,
        path: '',
        image: {
            array: []
        },
        fade: {},
        meta: {},
        buttons: {},
        control: {},
        loaded_modules: [],
        running: false
    };

    /* MASHI DATA OBJECT - DEFAULTS */
    _MDO_ = { 
        meta : {
        	  namespace: "MYAPP",
            title: "none",
            author: "unknown"
        },
        animation : {
            fade : {
                duration: 300,
    	          steps: 10,
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
                vertical: "bottom",
                horizontal: "right"
            }
        },
        style : {
      		  backgroundImage: 'none',
      		  backgroundColor: '#FFFFFF'
        },
        frames : []
    }
    
    _m_ = mashi; // Shortcut

    // application constructor
    mashi.application = function() {
      
        this.config = function(c) {

            // OPTIONS
            // load user configuration or (if not defined) default values
            var u = undefined;
            _m_.namespace = (c.meta.namespace !== u) ? c.meta.namespace : _MDO_.meta.namespace;
            this.title = (c.meta !== u && c.meta.title !== u) ? c.meta.title : _MDO_.meta.title;
            this.author = (c.meta !== u && c.meta.author !== u) ? c.meta.author : _MDO_.meta.author;
            _m_.slide.oddid = (c.display !== u) ? c.display : _m_.namespace;
            _m_.slide.evenid = (c.display !== u) ? c.display + "-copy" : _m_.namespace + "-copy";
            _m_.fade.duration = (c.fade !== u && c.fade.duration !== u) ? c.fade.duration : _MDO_.animation.fade.duration;
            _m_.fade.steps = (c.fade !== u && c.fade.steps !== u) ? c.fade.steps : _MDO_.animation.fade.steps;
            _m_.fade.start = (c.fade !== u && c.fade.start !== u) ? c.fade.start : _MDO_.animation.fade.start;
            _m_.fade.end = (c.fade !== u && c.fade.end !== u) ? c.fade.end : _MDO_.animation.fade.end;
            _m_.canvas = (c.animation !== u && c.animation.canvas !== u) ? c.animation.canvas : _MDO_.animation.canvas;
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
                ) ? c.buttons.position.horizontal : 
                _MDO_.buttons.position.horizontal;
 
            this.slides = _m_.slide.array;
            this.createLayer();

            if (typeof this.preloader !== "undefined" && this.slides.length > 0) {
                this.preloader.init();
            } 
            else if (_m_.start === true) {
                this.start();
            }
            if(typeof _mac_ !== "undefined") {
              if (_m_.buttons.type !== 'none') _mac_.create();
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
            _m_.slide.odd = this.$(_m_.slide.oddid);
            var oldcontent = _m_.slide.odd.innerHTML;
            _m_.slide.odd.innerHTML = "";
            _m_.slide.odd.style.display = "block";
            _m_.position.X = this.findPosX(_m_.slide.odd) + "px"; // ???
            _m_.position.Y = this.findPosY(_m_.slide.odd) + "px"; // ???
            var parentNode = _m_.slide.odd.parentNode;
            
            if (!this.$(_m_.slide.evenid)) {
                var slide_clone = _m_.slide.odd.cloneNode(true);
                slide_clone.setAttribute('id', _m_.slide.evenid);
                slide_clone.setAttribute('class', _m_.id);
                parentNode.appendChild(slide_clone);
                _m_.slide.even = this.$(_m_.slide.evenid);
                _m_.slide.even.style.position = "absolute";
            }

            if (_m_.canvas === true) {
              canvasframe = document.createElement('canvas');
              canvasframe.setAttribute('id', 'canvasframe');
              canvasframe.setAttribute('width', _m_.slide.odd.offsetWidth);
              canvasframe.setAttribute('height', _m_.slide.odd.offsetHeight);
              canvasframe.style.position = "absolute";
              canvasframe.style.zIndex = "101";
              parentNode.appendChild(canvasframe);
              // iecanvas hack
              if (!canvasframe.getContext) {
                  G_vmlCanvasManager.initElement(canvasframe);
                  canvasframe = document.getElementById('canvasframe');
              }
            }

            if (!this.$('stageframe')) {
                stageframe = _m_.slide.odd.cloneNode(true);
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
                if(_m_.slide.array.length === 0) {
                  textframe.innerHTML =  oldcontent;
                }
            }
            _m_.slide.object = this.$(_m_.slide.oddid);
        };
        this.start = function() {
          if(_m_.running === true && _m_.canvas === true) {
              var el = this.$('canvasframe');
              el.parentNode.removeChild(el);              

              var canvasframe = document.createElement('canvas');
              canvasframe.setAttribute('id', 'canvasframe');
              canvasframe.setAttribute('width', _m_.slide.odd.offsetWidth);
              canvasframe.setAttribute('height', _m_.slide.odd.offsetHeight);
              canvasframe.style.position = "absolute";
              canvasframe.style.zIndex = "101";
              
              var parentNode = _m_.slide.odd.parentNode;
              var stageframe = this.$('stageframe');
              parentNode.insertBefore(canvasframe, stageframe);
              // iecanvas hack
              if (!canvasframe.getContext) {
                  G_vmlCanvasManager.initElement(canvasframe);
                  canvasframe = document.getElementById('canvasframe');
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
      
            var all = _m_.slide.array.length;
            if (_m_.slide.num <= 0 || all - 1 === _m_.slide.num || all === _m_.slide.num) {
                _m_.slide.num = 0;
            } else {
                _m_.slide.num++;
            }

            if (all > 0 && _m_.slide.array[_m_.slide.num] !== undefined) {
                _ma_ = this;

                // main function
                _m_.slide.interval = setInterval(function() {
                    if (_m_.slide.num < all) {
                        if (_ma_.isOdd(_m_.slide.num)) {
                            if (_m_.slide.current === 'even') {
                              var old_bg_color = _ma_.$(_m_.slide.evenid).style.backgroundColor;
                              var old_bg_image = _ma_.$(_m_.slide.evenid).style.backgroundImage;
                                if (_m_.slide.num !== 0) {
                                    if (slide_fade === true) {
                                        _ma_.fadeOut(_m_.slide.evenid, _m_.fade.duration, _m_.fade.steps, _m_.fade.end);
                                    }
                                }
                                _m_.slide.object = _ma_.$(_m_.slide.oddid);
                                _m_.slide.object.style.backgroundColor = old_bg_color;
                                _m_.slide.object.style.backgroundImage = old_bg_image;
                                if (slide_fade === true) {
                                    _ma_.fadeIn(_m_.slide.oddid, _m_.fade.duration, _m_.fade.steps, _m_.fade.start);
                                    _ma_.fadeIn('textframe', _m_.fade.duration, _m_.fade.steps, _m_.fade.start);
                                }
                            }
                            _m_.slide.current = 'odd';
                        } else {
                            if (_m_.slide.current === 'odd') {
                              var old_bg_image = _ma_.$(_m_.slide.oddid).style.backgroundImage;
                                if (_m_.slide.num !== 0) {
                                    if (slide_fade === true) {
                                        _ma_.fadeOut(_m_.slide.oddid, _m_.fade.duration, _m_.fade.steps, _m_.fade.end);
                                    }
                                }
                                _m_.slide.object = _ma_.$(_m_.slide.evenid);
                                _m_.slide.object.style.backgroundColor = old_bg_color;
                                _m_.slide.object.style.backgroundImage = old_bg_image;
                                if (slide_fade === true) {
                                    _ma_.fadeIn(_m_.slide.evenid, _m_.fade.duration, _m_.fade.steps, _m_.fade.start);
                                    _ma_.fadeIn('textframe', _m_.fade.duration, _m_.fade.steps, _m_.fade.start);
                                }
                            }
                            _m_.slide.current = 'even';
                        }
                    }
                    if (_m_.slide.num < all) {
                        this.delay = _m_.slide.array[_m_.slide.num][0];
                        if (this.delay === "auto") {
                            if (started === false) {
                                _ma_.callSlideFunc();
                                started = true;
                            }
                            if (slide_finished === true) {
                                _m_.slide.num++;
                                started = slide_finished = false;
                            }
                        } else {
                            if (startTime === 0) {
                                startTime = (new Date()).getTime();
                                _ma_.callSlideFunc();
                            }
                            timestamp = (new Date()).getTime();
                            if (startTime + delay <= timestamp) {
                                startTime = timestamp = 0;
                                _m_.slide.num++;
                            }
                        }
                    } else {
                        clearInterval(_m_.slide.interval);
                        if (_m_.rewind === true) {
                            _ma_.flipToNumber(0);
                        }
                        if (_m_.buttons.type === "single") {
                            _ma_.$('controls-button-start').style.display = "inline-block";
                            _ma_.$('controls-button-stop').style.display = "none";
                        }
                        _m_.running = true;
                    }
                },
                100);
            }
        };
        this.stop = function() {
            clearInterval(_m_.slide.interval);
            if (_m_.buttons.type === "single") {
                this.$('controls-button-start').style.display = "inline-block";
                this.$('controls-button-stop').style.display = "none";
            }
        };
        this.first = function() {
            this.flipToNumber(0);
        };
        this.prev = function() {
            if (_m_.slide.num > 0) {
                _m_.slide.num--;
                this.flipToNumber(_m_.slide.num);
            }
        };
        this.next = function() {
            if (_m_.slide.num < _m_.slide.array.length - 1) {
                _m_.slide.num++;
                this.flipToNumber(_m_.slide.num);
            }
        };
        this.last = function() {
            _m_.slide.num = _m_.slide.array.length - 1;
            this.flipToNumber(_m_.slide.num);
            this.hideEmptyDisplay();
        };
        this.add = function(delay, fn) {
            _m_.slide.array.push([delay, fn]);
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
                        _m_.slide.object.style[prop] = params.style[prop];
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
        this.flipToNumber = function(i) {
            if (_m_.slide.array[i] !== undefined) {
                clearInterval(_m_.slide.interval);
                this.clearDisplay();
                _m_.slide.num = i;
                this.callSlideFunc();
            }
        };
        this.clearBackground = function(id) {
            this.$(id).style.backgroundImage = "url()";
            this.$(id).style.backgroundColor = "transparent";
        };
        this.hideEmptyDisplay = function() {
            if (_m_.slide.current === 'odd') {
                _m_.slide.even.style.display = "none";
            } else {
                _m_.slide.odd.style.display = "none";
            }
        };
        this.clearDisplay = function() {
            this.clearBackground(_m_.slide.oddid);
            this.clearBackground(_m_.slide.evenid);
        };
        this.callSlideFunc = function() {
            if (_m_.slide.array[_m_.slide.num] !== 'undefined') {
                if (typeof _m_.slide.array[_m_.slide.num][1] === 'string') {
                    // eval(_m_.slide.array[_m_.slide.num][1]);
                } else {
                    _m_.slide.array[_m_.slide.num][1]();
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
           element.style.opacity = finalValue;
           element.style.MozOpacity = finalValue;
           element.style.KhtmlOpacity = finalValue;
           element.style.MsFilter = '"progid:DXImageTransform.Microsoft.Alpha(Opacity=' + (finalValue * 100) + ')";';
           element.style.filter = "alpha(opacity=" + (finalValue * 100) + ");";	
           
        };
        this.fadeIn = function(id, fade_duration, fade_steps, fade_start) {
            for (i = fade_start; i <= 1; i += (1 / fade_steps)) {
                setTimeout("_ma_.setOpacity('" + id + "', " + i + ")", i * fade_duration);
            }
        };
        this.fadeOut = function(id, fade_duration, fade_steps, fade_end) {
            for (i = 0; i <= fade_end; i += (1 / fade_steps)) {
                setTimeout("_ma_.setOpacity('" + id + "', " + (1 - (2 * (1 / fade_steps)) - i) + ")", i * fade_duration);
            }
        };
        this.setPath = function(path) { 
          _m_.path = path;
        };
    };
        
    // require method ...........................................................................
    mashi.require = function(module_name) {      
            
        var module = {
            path: null,
            name: null,
            base: null,
            parts: null
        };

        if (!module_name) {
            return;
        } 
        else {

            this.getBasePath = function() {
                var scripts = document.getElementsByTagName("script");
                var all = scripts.length;
                for (var i = 0; i < all; i++) {
                    var src = scripts[i].getAttribute("src");
                    var l = src.lastIndexOf("/") + 1;
                    if (src !== null) {
                        if (src.slice(l) == this.id + ".js") {
                            return src.slice(0, l);
                        }
                    }
                }
                module.base = true;
            };
            module.base = (module.base == null) ? this.getBasePath() : module.base;
            module.parts = module_name.split('.');
            module.path = module.name = "";

            var all = module.parts.length;
            for (var i = 0; i < all; i++) {
                if (i > 0) {
                    module.path += "/";
                    module.name += ".";
                }
                module.path += module.parts[i];
                module.name += module.parts[i];
                if (i > 0) {
                    if (!this.loaded_modules[module.name]) {
                        var bp = '',
                        modname = module.path;
                        // mashi modules:
                        if (module.parts[0] === this.id) {
                            this.loaded_modules[module.name] = true;
                            bp = module.base;
                            if (i === 2 && module.parts.length === 3) {
                                modname = this.id + '/' + module.parts[1] + '/' + module.name;
                            } else {
                                modname = this.id + '/' + module.name;
                            }
                        }
                        else {
                          bp = _m_.path;
                        }
                        if (module.parts[0] !== this.id && module.parts.length === 3 && modname.split('/').length === 2) {
                            // don't insert 'hamlet.js'
                            console.log(modname);
                        } 
                        else {
                            document.write('<script src="' + bp + modname + '.js" type="text/javascript"></script>');
                        }
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
          } else {
              xhr = new ActiveXObject("Microsoft.XMLHTTP");
          }
          xhr.open("GET", file, false);
          //xhttp.open("GET", '/test/mashi/075/server/origin.php', true);
          //xhttp.send("file=" + escape(file));
          //xhr.setRequestHeader("Content-Type", "text/xml");
          //xhr.setRequestHeader("Cache-Control", "no-cache");
          //xhr.setRequestHeader("Pragma", "");
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
})("mashi");

