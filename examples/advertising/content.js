var TEXT;

// ....................................................................................

FRAMES.add(1500, function() {
  
  FRAMES.set({
    style: {
      backgroundImage: "url(../images/advertising/00.jpg)",
      backgroundColor: "#797461"
    }
  });

  TEXT = new mashi.object({
    id: "text_layer",
    width: 130,
    height: 50,
    position: {
      left: 0,
      top: -800
    }
  });

  TEXT.set({
    html: 'Alles grau in grau?',
    style: {
      backgroundImage: "url(../images/advertising/trans_white.png)",
      //backgroundColor: 'white',
      textAlign: "center",
      color: "black",
      padding: "15px",
      fontSize: "16px"
    }
  });

  TEXT.moveTo(0, 512);

});

// ....................................................................................

FRAMES.add(3000, function() {
  
  FRAMES.set({
    style: {
      backgroundImage: "url(../images/advertising/01.jpg)"
    }
  });
  
});

// ....................................................................................

FRAMES.add(3000, function() {

  FRAMES.set({
    style: {
      backgroundImage: "url(../images/advertising/02.jpg)"
    }
  });

  TEXT.set({
    html: 'Drogen wären eine Lösung.',
    style: {
      fontSize: "18px"
    }
  });
  
  TEXT.moveTo(0, -5);

});

// ....................................................................................

FRAMES.add(500, function() {

  FRAMES.set({
    style: {
      backgroundImage: "url(../images/advertising/03.jpg)"
    }
  });

});

// ....................................................................................

FRAMES.add(500, function() {

  FRAMES.set({
    style: {
      backgroundImage: "url(../images/advertising/04.jpg)"
    }
  });

});

// ....................................................................................

FRAMES.add(4000, function() {

  FRAMES.set({
    style: {
      backgroundImage: "url(../images/advertising/05.jpg)"
    }
  });

  TEXT.set({
    html: 'Oder?',
    style: {
      fontSize: "43px"
    }
  });
  
});

// ....................................................................................

FRAMES.add(1500, function() {

  FRAMES.set({
    style: {
      backgroundImage: "url(../images/advertising/00.jpg)"
    }
  });

  TEXT.moveTo(0, -500);
  
});
