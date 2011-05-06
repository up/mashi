/*
  Mashi Timeline Toolkit - Module Object Animation
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
   setTimeout: false, clearTimeout: false, jQuery: false, _m_: false, _ma_: false, 
   _IE_: false 
*/


/* JSDOC TOOLKIT COMMENTS *************************************************************** */

/** @fileOverview Mashi - Module Object.Animation */

(function () {

	"use strict";
	
	if (typeof mashi.object !== "undefined") {

    /** 
      * Object moves to position
      * @param {Object} params
      *
      * @example
      * dummy.moveTo({
      *   left: "70px",
      *   top: "500px"
      * });
    */
		mashi.object.prototype.moveTo = function (params) {

			var x, y, direction, callback, delay, ox, oy, _o = this,
				_object = this.obj;

      _m_.object.moving = 'true';
			x = parseInt(params.left, 10);
			y = parseInt(params.top, 10);
			ox = (params.ox) ? params.ox : null;
			oy = (params.oy) ? params.oy : null;
			delay = (params.delay) ? params.delay : 15;
			callback = (params.callback) ? params.callback : false;
			direction = {
				horizontal: '2right',
				vertical: '2bottom'
			};

			_o.m = _o.id;
			this.steps = 6;
			this.position = {
				'top': true,
				'left': true
			};
			this.diff = {
				'top': null,
				'left': null
			};

			// Get current positions
			if (_object.style.top !== "") {
				this.oy = _object.style.top;
			} else if (_object.style.bottom !== "") {
				this.oy = _object.style.bottom;
				this.position.top = false;
			} else {
				this.oy = 0;
			}

			if (_object.style.left !== "") {
				this.ox = _object.style.left;
			} else if (_object.style.right !== "") {
				this.ox = _object.style.right;
				this.position.left = false;
			} else {
				this.ox = 0;
			}

			if (parseInt(this.ox, 10) > x) {
				direction.horizontal = '2left';
			}
			if (parseInt(this.oy, 10) > y) {
				direction.vertical = '2top';
			}

			if (!ox) {
				ox = parseInt(this.ox, 10);
			}
			if (!oy) {
				oy = parseInt(this.oy, 10);
			}

			this.diff.left = ox - x;
			this.leftStep = parseInt(this.diff.left / this.steps, 10);

			this.diff.top = oy - y;
			this.topStep = parseInt(this.diff.top / this.steps, 10);

			// horizontal
			if (this.diff.left > 0 && (this.diff.left - this.leftStep) >= this.leftStep) {
				_object.style.left = ox - this.leftStep + "px";
				this.continueSlide = true;
			} else if (this.diff.left < 0 && (this.diff.left - this.leftStep) <= this.leftStep) {
				_object.style.left = ox - this.leftStep + "px";
				this.continueSlide = true;
			} else {
				_object.style.left = ox + "px";
			}

			// vertical
			if (this.diff.top > 0 && (this.diff.top - this.topStep) >= this.topStep) {
				if (this.position.top === true) {
					_object.style.top = oy - this.topStep + "px";
					this.continueSlide = true;
				} else {
					_object.style.bottom = oy + this.topStep + "px";
				}
			} else if (this.diff.top < 0) {
				if (this.position.top === true) {
					_object.style.top = oy - this.topStep + "px";
				} else {
					_object.style.bottom = oy - this.topStep + "px";
				}
			} else {
				if (this.position.top === true) {
					_object.style.top = oy + "px";
				} else {
					_object.style.bottom = oy + "px";
				}
			}

			if ((direction.horizontal === '2right' && this.diff.left <= this.steps * -1) || (direction.horizontal === '2left' && this.diff.left >= this.steps) || (direction.vertical === '2bottom' && this.diff.top <= this.steps * -1) || (direction.vertical === '2top' && this.diff.top >= this.steps)) {
				_o.m = setTimeout(function () {
					_o.moveTo({
						left: x,
						top: y,
						delay: delay,
						callback: callback,
						ox: parseFloat(_o.obj.style.left),
						oy: parseFloat(_o.obj.style.top)
					});
				}, delay);
			} else {
        _m_.object.moving = 'false';
				clearTimeout(_o.m);
				if (typeof callback === 'function') {
				  callback();
				}
			}

		};

    /** 
      * Object scrolls to position
      * @param {Object} params
      *
      * @example
      * panorama.scrollTo({
    	*   left: "-4208px", 
    	*   top: "0"
    	* });
    */
		mashi.object.prototype.scrollTo = function (param) {

			var left, top, delay;

			left = parseInt(param.left, 10);
			top = parseInt(param.top, 10);
			delay = (param.delay !== undefined) ? parseInt(param.delay, 10) : undefined;
			this._scrollTo(left, top, delay);

		};

		/** @private */
		mashi.object.prototype._scrollTo = function (x, y, delay, step) {

			var d, s, _o = this,
				_object = this.obj;
			_o.m = _o.id;

			if (_m_.buttons.type === "single") {
				_ma_.$('controls-button-start').style.display = "none";
				_ma_.$('controls-button-stop').style.display = "none";
			}

			d = this.delay = (delay) ? delay : 1;
			s = this.steps = (step) ? step : 1;

			// Get current positions
			this.ox = parseInt(_object.style.left, 10);
			_object.style.left = this.ox - this.steps + 'px';
			if (x < this.ox) {
				_o.m = setTimeout(function () {
					_o._scrollTo(x, y, d, s);
				}, d);
			} else {
				if (_m_.buttons.type === "single") {
					_ma_.$('controls-button-start').style.display = "inline-block";
					_ma_.$('controls-button-stop').style.display = "none";
				}
				clearTimeout(_o.m);
			}
		};

    /** 
      * Object appears on position
      * @param {Object} params
      *
      * @example
      * GERTRUDE.appear({
      *   left: "400px",
      *   top: "98px",
      *   duration: 1500
      * });
    */
		mashi.object.prototype.appear = function (params) {

			var duration, steps, start, _object = this.obj;

			_object.style.zoom = "1";
			if (params) {
				_object.style.left = params.left;
				_object.style.top = params.top;
			}

			duration = (params && params.duration) ? params.duration : _m_.fade.duration;
			steps = (params && params.steps) ? params.steps : _m_.fade.steps;
			start = (params && params.start) ? params.start : _m_.fade.start;

			/*
			if (_mhelper_.hasClass(_object, 'hasChilds')) {
        _ma_.setOpacity(_object.id, 0);
        _ma_.fadeIn(_object.id, duration, steps, start);      
      }
      */
			
			if (_IE_ && _object.style.backgroundImage === '') {

				if (typeof jQuery !== 'undefined') {
					_ma_.fadeIn(_object.id, duration, steps, start);
				} else {
					_ma_.setOpacity(_object.id, 1);
				}
			} else {
				_ma_.setOpacity(_object.id, 0);
				_ma_.fadeIn(_object.id, duration, steps, start);
			}
		};

    /** 
      * Object disappears on position
      * @param {Object} params
      *
      * @example
      * GERTRUDE.disappear({
      *   left: "1400px",
      *   top: "98px",
      *   duration: 1500
      * });
    */
		mashi.object.prototype.disappear = function (params) {

			var duration, steps, end, _object = this.obj;

			_object.style.zoom = "1";
			if (params) {
				if (params.left) {
					_object.style.left = params.left;
				}
				if (params.top) {
					_object.style.top = params.top;
				}
			}

			duration = (params && params.duration) ? params.duration : _m_.fade.duration;
			steps = (params && params.steps) ? params.steps : _m_.fade.steps;
			end = (params && params.end) ? params.end : _m_.fade.end;

			if (_IE_ && _object.style.backgroundImage === '') {
				if (typeof jQuery !== 'undefined') {
					_ma_.fadeOut(_object.id, duration, steps, end);
				} else {
					_ma_.setOpacity(_object.id, 0);
				}
			} else {
				_ma_.setOpacity(_object.id, 1);
				_ma_.fadeOut(_object.id, duration, steps, end);
			}

		};

	}

}());
