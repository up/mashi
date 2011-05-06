/*
  Mashi Timeline Toolkit - Module Controls
  Copyright (c) 2008-2011 Uli Preuss. All Rights Reserved.
  Licensed under the terms of the GNU General Public License, version 2
  see: http://mashi.tv/license.md for details
*/


/* JSLINT OPTIONS ********************************************************************* */

/* jslint 
   white: true, onevar: true, undef: true, eqeqeq: true, bitwise: true, 
   regexp: false, newcap: true, immed: true, strict: true, indent: 2 
*/
/* global 
   document: false, setInterval: false, mashi: false, _m_: false, _ma_: false, _mhelper_: 
   false, _IE_: false, _IE_6_7_: false, _IE_8_: false, _IE_7_8_: false, _mIEhacks_: false 
*/


/* JSDOC TOOLKIT COMMENTS *************************************************************** */

/** @fileOverview Mashi - Module Controls */

/** Alias for mashi.application.prototype.controls */
var _mac_;

(function () {

  "use strict";

  if (typeof mashi.application !== "undefined") {
    mashi.application.prototype.controls = function () {};
    _mac_ = mashi.application.prototype.controls;
  }

  /** @private */
  _mac_.create = function () {

    var btnDetails, actBtn, controls, parent, layer, i, parts, reg, btn, stageframe;

    btnDetails = ["first|&#448;&#60;", "prev|&#60;&#60;", "start|&#62;", "stop|&#10073;&#10073;", "next|&#62;&#62;", "last|&#62;&#448;"];
    switch (_m_.buttons.type) {
    case 'single':
      actBtn = "start stop";
      break;
    case 'movie':
      actBtn = "start stop";
      break;
    case 'slideshow':
      actBtn = "first prev next last";
      break;
    case 'all':
      actBtn = "first prev start stop next last";
      break;
    default:
      actBtn = "";
    }

    if (_m_.buttons.type !== 'none') {
      controls = document.createElement("div");
      controls.id = "mashi-controls";
      controls.setAttribute('class', _m_.id);
      if (_m_.buttons.horizontal === "center") {
        controls.style.textAlign = "center";
      }
      parent = _m_.frame.odd.parentNode;
      parent.appendChild(controls);

      layer = document.createElement("div");
      layer.style.position = "absolute";
      layer.style.zIndex = "200";
      if (_m_.buttons.vertical === "top") {
        if(_IE_6_7_) {
          layer.style.top = "5px";
        }
        else {
          layer.style.top = "0px";
        }
      } else if (_m_.buttons.vertical === "bottom") {
        if(_IE_6_7_) {
          layer.style.bottom = "5px";
        }
        else {
          layer.style.bottom = "0px";
        }
      } else if (_m_.buttons.vertical === "middle") {
        layer.style.bottom = stageframe.offsetHeight / 2 - 5 + "px";
      }

      if (_m_.buttons.horizontal === "right") {
        layer.style.right = "5px";
      } else if (_m_.buttons.horizontal === "left") {
        layer.style.left = "5px";
      } else if (_m_.buttons.horizontal === "center") {
        layer.style.width = "99%";
      }

      controls.appendChild(layer);

      for (i = 0; i < btnDetails.length; i += 1) {
        parts = btnDetails[i].split('|');
        reg = new RegExp(parts[0], "i");
        if (reg.test(actBtn)) {
          btn = document.createElement("a");
          if (_m_.auto_start === true) {
            if (_m_.buttons.type === "single" && parts[0] === "start") {
              btn.style.display = "none";
            }
          } else {
            if (_m_.buttons.type === "single" && parts[0] === "stop") {
              btn.style.display = "none";
            }
          }
          btn.href = "javascript:" + _m_.namespace + "." + parts[0] + "();";
          btn.id = _m_.label.button.base + parts[0];
          if (_IE_) {
            btn.innerHTML = '&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;';
          }
          if (_m_.buttons.text === true) {
            btn.innerHTML = parts[1];
          }
          layer.appendChild(btn);
        }
      }
    }
  };

}());
