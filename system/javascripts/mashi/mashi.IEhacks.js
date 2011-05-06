/*
  Mashi Timeline Toolkit - Module IEhacks
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
   document: false, mashi: false, _IE_6_: false, _IE_7_8_: false 
*/


/* JSDOC TOOLKIT COMMENTS *************************************************************** */

/** @fileOverview Mashi - Module IEhacks */

/** Alias for mashi.application.prototype.IEhacks */
var _mIEhacks_;

(function () {

  "use strict";
  
  if (typeof mashi.application.IEhacks === "undefined") {
   
    _mIEhacks_ = mashi.application.prototype.IEhacks = function () {};

    
    /** @private */
    _mIEhacks_.textShadow = function (obj, textShadow, fontFamily, ie8) {
      
      var propSet, html, valueParts, shadowLeft, shadowTop, shadowBlur, shadowColor, position, shadow, setParts, i, num, props;
      
      if (!textShadow) { return; }
      
      propSet = textShadow.split(',');
      obj.style.position = 'absolute';
      obj.style.zoom = '1';
      
      html = obj.innerHTML;
      // TODO: Optimise and extend simulation

      // Simulate Normal Shadow
      // if single set of 'textShadow' properties
      if (propSet.length === 1) { 
        valueParts = textShadow.split(' ');
        shadowLeft = valueParts[0];
        shadowTop = valueParts[1];
        shadowBlur = valueParts[2];
        shadowColor = valueParts[3];
        position = (ie8) ? 'position: absolute; ' : '';
        shadow = ' ' +
          '<div' +
          '  style="' + 
          position + 
          '  left: ' + shadowLeft + ';' +
          '  top: ' + shadowTop + ';' +
          '  font-family: ' + fontFamily + ';' +
          '  z-index:-100;' +
          '  filter:' +
          '    progid:DXImageTransform.Microsoft.Shadow(' +
          '    Color:' + shadowColor + ',' +
          '    Strength:' + (parseInt(shadowTop, 10) * 2) + ',' +
          '    Direction:135' +
          '    )' +
          '    progid:DXImageTransform.Microsoft.Blur(' +
          '    pixelradius=' + (parseInt(shadowBlur, 10) / 9) + ', ' + 
          '    enabled=true' +
          '    );' +
          '  zoom:1;">' + 
          '   ' + html + 
          '</div>';
        obj.innerHTML = shadow;
      } else if (propSet.length === 2) { 
        // do nothing
      } else if (propSet.length === 3) { 
        // do nothing
      } else if (propSet.length === 4) { 
        
        // Simulate Border
        // if four sets of 'textShadow' properties

        setParts = textShadow.split(',');
        for (i in setParts) {
          if (setParts.hasOwnProperty(i)) {
            if (/-/.test(setParts[i]) === false) {
              num = i;
            }
          }
        }
        props = setParts[num].split(' ');
        shadowLeft = props[0];
        shadowTop = props[1];
        shadowBlur = props[2];
        shadowColor = props[3];
        shadow = ' ' +
          '<div ' +
          '  id="span_' + obj.id + '"' +
          '  class="' + obj.className + '"' +
          '  style="' +
          '  font-family: ' + fontFamily + ';' +
          '  left:' + shadowLeft + ';' +
          '  top:' + shadowTop + ';' +
          '  padding:' + shadowTop + ';' +
          '  z-index: -100;' +
          '  filter:' +
          '    progid:DXImageTransform.Microsoft.Glow(' +
          '    Color=' + shadowColor + ',' +
          '    Strength=' + parseInt(shadowBlur, 10) + 
          '    )' +
          '    progid:DXImageTransform.Microsoft.Blur(' +
          '    pixelradius=' + parseInt(shadowBlur, 10) + ', ' +
          '    enabled=true' +
          '    );' +
          '  zoom:1;">' + 
          '    ' + html + 
          '</div>';
        obj.innerHTML = shadow;
      }
    };
    
    /** @private */
    _mIEhacks_.pngChildHack = function (obj, src) {
      
      // TODO: enable fading transparent pngs in msie 6-8 (without jquery)
      var div = document.createElement('div');
      div.id = obj.id + '_child';
      div.className = 'isChild';
      div.style.width = obj.style.width;     
      div.style.height = obj.style.height;    
      if (src !== '') {
        div.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader( src=' + src + ')';
      }
      obj.appendChild(div);

    };
    
    /** @private */
    _mIEhacks_.addHTML = function (obj, html) {
      
      var div;
      
      if (document.getElementById(obj.id + '_child') !== null) {
        div = document.createElement('div');
        div.id = obj.id + '_text';
        div.style.padding = obj.style.padding;
        if (_IE_6_) {
          div.style.width = obj.style.width;
        } else if (_IE_7_8_ && obj.style.width !== '') {
          div.style.width = parseInt(obj.style.width, 10) - (parseInt(obj.style.padding, 10) * 2) + "px";
        }
        div.style.height = obj.style.height;    
        obj.style.marginLeft = '-' + obj.style.padding;
        obj.style.marginTop = '-' + obj.style.padding;
        div.style.lineHeight = obj.style.lineHeight;
        div.style.fontSize = obj.style.fontSize;
        div.innerHTML = html;
        div.style.filter = 'alpha(opacity=100)';
        document.getElementById(obj.id + '_child').appendChild(div);  
      } else {
        document.getElementById(obj.id).innerHTML = html;  
      } 
    };
    
  }
  
}());
