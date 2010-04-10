var KING, // King of Denmark 
CLAUDIUS, // Hamlet's uncle
HAMLET, // Prince of Denmark
GERTRUDE, // Prince Hamlet's mother
GHOST, // King's ghost
OPHELIA, // Sweetheart of Prince Hamlet
POLONIUS, // Ophelia's father
LAERTES, // Ophelia's brother
TEXTLAYER;

// ....................................................................................
THEATER.add(4000,
function() {
    THEATER.set({
        html: ' ',
        style: {
            backgroundImage: "url(../images/hamlet/stage.jpg)",
            backgroundColor: "#797461"
        }
    });
});

// ....................................................................................
THEATER.add(1000,
function() {
    THEATER.set({
        html: '',
        style: {
            backgroundImage: "url(../images/hamlet/stage_2.jpg)"
        }
    });

    TEXTLAYER = new mashi.object({
        id: "text_layer",
        bgimage: "../images/mashi/textbubble_2.png",
        width: 321,
        height: 46,
        position: {
            left: -500,
            top: 10
        }
    });
    TEXTLAYER.set({
        style: {
            padding: "15px",
            fontSize: "13px"
        }
    });
    TEXTLAYER.appear(10, 10);
});

// ....................................................................................
THEATER.add(1000,
function() {
    TEXTLAYER.set({
        html:
        'Hamlet, Prinz von Dänemark, empfängt auf der hohen Schule zu Wittenberg ' +
        'die Nachricht vom plötzlichen Tode des Königs, seines Vaters.'
    });
    THEATER.set({
        html: '',
        style: {
            backgroundImage: "url(../images/hamlet/stage_3.jpg)"
        }
    });
});

// ....................................................................................
THEATER.add(1000,
function() {
    THEATER.set({
        html: '',
        style: {
            backgroundImage: "url(../images/hamlet/stage_4.jpg)"
        }
    });
    slide_fade = false;
});

// ....................................................................................
THEATER.add(1000,
function() {
    KING = new mashi.object({
        id: "king1",
        bgimage: "../images/hamlet/kingofdenmark.png",
        width: 128,
        height: 128,
        position: {
            left: -150,
            top: 98
        }
    });
    KING.moveTo(90, 98);
});

// ....................................................................................
THEATER.add(1400,
function() {
    KING.set({
        style: {
            backgroundImage: "url(../images/hamlet/kingofdenmark_dead.png)"
        }
    });
});

// ....................................................................................
THEATER.add(700,
function() {
    TEXTLAYER.set({
        html: 'Er eilt nach Hause und kommt gerade recht zur Hochzeit seiner Mutter mit seinem Oheim Claudius. '
    });

    HAMLET = new mashi.object({
        id: "hamlet1",
        bgimage: "../images/hamlet/hamlet.png",
        width: 128,
        height: 128,
        position: {
            left: -150,
            top: 98
        }
    });
    HAMLET.moveTo(400, 98);
    KING.disappear(90, 98, 500);

});

// ....................................................................................
THEATER.add(700,
function() {

    CLAUDIUS = new mashi.object({
        id: "claudius1",
        bgimage: "../images/hamlet/claudius.png",
        width: 128,
        height: 128,
        position: {
            left: -150,
            top: 98
        }
    });
    CLAUDIUS.moveTo(90, 98);

    GERTRUDE = new mashi.object({
        id: "gertrude1",
        bgimage: "../images/hamlet/gertrude.png",
        width: 128,
        height: 128,
        position: {
            left: -150,
            top: 98
        }
    });
    GERTRUDE.moveTo(210, 98);
});

// ....................................................................................
THEATER.add(4000,
function() {
    CLAUDIUS.moveTo(590, 98);
    GERTRUDE.moveTo(700, 98);
});

// ....................................................................................
THEATER.add(700,
function() {
    TEXTLAYER.set({
        html: 'Dieser plötzliche Wechsel stimmt ihn nachdenklich.',
        style: {
            fontSize: "17px"
        }
    });
    //KING.moveTo(890, 98);
    HAMLET.set({
        style: {
            backgroundImage: "url(../images/hamlet/hamlet_reflective.png)"
        }
    });

});

// ....................................................................................
THEATER.add(4000,
function() {
    CLAUDIUS.moveTo(990, 98);
    GERTRUDE.moveTo(990, 98);

});

// ....................................................................................
THEATER.add(5000,
function() {
    TEXTLAYER.set({
        html: 'Nachts erscheint ihm seines Vaters Geist, beschuldigt Oheim und Mutter des Mordes und fordert Hamlet auf, ihn zu rächen.',
        style: {
            fontSize: "13px"
        }
    });
    THEATER.set({
        html: '',
        style: {
            backgroundImage: "url(../images/hamlet/stage_4_night.jpg)"
        }
    });
    HAMLET.set({
        style: {
            backgroundImage: "url(../images/hamlet/hamlet.png)"
        }
    });
    GHOST = new mashi.object({
        id: "ghost1",
        bgimage: "../images/hamlet/ghost.png",
        width: 128,
        height: 128,
        position: {
            left: -150,
            top: 98
        }
    });
    GHOST.appear(490, 98, 1500);

});

// ....................................................................................
THEATER.add(4000,
function() {
    HAMLET.set({
        style: {
            backgroundImage: "url(../images/edo/ninja.png)"
        }
    });
});

// ....................................................................................
THEATER.add(4000,
function() {
    // HAMLET.moveTo(990, 98);
    GHOST.moveTo(990, 98);
    THEATER.set({
        html: '',
        style: {
            backgroundImage: "url(../images/hamlet/stage_4.jpg)",
            backgroundColor: "transparent"
        }
    });
    slide_fade = true;
    //TEXTLAYER.disappear(990, 98, 500);
    TEXTLAYER.set({
        html: 'Um zu erforschen, ob ihn der Geist nicht irregeleitet, beschließt Hamlet, sich wahnsinnig zu stellen.'
    });
    HAMLET.set({
        style: {
            backgroundImage: "url(../images/hamlet/hamlet.png)"
        }
    });
});

// ....................................................................................
THEATER.add(4000,
function() {
  TEXTLAYER.set({
      html: 'Um zu erforschen, ob ihn der Geist nicht irregeleitet, beschließt Hamlet, sich wahnsinnig zu stellen.'
  });

});

// ....................................................................................
THEATER.add(4000,
function() {
  TEXTLAYER.set({
      html: 
        'Er lässt von eben eintreffenden Schauspielern ein Stück einstudieren, mit dessen Aufführung er den Oheim-König ' +
        'wie in einer Mausefalle fangen will,'
  });
  CLAUDIUS.appear(590, 98);
});

// ....................................................................................
THEATER.add(4000,
function() {
  TEXTLAYER.set({
      html: 'denn der Szenengang ist so, wie der Geist den Vorgang des Mordes ihm geschildert.'
  });
});

// ....................................................................................
THEATER.add(4000,
function() {
  TEXTLAYER.set({
      html: 'Durch den plötzlichen Aufbruch des Königs bei der verhänglichsten Stelle glaubt Hamlet Gewitzheit erlangt zu haben.'
  });
  CLAUDIUS.moveTo(990, 98);
});

// ....................................................................................
THEATER.add(4000,
function() {
  TEXTLAYER.set({
      html: 
        'Trotzdem kann sein zögernder Geist sich nicht zur Tatkraft der Rache aufraffen. Zwar, wenn Worte Dolche wären, ' +
        'so würde er töten.'
  });
});

// ....................................................................................
THEATER.add(4000,
function() {
  TEXTLAYER.set({
      html: 'Vergebens sucht er sich durch philosophische Fragen über <b>Sein oder Nichtsein</b> über seine Schwäche hinwegzutäuschen.'
  });
});

// ....................................................................................
THEATER.add(4000,
function() {
  TEXTLAYER.set({
      html: 
        'Er wütet mehr gegen sich selbst und gegen die, die ihm die Liebste ist, die holdselige Ophelia, ' +
        'Tochter des Kämmerers Polonius. '
  });
  OPHELIA = new mashi.object({
      id: "ophelia",
      bgimage: "../images/hamlet/ophelia.png",
      width: 128,
      height: 128,
      position: {
          left: -150,
          top: 98
      }
  });
  OPHELIA.appear(490, 98, 1500);
});

// ....................................................................................
THEATER.add(4000,
function() {
  POLONIUS = new mashi.object({
      id: "polonius",
      bgimage: "../images/hamlet/polonius.png",
      width: 128,
      height: 128,
      position: {
          left: -150,
          top: 98
      }
  });
  POLONIUS.appear(690, 98, 1500);
});

// ....................................................................................
THEATER.add(4000,
function() {
  TEXTLAYER.set({
      html: 'Selbst als er den König allein beim Gebet antrifft, verpasst er die Gelegenheit der Rache, '
  });
  CLAUDIUS.appear(190, 98);
  
});

// ....................................................................................
THEATER.add(4000,
function() {
  TEXTLAYER.set({
      html: 
        'um im raschen Wechsel der Stimmung den Horcher im Gemach der Mutter zu töten, ' +
        'der aber nicht der Rechte ist, denn es war der alte Polonius, den er getroffen.'
  });
  POLONIUS.set({
      style: {
          backgroundImage: "url(../images/hamlet/polonius_dead.png)"
      }
  });
});

// ....................................................................................
THEATER.add(4000,
function() {
  TEXTLAYER.set({
      html: 
        'Über Hamlets, des Geliebten, scheinbaren Wahnsinn und des Vaters Tod wird Ophelia wirklich wahnsinnig und ertrinkt im Bach.'
  });
  POLONIUS.moveTo(990, 98);
  OPHELIA.set({
      style: {
          backgroundImage: "url(../images/hamlet/ophelia_dead.png)"
      }
  });
});

// ....................................................................................
THEATER.add(4000,
function() {
  TEXTLAYER.set({
      html: 
        'Ihr Bruder Laertes, soeben von einer Reise nach Frankreich zurückgekehrt,'
  });
  OPHELIA.moveTo(990, 98);
  LAERTES = new mashi.object({
      id: "laertes",
      bgimage: "../images/hamlet/laertes.png",
      width: 128,
      height: 128,
      position: {
          left: -150,
          top: 98
      }
  });
  LAERTES.appear(690, 98, 1500);
});

// ....................................................................................
THEATER.add(4000,
function() {
  TEXTLAYER.set({
      html: 
        'erhebt einen Aufstand, um Vater und Schwester zu rächen, wird aber von dem König, ' +
        'den er für den Schuldigen hält, gegen Hamlet gereizt.'
  });
});

// ....................................................................................
THEATER.add(4000,
function() {
  TEXTLAYER.set({
      html: 
        'Am Grabe Ophelias trifft Hamlet mit Laertes zusammen.'
  });
});

// ....................................................................................
THEATER.add(4000,
function() {
  TEXTLAYER.set({
      html: 
        'Den ausbrechenden Streit schlichtet der König, fordert aber Laertes auf, ' +
        'Hamlet zu ein paar freundschaftlichen Gängen mit dem Rapier aufzufordern,'
  });
});

// ....................................................................................
THEATER.add(4000,
function() {
  TEXTLAYER.set({
      html: 
        'die Spitze seiner Waffe zu vergiften und dadurch den Prinzen zu töten.'
  });
});

// ....................................................................................
THEATER.add(4000,
function() {
  TEXTLAYER.set({
      html: 
        'Hamlet wird verwundet, entreißt Laertes den Degen, durchsticht ihn und den König und stirbt wie diese,'
  });
  LAERTES.set({
      style: {
          backgroundImage: "url(../images/hamlet/laertes_dead.png)"
      }
  });
  CLAUDIUS.set({
      style: {
          backgroundImage: "url(../images/hamlet/claudius_dead.png)"
      }
  });
  HAMLET.set({
      style: {
          backgroundImage: "url(../images/hamlet/hamlet_dead.png)"
      }
  });
});

// ....................................................................................
THEATER.add(4000,
function() {
  TEXTLAYER.set({
      html: 'zugleich mit der Mutter, die irrtümlich aus einem vom König für Hamlet bestimmten Becher vergifteten Wein getrunken.'
  });
  LAERTES.moveTo(990, 98);
  CLAUDIUS.moveTo(990, 98);
  HAMLET.moveTo(990, 98);
  GERTRUDE.appear(400, 98, 1500);
});

// ....................................................................................
THEATER.add(4000,
function() {
  TEXTLAYER.set,({
      html: ''
  });
  GERTRUDE.set({
      style: {
          backgroundImage: "url(../images/hamlet/gertrude_dead.png)"
      }
  });
});

// ....................................................................................
THEATER.add(2500,
function() {
  TEXTLAYER.disappear(10, 10, 1500);
  GERTRUDE.disappear(400, 98, 1500);
    THEATER.set({
        //html: '<span>to be continued...</span>',
        style: {
            backgroundImage: "none",
            backgroundColor: "transparent"
        }
    });

});
