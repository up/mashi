

// ....................................................................................
THEATER.add("auto",
function() {
    THEATER.set({
      html: ''
      /*
      ,
      position: {
        vertical: 'top', 
        horizontal: 'right',
        padding: "30px"
      }
      */
    });

    var x = 3;
    var intervaal = setInterval(function() {
        if (x > 0) {
            THEATER.set({
              html: x--
            });
        }
        else {
            clearInterval(intervaal);
            slide_finished = true;
            THEATER.set();
        }
    },
    500);
});

// ....................................................................................
THEATER.add(500,
function() {
    THEATER.set({
      html: 
        'HAMLET' +
        '<br/><span class="gray">&nbsp;</span>'
    });
});

// ....................................................................................
THEATER.add(3000,
function() {
    THEATER.set({
      html:  
        'HAMLET' +
        '<br/><span class="gray">For Dummies</span>'
    });
});

// ....................................................................................
