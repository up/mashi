/* modules */
mashi.module('all');
//mashi.module('preloader');
//mashi.module('controls');
//mashi.module('object.animation');
//mashi.module('object.easing');
//mashi.module('object.typewriter');

/* plugins */
mashi.plugin('mashi.fx-text-animation');
mashi.plugin('mashi.fx-canvas-circles');
mashi.plugin('thirdparty.processing');
if (_IE_) {
	mashi.plugin('thirdparty.excanvas');
}

mashi.frameset('content.intro');

var as_callback = function() {
  CanvasCircles({
    id: 'canvasframe',
    frameRate: 30,
    speed: 5,
    layer: 5,
    size: {
      base: 10,
      relative: [0.7, 5]
    },
    range: [5000, 5000000],
    brightness: {
      inner: 70,
      outer: 127
    },
    saturation: 155,
    alpha: 20,
    hue: 848,
    stroke: false,
    callback: function() {
      //_m_.frame.finished = true;
    }
  });
};


var app_config = function() {
  app.config({
    meta: {
      title: 'Mashi Website Application',
      author: 'Uli Preuss'
    },
    style: {
      reset: false
    },
    buttons: {
      type: 'single'
    },
    animation: {
      canvas: true,
      start: true
    }
  });

};

if(_IE_) {
  window.onload = function() {
    app_config();
  };  
}
else {
  app.isReady(function(){
    app_config();
  });  
}
