/**
 * Author: Uli Preuss
 * 
*/


var addTextLayer, dummy, textLayer, twitterbird, twitterlogo, link, timeout, firefox, ie, safari, opera, chrome;

addTextLayer = function() {
  textLayer = new mashi.object({
    id: "textLayer",
    className: 'png',  
    style: {
      width: "100%",
      left: "0px",
      top: "50px"
    }
  });
};

app.hook.post = function () {
  if(link === undefined) { return; }
  link.set({ html: '' });
};


/**
  * FRAMESET ****************************************************************  
*/

app.add(100, function() {

  link = new mashi.object({
    id: "link",
    style: {
      left: "30px",
      bottom: "30px",
      zIndex: '2000'
    },
    event: {
      //click: function() {},
      //dblclick: function() {},
      //mousedown: function() {},
      //mouseup: function() {},
      //mousemove: function() {},
      mouseout: function() {
        this.style.color = "inherit";
      },
      mouseover: function() {
        this.style.color = "#cea500";
      }
    },
    appendTo: 'app_container' // default: stageframe
  });  

});

/* INTRO ***************************************************************** */
app.addSection('intro', as_callback);

app.add('auto', function() {

  textanimation({
    string: "Introducing Mashi", 
    className: 'intro',
    style: {
      color: "#ccc",
      fontFamily: "Trebuchet MS",
      fontSize: "50px",
      letterSpacing: "1.23em",
      textShadow: "10px 10px 6px #000000"
    },   
    position: {
      top: {
      start: "120px", 
      end: "120px"
      }, 
      left: {
      start: "2455px", 
      end: "183px"
      }  
    },
    animation: {
      type: "moveTo",
      speed: 2, 
      step: 120,
      wait: {
        adjustment: 500,
        after: 2000
      }
    }  
  });

});

app.add(2000, function() {
    
  app.each('.intro').disappear({
    delay: 50,
    speed: 1000,
    steps: 20,
    opacity: 1
  });
  
});

app.add(5000, function() {

  app.set({
    html: 
      '<span style="letter-spacing: 0.15em; font-size: 28px;">' +
      '  The JavaScript Toolkit for<br/>' +
      '  timeline-based web applications.' +
      '</span>',
    style: {
      fontSize: "27px",
      lineHeight: "29px"
    }
  });
  
});

app.add(500, function() {

  app.set({
    html: ''
  });
  
});

app.add(6000, function() {

  app.set({
    html: 
      'Mashi allows you to create<br/>' +
      'flash-like movies and complex animations<br/>' +
      'with standard (X)HTML, CSS and JavaScript.',
    style: {
      fontSize: "20px",
      letterSpacing: "0.12em",
      lineHeight: "1.1em"
    }
  });

});


app.add(300, function() {

  app.set({
    html: ''
  });

});

app.add(6000, function() {

  app.set({
    html: 
      'Mashi is compact, object-oriented, modular and<br/>' +
      'lightweight: incl. all modules 41kb / 13kb (CDN+GZip)'
  });
  
  _m_.frame.fading = false;

});

app.add(500, function() {

  app.set({
    html: ''
  });
  
});

app.add(4500, function() {

  app.set({
    html: 
      'Mashi requires no additional plugins for basic usage ..'
  });

});

app.add(3500, function() {

  app.set({
    html: 
      'and supports all major browsers ..'
  });

});

app.add(300, function() {

  app.set({
    html: ''
  });

  firefox = new mashi.object({
    id: "firefox",
    style: {
      width: "128px",
      height: "128px",
      left: "-500px",
      top: "98px",
      backgroundImage: "url(" + MASHI_APP_PATH + "content/images/browser/Firefox.png)"
    }
  });
  firefox.moveTo({
      left: "100px",
      top: "98px"
  });

});

app.add(300, function() {

  safari = new mashi.object({
    id: "safari",
    style: {
      width: "128px",
      height: "128px",
      left: "-500px",
      top: "98px",
      backgroundImage: "url(" + MASHI_APP_PATH + "content/images/browser/Safari.png)"
    }
  });
  safari.moveTo({
      left: "250px",
      top: "98px"
  });

});


app.add(300, function() {

  ie = new mashi.object({
    id: "ie",
    style: {
      width: "128px",
      height: "128px",
      left: "-500px",
      top: "98px",
      backgroundImage: "url(" + MASHI_APP_PATH + "content/images/browser/IE.png)"
    }
  });
  ie.moveTo({
      left: "400px",
      top: "98px"
  });

});

app.add(300, function() {

  opera = new mashi.object({
    id: "opera",
    style: {
      width: "128px",
      height: "128px",
      left: "-500px",
      top: "98px",
      backgroundImage: "url(" + MASHI_APP_PATH + "content/images/browser/Opera.png)"
    }
  });
  opera.moveTo({
      left: "550px",
      top: "98px"
  });

});

app.add(2000, function() {

  chrome = new mashi.object({
    id: "chrome",
    style: {
      width: "128px",
      height: "128px",
      left: "-500px",
      top: "98px",
      backgroundImage: "url(" + MASHI_APP_PATH + "content/images/browser/Chrome.png)"
    }
  });
  chrome.moveTo({
      left: "700px",
      top: "98px"
  });

});

app.add(1000, function() {

  app.set({
    html: ''
  });

});

app.add(100, function() {

  firefox.disappear();

});

app.add(100, function() {

  safari.disappear();

});

app.add(100, function() {

  ie.disappear();

});

app.add(100, function() {

  opera.disappear();
  
});

app.add(100, function() {

  chrome.disappear();

});

app.add(500, function() {

  iphone = new mashi.object({
    id: "iphone",
    style: {
      width: "71px",
      height: "128px",
      left: "-500px",
      top: "98px",
      backgroundImage: "url(" + MASHI_APP_PATH + "content/images/browser/IPhone.png)"
    }
  });
  iphone.moveTo({
      left: "100px",
      top: "98px"
  });

});

app.add(500, function() {

  ipad = new mashi.object({
    id: "ipad",
    style: {
      width: "232px",
      height: "128px",
      left: "-500px",
      top: "98px",
      backgroundImage: "url(" + MASHI_APP_PATH + "content/images/browser/IPad.png)"
    }
  });
  ipad.moveTo({
      left: "580px",
      top: "98px"
  });

});

app.add(4500, function() {

  app.set({
    html: 
      '<div style="font-size: 17px; padding-right: 148px">' + 
      '   Mashi works on iPad, iPhone and <br/>' +
      '   any mobile device<br/>' +
      '   with a modern browser.' +
      '</div>'
  });

});

app.add(800, function() {

  ipad.disappear();
  iphone.disappear();

  app.set({
    html: ''
  });
  
  _m_.frame.fading = false;

});

app.add(2000, function() {

  app.set({
    html: 
    'Mashi is framework independent.<br/>'+
    '&nbsp;'
  });

});

app.add(4000, function() {

  app.set({
    html: 
    'Mashi is framework independent.<br/>'+
    'You can easily integrate your favorite one.'
  });

});

app.add(1000, function() {

  app.set({
    html: ''
  });

});

app.add(5000, function() {

  app.set({ 
    html: 
      'Mashi is under constant development.<br/>' +
      'Visit our timelabs and blog to learn more.'
  });

});

app.add(1000, function() {

  app.set({
    html: ''
  });

});

app.add(5000, function() {

  app.set({
    html: 'May creativity<br/>be with you!',
    style: {
      fontSize: "33px",
      lineHeight: "33px"
    }
  });

  app.stop();

});

