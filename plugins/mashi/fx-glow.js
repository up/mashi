/**
 * FX Tool: Glow (Color Fader) 
 * Copyright (c) 2008-2011, Uli Preuss. 
 * All Rights Reserved.
 */

/*jslint white: true, onevar: true, undef: true, eqeqeq: true, bitwise: true, regexp: false, newcap: true, immed: true, strict: true, indent: 4 */

/*global document: false, setInterval: false, clearInterval: false */
var glow, shortenColorDistance, hex2rgb;

(function () {

  "use strict";

  glow = function (id, property, start, end, steps, speed) {
    var el, startrgb, endrgb, er, eg, eb, r, g, b, step, rint, gint, bint;
    el = document.getElementById(id);
    steps = steps || 20;
    speed = speed || 20;
    clearInterval(el.ival);
    endrgb = hex2rgb(end);
    er = endrgb[0];
    eg = endrgb[1];
    eb = endrgb[2];
    if (!el.r) {
      startrgb = hex2rgb(start);
      r = startrgb[0];
      g = startrgb[1];
      b = startrgb[2];
      el.r = r;
      el.g = g;
      el.b = b;
    }
    rint = Math.round(Math.abs(el.r - er) / steps);
    gint = Math.round(Math.abs(el.g - eg) / steps);
    bint = Math.round(Math.abs(el.b - eb) / steps);
    if (rint === 0) {
      rint = 1;
    }
    if (gint === 0) {
      gint = 1;
    }
    if (bint === 0) {
      bint = 1;
    }
    el.step = 1;
    el.ival = setInterval(function () {
      shortenColorDistance(id, property, steps, er, eg, eb, rint, gint, bint);
    },
    speed);
  };

  shortenColorDistance = function (id, property, steps, er, eg, eb, rint, gint, bint) {
    var color, r, g, b, el = document.getElementById(id);
    if (el.step <= steps) {
      r = el.r;
      g = el.g;
      b = el.b;
      if (r >= er) {
        r = r - rint;
      } else {
        r = parseInt(r, 10) + parseInt(rint, 10);
      }
      if (g >= eg) {
        g = g - gint;
      } else {
        g = parseInt(g, 10) + parseInt(gint, 10);
      }
      if (b >= eb) {
        b = b - bint;
      } else {
        b = parseInt(b, 10) + parseInt(bint, 10);
      }
      color = 'rgb(' + r + ',' + g + ',' + b + ')';
      if (property === 'background') {
        el.style.backgroundColor = color;
      } else if (property === 'border') {
        el.style.borderColor = color;
      } else {
        el.style.color = color;
      }
      el.r = r;
      el.g = g;
      el.b = b;
      el.step = el.step + 1;
    } else {
      clearInterval(el.ival);
      color = 'rgb(' + er + ',' + eg + ',' + eb + ')';
      if (property === 'background') {
        el.style.backgroundColor = color;
      } else if (property === 'border') {
        el.style.borderColor = color;
      } else {
        el.style.color = color;
      }
    }
  };

  hex2rgb = function (color) {
    return [
      parseInt(color.substring(0, 2), 16), 
      parseInt(color.substring(2, 4), 16), 
      parseInt(color.substring(4, 6), 16)
    ];
  };

} ());
