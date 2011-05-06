/**
  * Mashi Plugin - CanvasCircles
  * Copyright (c) 2010-2011 Uli Preuss 
  * All Rights Reserved.
  *
  * Required: processing.js and excanvas.js
 */

/*jslint white: true, onevar: true, undef: true, eqeqeq: true, bitwise: true, regexp: false, newcap: true, immed: true, strict: true, indent: 4 */

/*global window: false, document: false, alert: false, Processing: false, Grow: false, animate: false */
var CanvasCircles, randomMinToMax, getStyle;

(function () {

  "use strict";

  CanvasCircles = function (params) {

    var config, ival, el, procel, width, height, abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
    init, i, Circle, Grow, animate, 
    layer = [], data = [], timeline = 0;

    if (params === undefined) {
      params = {};
    }
    if (params.id === undefined) {
      alert('ERROR: No Canvas ID defined!');
      return;
    }

    config = {
      id: params.id,
      frameRate: (params.frameRate) ? params.frameRate : 30,
      speed: (params.speed) ? params.speed : 5,
      layer: (params.layer) ? params.layer : 13,
      size: {
        base: (params.size.base) ? params.size.base : 5,
        relative: (params.size.relative) ? params.size.relative : [0.7, 5] // min, max
      },
      range: (params.range) ? params.range : [5000, 5000000],
      // ms - min, max
      brightness: {
        inner: (params.brightness.inner) ? params.brightness.inner : 192,
        outer: (params.brightness.outer) ? params.brightness.outer : 127
      },
      saturation: (params.saturation) ? params.saturation : 155,
      alpha: (params.alpha) ? params.alpha : 20,
      hue: (params.hue) ? params.hue : 848,
      stroke: (params.stroke) ? params.stroke : false,
      callback: (params.callback) ? params.callback : null
    };

    init = function () {
      el = document.getElementById(config.id);
      width = parseInt(getStyle(config.id, 'width'), 10);
      height = parseInt(getStyle(config.id, 'height'), 10);
      procel = new Processing(el);
      procel.size(width, height);
      procel.colorMode(procel.HSB);
      if (config.stroke === false) {
        procel.noStroke();
      }
      for (i = 0; i < config.layer; i++) {
        data.push({
          string: abc[randomMinToMax(0, 25)],
          date: new Date(timeline += randomMinToMax(config.range[0], config.range[1]))
        });
      }
      layer.push(new Grow(data));
      animate();
    };

    Circle = function (height, string) {
      var floor, maxAge = 100;
      floor = abc.join(' ').indexOf(string.charAt(0).toUpperCase()) / Math.pow(abc.length, 1);
      return {
        age: 0,
        x: floor * width * 4 / 5 + width / 5,
        y: height * Math.sin(floor * Math.PI) * Math.min(height, 90) * 3,
        dx: (Math.random() * width - width / 2) * 0.001,
        dy: (Math.random() * height - height / 2) * 0.001,
        hue: Math.floor(floor * config.hue),
        update: function () {
          this.age++;
          this.x += this.dx;
          this.y += this.dy;
          if (this.age >= maxAge) {
            layer.remove(this);
          }
        },
        draw: function () {
          var hue, r, factor, age = this.age;
          hue = this.hue + age * 0.1;
          r = age * age / 50 + 2 * age + 30 * config.size.base;
          factor = randomMinToMax(config.size.relative[0], config.size.relative[1]);
          procel.fill(hue, age + config.saturation, config.brightness.inner - age, config.alpha - 1.5 * age);
          procel.ellipse(this.x, this.y * factor, r * factor, r * factor);
          procel.fill(hue, age + config.saturation, config.brightness.outer - age, config.alpha - 1.5 * age);
          procel.ellipse(this.x, this.y * factor, r * factor * 4 / 5, r * factor * 4 / 5);
          procel.fill(0, 0, 255, config.alpha);
        }
      };
    };

    Grow = function (data) {
      var al, min, max, frames, delta, frame;
      al = data.length;
      min = data[0].date.getTime();
      max = data[al - 1].date.getTime();
      frames = al * config.frameRate / config.speed;
      delta = (max - min) / frames;
      frame = 0;
      return {
        update: function () {
          var c, d;
          if (frame > al) {
            window.clearInterval(ival);
            if (typeof config.callback === 'function') {
              config.callback();
            }
          }
          frame++;
          d = min + frame * delta;
          while (data.length > 0 && data[0].date.getTime() <= d) {
            c = data.shift();
            layer.push(new Circle(layer.length, c.string));
          }
        },
        draw: function () {
          procel.background(0, 15);
        }
      };
    };

    animate = function () {
      var run = function () {
        for (var i = 0; i < layer.length; i++) {
          layer[i].update();
          layer[i].draw();
        }
      };
      ival = window.setInterval(run, 1000 / config.frameRate);
    };

    init();

  };

  /* HELPER */

  randomMinToMax = function (min, max) {
    return Math.floor(Math.random() * (max + 1));
  };

  getStyle = function (el, styleProp) {
    var y, x = document.getElementById(el);
    if (x.currentStyle) {
      y = x.currentStyle[styleProp];
    } else if (window.getComputedStyle) {
      y = document.defaultView.getComputedStyle(x, null).getPropertyValue(styleProp);
    }
    return y;
  };

  Array.prototype.remove = function (from, to) {
    if (typeof from !== "number") {
      return this.remove(this.indexOf(from));
    }
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
  };

} ());
