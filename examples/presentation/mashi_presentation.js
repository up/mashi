var divs = mashi.slideshow.create({
  source: './presentation/mashi_presentation.xml'
  //bgimage: '../images/presentation/bg.jpg'
});

var headID = document.getElementsByTagName("head")[0];         
var cssNode = document.createElement('link');
cssNode.type = 'text/css';
cssNode.rel = 'stylesheet';
cssNode.href = '../stylesheets/slideshow.css';
cssNode.media = 'screen';
headID.appendChild(cssNode);

// ....................................................................................
DISPLAY.add(100, function() {
  DISPLAY.set({ 
    html: 
    '<br/><br/><br/><br/><span style="text-align:center"><em>Automatically generated with</em> mashi slideshow converter<em>.</em></span>' +
    '<span style="text-align:center"><em>(see</em> <a href="./presentation/mashi_presentation.htm">html source file</a><em>)</em></span>'
  }); 
});


