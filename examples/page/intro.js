  var TV,
  MASHI_TITLE,
  MASHI_SUBTITLE,
  DESCRIPTION,
  CLOCK,
  BTN_MORE;


// ....................................................................................
INTRO.add(500,
function() {
    TV = new mashi.object({
      id: "tv", 
      bgimage: "images/page/tv-green.png", 
      width: 127, 
      height: 180, 
      position: {
        left: -150, 
        top: 30
      }
    });
    TV.moveTo(110, 30);
});

// ....................................................................................
INTRO.add(500,
function() {
    MASHI_TITLE = new mashi.object({
        id: "mashi_t", 
        bgimage: "images/mashi/logo_small.png", 
        width: 136, 
        height: 39, 
        position: {
          left: -500, 
          top: 52
        }
    });
    MASHI_TITLE.appear(264, 52);

});

// ....................................................................................
INTRO.add(500,
function() {
    MASHI_SUBTITLE = new mashi.object({
        id: "mashi_st", 
        bgimage: "", 
        width: 421, 
        height: 46, 
        position: {
          left: -500, 
          top: 84
        }
    });
    MASHI_SUBTITLE.set({
        html: "JavaScript Timeline Toolkit",
        style: {
            padding: "15px",
            fontFamily: "georgia",
            fontSize: "11px",
            letterSpacing: "0.13em",
            color: "#869937"
        }
    });
    MASHI_SUBTITLE.appear(258, 84);
});

// ....................................................................................
INTRO.add(500,
function() {
    DESCRIPTION = new mashi.object({
        id: "description", 
        bgimage: "", 
        width: 500, 
        height: 46, 
        position: {
          left: -500, 
          top: 10
        }
    });
    DESCRIPTION.set({
        html: 
          "Create Flash-like movies, PowerPoint-like presentations or interactive timeframes with " +
          "<b style='color:white'>web standards</b>.",
        style: {
            padding: "15px",
            fontFamily: "georgia",
            fontSize: "17px",
            /* fontWeight: "bold", */
            color: "#ccc"
        }
    });
    DESCRIPTION.appear(251, 122);
});

// ....................................................................................
INTRO.add(500,
function() {
    CLOCK = new mashi.object({
      id: "clock", 
      bgimage: "images/page/clock-reflection-green-trans.png", 
      width: 43, 
      height: 64, 
      position: {
        left: 1000, 
        top: 56
      }
    });
    CLOCK.moveTo(475, 52);
});

// ....................................................................................
INTRO.add(1000,
function() {
    BTN_MORE = new mashi.object({
      id: "readmore", 
      bgimage: "", 
      width: 90, 
      height: 11, 
      position: {
        left: 0, 
        top: 0
      }
    });
    BTN_MORE.set({
      html: "<a href='javascript:INTRO.start()'>.. read more</a>",
      style: {
        lineHeight: "1.0em",
        padding: "5px 0px 5px 5px ",
        fontSize: "15px"
      }
    });
    BTN_MORE.appear(620, 180);
    INTRO.stop();
});

// ....................................................................................
INTRO.add(1000,
function() {
    BTN_MORE.disappear(620, 180);
    CLOCK.disappear(475, 52);
});

// ....................................................................................
INTRO.add(200,
function() {
    MASHI_SUBTITLE.disappear(250, 84);
});

// ....................................................................................
INTRO.add(200,
function() {
    DESCRIPTION.disappear(251, 122);
});

// ....................................................................................
INTRO.add(500,
function() {
    MASHI_TITLE.disappear(264, 52);
});

// ....................................................................................
INTRO.add(1000,
function() {
  TV.moveTo(1000, 30);
});

