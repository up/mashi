var panorama, langlayer, infolayer, lang, language;


// ....................................................................................
I18N.add(200, function() {

  document.getElementById('textframe_gp').style.display = "none";

	panorama = new mashi.object({
    id: "panorama_bg", 
    //bgimage: "../images/inline/ostkreuz_panorama2.jpg",
    //width: 1464, 
    bgimage: "../images/page/tiles_and_clouds_panorama.jpg",
    width: 2748, 
    height: 244, 
    position: {
      left: 0, 
      top: 0
    }
  });
});


// ....................................................................................
I18N.add("auto", function() {
	langlayer = new mashi.object({
    id: "langlayer", 
    bgimage: "", 
    width: 200, 
    height: 50, 
    position: {
      left: -300, 
      top: 70
    }
  });
  langlayer.set({  // TODO CHANGE: langlayer.set({});
    _: null,        // TODO ADD: set all props to defaults
    html: mashi.fetch(
  	  'i18n/hello.lang.xml',      // External document (url-path)
  	  '/html/body/div[@id="select"]'   // Node (xpath)
  	),
    style: {
      fontSize: "14px",
      color: "#FFF",
      backgroundColor: "#666666",
      padding: "2px",
      border: "3px solid #ccc",
      textAlign: "center"
    }
  });
  langlayer.appear(70, 40);
});

// ....................................................................................
I18N.add(100, function() {
  //langlayer.disappear(70, 40);
  langlayer.set({
    style: {
      visibility: "hidden"
    }
  });
  
});

// ....................................................................................
I18N.add(2000, function() {
	panorama.moveTo(-2200, 0, 70)
});

// ....................................................................................
I18N.add(1000, function() {
  langlayer.set({
    style: {
      visibility: "visible"
    }
  });
  var radios = document.getElementsByTagName('input');
  for(var i=0; i<radios.length; i++) {
    if(radios[i].checked === true) {
      language = radios[i].value;
    }
  }
  langlayer.set({
    html: mashi.fetch(
  	  './i18n/hello.lang.xml',                                 // External document (url-path)
  	  '/html/body/div[@id="hello"]/div[@lang="' + language + '"]'   // Node (xpath)
  	),
    style: {
      fontSize: "27px",
      paddingTop: "20px"
    }
  });
  //langlayer.appear(70, 40);
});

// ....................................................................................
I18N.add(200, function() {
  infolayer = new mashi.object({
    id: "infolayer", 
    bgimage: "", 
    width: 200, 
    height: 200, 
    position: {
      left: 630, 
      top: 1020
    }
  });
  infolayer.set({  
    html: "<h2><b>I18n Example</b></h2>",
    style: {
      fontSize: "14px",
      color: "#FFF",
      padding: "2px",
      textAlign: "right"
    }
  });
  infolayer.moveTo(630, 20);
});

// ....................................................................................
I18N.add(200, function() {
  infolayer.set({  
    $html: 
      "<p>The <em style='color:grey'>mashi.fetch()</em> method enables to get elements from external (valid) HTML or XML files " +
      "via xpath expressions. </p>"
  });
});

// ....................................................................................
I18N.add(500, function() {
  infolayer.set({  
    $html: 
      "<p>See external file: <a href='i18n/hello.lang.xml'>hello.lang.xml</a></p>"
  });
});

