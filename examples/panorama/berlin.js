var panorama_header, panorama_bg, infolayer;
// ....................................................................................
PANORAMA.add(300, function() {
	panorama = new mashi.object({
    id: "panorama", 
    bgimage: "../images/page/panorama_berlin.jpg",
    width: 5200, 
    height: 244, 
    position: {
      left: 0, 
      top: 0
    }
  });
	panorama.scrollTo(-4208, 0)
});

// ....................................................................................
PANORAMA.add(100, function() {
	infolayer = new mashi.object({
    id: "infolayer", 
    bgimage: "../images/mashi/textlayer.png", 
    width: 390, 
    height: 320, 
    position: {
      left: -40, 
      top: 300
    }
  });
  infolayer.set({
    style: {
      fontSize: "13px",
      color: "#FFF",
      padding: "20px 30px 10px 50px"
    }
  });
  infolayer.moveTo(-40, 160);
});

// ....................................................................................
PANORAMA.add("auto", function() {
  infolayer.set({
    style: {
      fontSize: "28px"
    }
  });
  infolayer.run({
      html: '<b>Fernsehturm Berlin</b>',
      delay: 20,
      wait: 2000
  });
});


// ....................................................................................
PANORAMA.add("auto", function() {
  infolayer.set({
    style: {
      fontSize: "13px"
    }
  });
  infolayer.run({
      html: '360° panoramic view ' +
            'assembled from the observation deck' +
            '<br/>from 24 single images taken on March 15th 2007' +
            '<br/>&copy; by Michael F. Mehnert',
      delay: 60, 
      wait: 2000   
  });
});

// ....................................................................................
PANORAMA.add("auto", function() {
  infolayer.run({
      html: 'Close to Alexanderplatz, the tower was constructed between 1965 and 1969 ' +
            'by the former German Democratic Republic (GDR) administration',
      delay: 60, 
      wait: 2000   
  });
});

// ....................................................................................
PANORAMA.add("auto", function() {
  infolayer.run({
      html: 'who intended it as a symbol of Berlin, which it remains today, ' + 
            'as it is easily visible throughout the central and some suburban districts.',
      delay: 60, 
      wait: 2000   
  });
});

// ....................................................................................
PANORAMA.add("auto", function() {
  infolayer.run({
      html: ''  
  });
  infolayer.moveTo(-40, 300);
});
