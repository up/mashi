var app = new mashi.application();

/* modules */
//mashi.module('mashi.preloader');
//mashi.module('mashi.controls');
//mashi.module('mashi.object.animation');

/* plugins */

/* app parts */
mashi.frameset('content.app');

window.onload = function() {
    app.config({
        meta: {
            namespace: 'app',
            title: '',
            author: ''
        },
        animation: {
            start: true
        }
    });
};


