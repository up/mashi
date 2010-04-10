//JavaScript zEvents Library v1.0 by Nicholas C. Zakas, http://www.nczonline.net
//This library governed by the GNU Lesser General Public License
function zEvent() {
    this.type = null;
    this.target = null;
    this.relatedTarget = null;
    this.cancelable = false;
    this.timeStamp = null;
    this.returnValue = true;
};
zEvent.prototype.initEvent = function($a, $b) {
    this.type = $a;
    this.cancelable = $b;
    this.timeStamp = (new Date()).getTime();
};
zEvent.prototype.preventDefault = function() {
    if (this.cancelable) {
        this.returnValue = false;
    }
};
function zEventTarget() {
    this.eventhandlers = new Object();
};
zEventTarget.prototype.addEventListener = function($a, $z) {
    if (typeof this.eventhandlers[$a] == "undefined") {
        this.eventhandlers[$a] = new Array;
    };
    this.eventhandlers[$a][this.eventhandlers[$a].length] = $z;
};
zEventTarget.prototype.dispatchEvent = function($d) {
    $d.target = this;
    if (typeof this.eventhandlers[$d.type] != "undefined") {
        for (var i = 0; i < this.eventhandlers[$d.type].length; i++) {
            this.eventhandlers[$d.type][i]($d);
        }
    };
    return $d.returnValue;
};
zEventTarget.prototype.removeEventListener = function($a, $z) {
    if (typeof this.eventhandlers[$a] != "undefined") {
        var $e = new Array;
        for (var i = 0; i < this.eventhandlers[$a].length; i++) {
            if (this.eventhandlers[$a][i] != $z) {
                $e[$e.length] = this.eventhandlers[$a][i];
            }
        };
        this.eventhandlers[$a] = $e;
    }
};

