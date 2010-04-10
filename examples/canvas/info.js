var context, canvas;

function initCanvas() {
  canvas = document.getElementById("canvasframe");
  context = canvas.getContext("2d");
  if (! context) return;
  //context.shadowColor = "#222";
  //context.shadowOffsetX = 10;
  //context.shadowOffsetY = 10;
  //context.shadowBlur = 10;
  context.save();
  context.globalAlpha = 0.5;
  //context.globalCompositeOperation = "lighter"; // not implemented in iecanvas
}

// ....................................................................................
MO.add(200,
function() {
    initCanvas();
});

// ....................................................................................
MO.add(50,
function() {
  context.translate(0, 0)
  context.rotate(-0.11);
  context.fillStyle = "#333";
  context.fillRect(10, 10, 827, 324);
});


// ....................................................................................
MO.add(50,
function() {
  context.fillStyle = "red";
  context.fillRect(70, 40, 100, 100);
});

// ....................................................................................
MO.add(50,
function() {
  context.fillStyle = "green";
  context.fillRect(40, 70, 100, 100);
});

// ....................................................................................
MO.add(500,
function() {
  context.translate(145, 155)
  //context.rotate(0.11);
  //context.fillStyle = "#6CC417";
  context.fillStyle = "#646060";
  context.fillRect(-50, -50, 680, 500);
});

// ....................................................................................
MO.add(500,
function() {
  if(window.opera) {
    TEXT = new mashi.object({
      id: "text", 
      bgimage: "", 
      width: 340, 
      height: 60, 
      position: {
        left: 200, 
        top: 110
      }
    });
    TEXT.set({
      html: 
        "<b>Sorry,</b> <br/>" +
        "Canvas text (native or with typeface.js) fails yet in Opera!",
      style: {
        fontSize: 18,
        color: "#FFF"
      }
    });
  }
  context.font = "3em Optimer, georgia";
  context.fillStyle = "#fff";
  context.fillText("mashi", 5, 12); 
});

// ....................................................................................
MO.add(200,
function() {
  context.fillText("mashi canvas", 5, 12); 
});

// ....................................................................................
MO.add(200,
function() {
  context.font = "5em Optimer, georgia";
  context.fillText("example", 45, 46); 
});

// ....................................................................................
MO.add(1200,
function() {
    TV = new mashi.object({
      id: "tv", 
      bgimage: "../images/page/tv-green.png", 
      width: 127, 
      height: 180, 
      position: {
        left: 1000, 
        top: 50
      }
    });
    TV.moveTo(610, 50);
});

// ....................................................................................
MO.add(600,
function() {
  context.font = "1.2em Optimer, georgia";
  context.fillStyle = "#ffffff";
  context.fillText("you can mix canvas elements", 12, 75); 
});

// ....................................................................................
MO.add(1200,
function() {
  context.font = "1.5em Optimer, georgia";
  context.fillText("with 'normal' html elements.", 25, 93); 
});
