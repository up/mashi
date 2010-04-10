
// ....................................................................................
THEATER.add(4000,
function() {
    THEATER.set({
        html: 'The rest is silence.',
        position: {
            vertical: 'middle',
            horizontal: 'center'
        },
        style: {
            backgroundColor: "transparent"
        }
    });
});

// ....................................................................................
THEATER.add(4000,
function() {
    THEATER.set({
        html:
        '<span>story</span>' +
        '<span class="gray"">william shakespeare</span>' +
        '<span><a href="mailto:bill.1564@gmail.com">bill.1564@gmail.com</a></span>'
    });
});

// ....................................................................................
THEATER.add(4000,
function() {
    THEATER.set({
        html:
        '<span>graphics</span>' +
        '<span class="gray">&copy; snowbugs ltd</span>' +
        '<span><a href="http://en.kolme.org">http://en.kolme.org</a></span>'
    });
});

// ....................................................................................
THEATER.add(4000,
function() {
    THEATER.set({
        html:
        '<span>storybord &amp; realisation</span>' +
        '<span class="gray">uli preuss</span>' +
        '<span><a href="http://ulipreuss.eu">http://ulipreuss.eu</a></span>'
    });
});

// ....................................................................................
THEATER.add(000,
function() {
    THEATER.set();
});

// ....................................................................................
THEATER.add(1000,
function() {
    THEATER.set({
        html:
        '<span class="gray">' +
        '   &copy; mashi.tv ' + 
        '   <sup style="font-weight:normal;font-size:10px">BETA</sup>' + 
        '   <em>(' + mashi.version + ')</em>' +
        '   <span style="color:orange">JavaScript Timeline Toolkit</span>' +
        '</span>' +
        '<span style="color:#CCCCCC">' +
        '   <br />Smoke tests with Internet Explorer (6/7/8), Firefox (3.5), <br />Safari (3.2), Opera (9/10) and Chrome (3.1)' +
        '</span>'
    });
});

// ....................................................................................
