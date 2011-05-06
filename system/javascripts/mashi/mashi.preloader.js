/*
  Mashi Timeline Toolkit - Module Preloader
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
   window: false, document: false, setTimeout: false, mashi: false, _m_: false, 
   _mhelper_: false, _IE_6_: false, MASHI_APP_PATH: false 
*/


/* JSDOC TOOLKIT COMMENTS *************************************************************** */

/** @fileOverview Mashi - Module Preloader */

/** Alias for mashi.application.prototype.preloader */
var _map_;

(function () {

  "use strict";

  if (typeof mashi.application.preloader === "undefined") {

    if (mashi.min === false) {
      mashi.module('helper');
    }

    _map_ = mashi.application.prototype.preloader = function () {};

    /** @private */
    _map_.init = function () {

      var stageframe, stageframe_height, mHTML, i;

      stageframe = document.getElementById('stageframe');
      stageframe_height = parseFloat(_mhelper_.getStyle('stageframe', 'height')) / 2 - 17;
      _map_.PI = document.createElement('div');
      _map_.PI.setAttribute('id', 'progressIndicator');
      _map_.PI.style.position = 'relative';
      _map_.PI.style.top = '40%';
      _map_.PI.style.height = '100%';

      _map_.PI.innerHTML = '&nbsp;';
      stageframe.appendChild(_map_.PI);

      this.progress = 0;
      this.image_array = this.getImages();
      if (this.image_array.length === 0) {
        this.preloadCallback(1000);
      } else {
        this.addPreloadLayer();
        mHTML = "";

        for (i = 0; i < this.image_array.length; i += 1) {
          //Todo: enables background image cache for internet explorer 6
          if (_IE_6_) {
            // no preload in ie6
            _map_.incrementProgress();
          } else {
            mHTML += '<img onload="_map_.incrementProgress();" class="preloadImages" width=1 height=1 src=' + MASHI_APP_PATH + this.image_array[i] + '>';

          }

        }
        document.getElementById("mContainer").innerHTML = mHTML;
      }

    };

    /** @private */
    _map_.getImages = function () {

      var reg, func_str, results, k, i, img_arr = [],
        pattern, unique_img_arr, matches;

      for (i = 0; i < _m_.frame.array.length; i += 1) {

        reg = new RegExp("src", "ig");
        if (reg.test(_m_.frame.array[i])) {
          func_str = _m_.frame.array[i][1].toString();
          results = func_str.match(/src.+(png|gif|jpeg|jpg)/g);
          if (results !== null) {
            for (k = 0; k < results.length; k += 1) {
              pattern = /src\s?=\s?.['|"]+\s?\+\s?MASHI_APP_PATH\s?\+\s?['|"]+(.+(png|gif|jpeg|jpg))/g;
              while (true) {
                matches = pattern.exec(results[k]);
                if (!matches) {
                  break;
                }
                img_arr.push(matches[1]);
              }
            }
          }
        }

        reg = new RegExp("url", "ig");
        if (reg.test(_m_.frame.array[i])) {
          func_str = _m_.frame.array[i][1].toString();
          results = func_str.match(/url.[^.]+\.(png|gif|jpeg|jpg)/g);
          //console.log(results)
          if (results !== null) {
            for (k = 0; k < results.length; k += 1) {
              pattern = /MASHI_APP_PATH\s?\+\s?['|"]+(.+(png|gif|jpeg|jpg))/g;
              while (true) {
                matches = pattern.exec(results[k]);
                if (!matches) {
                  break;
                }
                img_arr.push(matches[1]);
              }
            }
          }
        }

      }
      unique_img_arr = _mhelper_.array_unique(img_arr).sort();
      //for(i in unique_img_arr) alert(unique_img_arr[i]);
      _m_.image.array = unique_img_arr;
      return unique_img_arr;
    };

    /** @private */
    _map_.addPreloadLayer = function () {

      var div = document.createElement("div");
      div.id = "mContainer";
      document.getElementsByTagName('body')[0].appendChild(div);

    };

    /** @private */
    _map_.incrementProgress = function () {
      this.progress += 1;
      var progressbarWidth = (this.progress / this.image_array.length) * 100;
      _map_.PI.innerHTML = parseInt(progressbarWidth, 10);
      if (this.progress >= this.image_array.length) {
        this.preloadCallback(300);
      }
    };

    /** @private */
    _map_.preloadCallback = function (delay) {

      setTimeout(function () {
        if (_map_.PI.parentNode && _map_.PI.parentNode.removeChild) {
          _map_.PI.parentNode.removeChild(_map_.PI);
        }
        if (_m_.start === true) {
          window[_m_.namespace].start();
        }
        _ma_.$("mashi-controls").style.display = "block";
        
      }, delay);

    };

  }

}());
