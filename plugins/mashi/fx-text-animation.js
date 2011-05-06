/**
 * Animation: Text String
 * Required: mashi.object.animations.js
 * Copyright (c) 2008-2011, Uli Preuss. 
 * All Rights Reserved.
 */

/*jslint white: true, onevar: true, undef: true, eqeqeq: true, bitwise: true, regexp: false, newcap: true, immed: true, strict: true, indent: 2 */

/*global window: false, document: false, setInterval: false, clearInterval: false, setTimeout: false, num: false, mashi: false, _m_: false, _ma_: false */

var textanimation;

(function () {

  "use strict";

  textanimation = function (c) {
    _m_.object.moving = 'true';
    _ma_.global.stop = false;

    var wait, adjustment, i, cache = '', props = {},
      num_global = 0,
      char_width, character = 0,
      kernel = {}, displayCharacter,
      obj_stageframe, obj_kernel, alphabet, span, string, duration, classname, num, match, observer, observer_ready;

    /* Calculate the Kernel */
    obj_stageframe = document.getElementById(_m_.label.stage);
    obj_kernel = document.createElement("div");
    obj_kernel.id = 'kernel';
    obj_stageframe.appendChild(obj_kernel);

    alphabet = ("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789").split('');
    for (i = 0; i < alphabet.length; i++) {

      span = document.createElement("span");
      span.id = 'char_' + alphabet[i];
      span.style.fontSize = c.style.fontSize;
      span.style.fontFamily = c.style.fontFamily;
      span.style.letterSpacing = '0';
      span.appendChild(document.createTextNode(alphabet[i]));
      document.getElementById("kernel").appendChild(span);

      kernel['char_' + alphabet[i]] = document.getElementById('char_' + alphabet[i]).offsetWidth;
      document.getElementById('char_' + alphabet[i]).id = 'dummy' + i; // for ie7 - matching case insensitivy object/id
    }

    if (obj_kernel.hasChildNodes()) {
      while (obj_kernel.childNodes.length >= 1) {
        obj_kernel.removeChild(obj_kernel.firstChild);
      }
    }

    obj_stageframe.removeChild(obj_kernel);
    /* end */

    string = c.string.split('');
    duration = c.animation.speed;
    classname = (c.className !== undefined) ? c.className : '';

    props.letterSpacing = parseFloat(c.style.letterSpacing, 10);
    props.left_start = parseInt(c.position.left.start, 10);
    props.top_start = parseInt(c.position.top.start, 10);
    props.left_end = parseInt(c.position.left.end, 10);
    props.top_end = parseInt(c.position.top.end, 10);

    if (c.animation.wait !== undefined && c.animation.wait.after !== undefined) {
      wait = c.animation.wait.after;
    } else {
      wait = 100;
    }

    if (c.animation.wait !== undefined && c.animation.wait.adjustment !== undefined) {
      adjustment = c.animation.wait.adjustment;
    } else {
      adjustment = 100;
    }


    displayCharacter = function (num) {

      setTimeout(function () {
    
      if(_ma_.global.stop === true) {
        return;
      }

      character = string[num - 1];

      if (kernel['char_' + character] !== undefined) {
        char_width = props.letterSpacing * kernel['char_' + character];
      } else {
        // Unknown characters get the kernel of the 'e' character
        char_width = props.letterSpacing * (kernel.char_e / 2);
      }

      props.left_end += char_width;

      character = string[num];
      match = 0;
      for (var k = 0; k < cache.length; k++) {
        if (character === cache.substr(k, character.length)) {
        match++;
        }
      }

      cache = cache + ' ' + string[num];

      character = 'char_' + num_global;

      window['obj' + character] = new mashi.object({
        id: character,
        className: classname,
        position: {
        left: props.left_start,
        top: props.top_start
        }
      });

      window['obj' + character].set({
        type: 'textanimation',
        html: string[num],
        style: {
        fontFamily: c.style.fontFamily,
        fontSize: c.style.fontSize,
        color: c.style.color,
        textShadow: (c.style.textShadow) ? c.style.textShadow : ''
        }
      });

      if (c.animation.type === 'appear') {
        window['obj' + character].appear({
        left: props.left_end + "px",
        top: props.top_end + "px"
        });
      } else if (c.animation.type === 'moveTo') {
        window['obj' + character].appear({
        left: props.left_start + "px",
        top: props.top_start + "px"
        });
        window['obj' + character].moveTo({
        left: props.left_end + "px",
        top: props.top_end + "px"
        });
      }

      num_global++;

      }, duration += c.animation.step);

    };

    observer_ready = setInterval(function () {
      if (typeof _m_.test_object.appear === 'function') {
      clearInterval(observer_ready);
      for (i = num = 0; i < string.length; i++) {
        displayCharacter(num);
        num++;
      }  
      num_global++;
      } 
    },
    100);

    observer = setInterval(function () {
      if (_ma_.global.stop === true) {
      clearInterval(observer);
      } else if (_m_.object.moving === 'false') {
      setTimeout(function () {
        _ma_.next();
        setTimeout(function () {
        _ma_.clearStage();
        _ma_.start();
        }, wait);
      }, adjustment);
      clearInterval(observer);
      }
    },
    100);

  };

} ());
