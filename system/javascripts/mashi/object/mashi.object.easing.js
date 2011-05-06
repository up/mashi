/*
  Mashi Timeline Toolkit - Module Object Easing
  Copyright (c) 2008-2011 Uli Preuss. All Rights Reserved.
  Licensed under the terms of the GNU General Public License, version 2
  see: http://mashi.tv/license.md for details

  EASING EQUATIONS - Copyright 2001 Robert Penner All Rights Reserved.
*/


/* JSLINT OPTIONS ********************************************************************* */

/* jslint 
   white: true, onevar: true, undef: true, eqeqeq: true, bitwise: true, regexp: false, 
   newcap: true, immed: true, strict: true, indent: 2 
*/
/* global 
   setInterval: false, clearInterval: false, _m_: false 
*/


/* JSDOC TOOLKIT COMMENTS *************************************************************** */

/** @fileOverview Mashi - Module Object.Easing */

(function () {

  "use strict";
  
  if (typeof _m_.object !== "undefined") {
    
    /** 
      * Object Easing
      * @param {Object} configuration
      *
      * @example
      * NINJA.easing({
      *   property: 'left', 
      *   type: 'easeInQuad', 
      *   begin: right,
      *   finish: left, 
      *   duration: duration,
      *   callback: function () {}
      * });
    */
    mashi.object.prototype.easing = function (p) {

      var _object = this.obj,
        that = this,
        time = 0;

      /** @private */
      this.ival = setInterval(function () {
        _object.style[p.property] = Math[p.type](time, parseInt(p.begin, 10), parseInt(p.finish, 10) - parseInt(p.begin, 10), p.duration) + ((p.property === 'opacity') ? '' : 'px');
        time += 1;

        if (time > p.duration) {
          _object.style[p.property] = p.finish;
          clearInterval(that.ival);
          if(p.callback !== undefined) {
            p.callback();
          }
        }
      }, 1);

    };

    /*
      TERMS OF USE - EASING EQUATIONS
      Open source under the BSD License.
      Copyright 2001 Robert Penner All rights reserved.

      Redistribution and use in source and binary forms, with or without modification, 
      are permitted provided that the following conditions are met:

       * Redistributions of source code must retain the above copyright notice, 
         this list of conditions and the following disclaimer.
       * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following 
         disclaimer in the documentation and/or other materials provided with the distribution.
       * Neither the name of the author nor the names of contributors may be used to endorse or promote products derived 
         from this software without specific prior written permission.

      THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, 
      INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. 
      IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
      CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, 
      OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, 
      OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE 
      POSSIBILITY OF SUCH DAMAGE.
      */

    // simple linear tweening - no easing
    // t: current time, b: beginning value, c: change in value, d: duration
    Math.linearTween = function (t, b, c, d) {
      return c * t / d + b;
    };

    ///////////// QUADRATIC EASING: t^2 ///////////////////
    // quadratic easing in - accelerating from zero velocity
    // t: current time, b: beginning value, c: change in value, d: duration
    // t and d can be in frames or seconds/milliseconds
    Math.easeInQuad = function (t, b, c, d) {
      return c * (t /= d) * t + b;
    };

    // quadratic easing out - decelerating to zero velocity
    Math.easeOutQuad = function (t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    };

    // quadratic easing in/out - acceleration until halfway, then deceleration
    Math.easeInOutQuad = function (t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t + b;
      }
      return -c / 2 * ((--t) * (t - 2) - 1) + b;
    };

    ///////////// CUBIC EASING: t^3 ///////////////////////
    // cubic easing in - accelerating from zero velocity
    // t: current time, b: beginning value, c: change in value, d: duration
    // t and d can be frames or seconds/milliseconds
    Math.easeInCubic = function (t, b, c, d) {
      return c * (t /= d) * t * t + b;
    };

    // cubic easing out - decelerating to zero velocity
    Math.easeOutCubic = function (t, b, c, d) {
      return c * ((t = t / d - 1) * t * t + 1) + b;
    };

    // cubic easing in/out - acceleration until halfway, then deceleration
    Math.easeInOutCubic = function (t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t + b;
      }
      return c / 2 * ((t -= 2) * t * t + 2) + b;
    };

    ///////////// QUARTIC EASING: t^4 /////////////////////
    // quartic easing in - accelerating from zero velocity
    // t: current time, b: beginning value, c: change in value, d: duration
    // t and d can be frames or seconds/milliseconds
    Math.easeInQuart = function (t, b, c, d) {
      return c * (t /= d) * t * t * t + b;
    };

    // quartic easing out - decelerating to zero velocity
    Math.easeOutQuart = function (t, b, c, d) {
      return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    };

    // quartic easing in/out - acceleration until halfway, then deceleration
    Math.easeInOutQuart = function (t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t * t + b;
      }
      return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    };

    ///////////// QUINTIC EASING: t^5  ////////////////////
    // quintic easing in - accelerating from zero velocity
    // t: current time, b: beginning value, c: change in value, d: duration
    // t and d can be frames or seconds/milliseconds
    Math.easeInQuint = function (t, b, c, d) {
      return c * (t /= d) * t * t * t * t + b;
    };

    // quintic easing out - decelerating to zero velocity
    Math.easeOutQuint = function (t, b, c, d) {
      return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    };

    // quintic easing in/out - acceleration until halfway, then deceleration
    Math.easeInOutQuint = function (t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t * t * t + b;
      }
      return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    };

    ///////////// SINUSOIDAL EASING: sin(t) ///////////////
    // sinusoidal easing in - accelerating from zero velocity
    // t: current time, b: beginning value, c: change in position, d: duration
    Math.easeInSine = function (t, b, c, d) {
      return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    };

    // sinusoidal easing out - decelerating to zero velocity
    Math.easeOutSine = function (t, b, c, d) {
      return c * Math.sin(t / d * (Math.PI / 2)) + b;
    };

    // sinusoidal easing in/out - accelerating until halfway, then decelerating
    Math.easeInOutSine = function (t, b, c, d) {
      return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    };

    ///////////// EXPONENTIAL EASING: 2^t /////////////////
    // exponential easing in - accelerating from zero velocity
    // t: current time, b: beginning value, c: change in position, d: duration
    Math.easeInExpo = function (t, b, c, d) {
      return (t === 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    };

    // exponential easing out - decelerating to zero velocity
    Math.easeOutExpo = function (t, b, c, d) {
      return (t === d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    };

    // exponential easing in/out - accelerating until halfway, then decelerating
    Math.easeInOutExpo = function (t, b, c, d) {
      if (t === 0) {
        return b;
      }
      if (t === d) {
        return b + c;
      }
      if ((t /= d / 2) < 1) {
        return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      }
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    };

    /////////// CIRCULAR EASING: sqrt(1-t^2) //////////////
    // circular easing in - accelerating from zero velocity
    // t: current time, b: beginning value, c: change in position, d: duration
    Math.easeInCirc = function (t, b, c, d) {
      return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    };

    // circular easing out - decelerating to zero velocity
    Math.easeOutCirc = function (t, b, c, d) {
      return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    };

    // circular easing in/out - acceleration until halfway, then deceleration
    Math.easeInOutCirc = function (t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
      }
      return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    };

    /////////// ELASTIC EASING: exponentially decaying sine wave  //////////////
    // t: current time, b: beginning value, c: change in value, d: duration, a: amplitude (optional), p: period (optional)
    // t and d can be in frames or seconds/milliseconds
    Math.easeInElastic = function (t, b, c, d, a, p) {
      var s;
      if (a === undefined) {
        a = 10;
      }
      if (p === undefined) {
        p = 25;
      }
      if (t === 0) {
        return b;
      }
      if ((t /= d) === 1) {
        return b + c;
      }
      if (!p) {
        p = d * 0.3;
      }
      if (a < Math.abs(c)) {
        a = c;
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(c / a);
      }
      return - (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    };

    Math.easeOutElastic = function (t, b, c, d, a, p) {
      var s;
      if (a === undefined) {
        a = 10;
      }
      if (p === undefined) {
        p = 25;
      }
      if (t === 0) {
        return b;
      }
      if ((t /= d) === 1) {
        return b + c;
      }
      if (!p) {
        p = d * 0.3;
      }
      if (a < Math.abs(c)) {
        a = c;
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(c / a);
      }
      return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    };

    Math.easeInOutElastic = function (t, b, c, d, a, p) {
      var s;
      if (a === undefined) {
        a = 10;
      }
      if (p === undefined) {
        p = 25;
      }
      if (t === 0) {
        return b;
      }
      if ((t /= d / 2) === 2) {
        return b + c;
      }
      if (!p) {
        p = d * (0.3 * 1.5);
      }
      if (a < Math.abs(c)) {
        a = c;
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(c / a);
      }
      if (t < 1) {
        return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
      }
      return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
    };

    /////////// BACK EASING: overshooting cubic easing: (s+1)*t^3 - s*t^2  //////////////
    // back easing in - backtracking slightly, then reversing direction and moving to target
    // t: current time, b: beginning value, c: change in value, d: duration, s: overshoot amount (optional)
    // t and d can be in frames or seconds/milliseconds
    // s controls the amount of overshoot: higher s means greater overshoot
    // s has a default value of 1.70158, which produces an overshoot of 10 percent
    // s==0 produces cubic easing with no overshoot
    Math.easeInBack = function (t, b, c, d, s) {
      if (s === undefined) {
        s = 1.70158;
      }
      return c * (t /= d) * t * ((s + 1) * t - s) + b;
    };

    // back easing out - moving towards target, overshooting it slightly, then reversing and coming back to target
    Math.easeOutBack = function (t, b, c, d, s) {
      if (s === undefined) {
        s = 1.70158;
      }
      return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    };

    // back easing in/out - backtracking slightly, then reversing direction and moving to target,
    // then overshooting target, reversing, and finally coming back to target
    Math.easeInOutBack = function (t, b, c, d, s) {
      if (s === undefined) {
        s = 1.70158;
      }
      if ((t /= d / 2) < 1) {
        return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
      }
      return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    };

    /////////// BOUNCE EASING: exponentially decaying parabolic bounce  //////////////
    // bounce easing in
    // t: current time, b: beginning value, c: change in position, d: duration
    Math.easeInBounce = function (t, b, c, d) {
      return c - Math.easeOutBounce(d - t, 0, c, d) + b;
    };

    // bounce easing out
    Math.easeOutBounce = function (t, b, c, d) {
      if ((t /= d) < (1 / 2.75)) {
        return c * (7.5625 * t * t) + b;
      } else if (t < (2 / 2.75)) {
        return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
      } else if (t < (2.5 / 2.75)) {
        return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
      } else {
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
      }
    };

    // bounce easing in/out
    Math.easeInOutBounce = function (t, b, c, d) {
      if (t < d / 2) {
        return Math.easeInBounce(t * 2, 0, c, d) * 0.5 + b;
      }
      return Math.easeOutBounce(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
    };

  }

}());
