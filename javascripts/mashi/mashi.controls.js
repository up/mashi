/*
	Copyright (c) 2008-2009, Uli Preuss All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://mashi.tv/license for details
*/

 (function() {

    if (typeof mashi.application !== "undefined") {
        mashi.application.prototype.controls = function() {};
        _mac_ = mashi.application.prototype.controls;
    };

    _mac_.create = function() {

        var btnDetails = [
        "first|&#448;&#60;",
        "prev|&#60;&#60;",
        "start|&#62;",
        "stop|&#10073;&#10073;",
        "next|&#62;&#62;",
        "last|&#62;&#448;"
        ];
        var actBtn;
        switch (_m_.buttons.type) {
        case 'single':
            actBtn = "start stop";
            break;
        case 'movie':
            actBtn = "start stop";
            break;
        case 'slideshow':
            actBtn = "first prev next last";
            break;
        case 'all':
            actBtn = "first prev start stop next last";
            break;
        default:
            actBtn = "";
        }

        if (_m_.buttons.type !== 'none') {
            var controls = document.createElement("div");
            controls.id = "mashi-controls";
            controls.setAttribute('class', _m_.id);
            //controls.style.background = "red";
            //controls.style.position = "relative";
            //controls.style.left = _m_.position.X;
            //controls.style.top = _m_.position.Y;
            if (_m_.buttons.horizontal === "center") controls.style.textAlign = "center";
            var parent = _m_.slide.odd.parentNode;
            parent.appendChild(controls);

            var layer = document.createElement("div");
            layer.style.position = "absolute";
            layer.style.zIndex = "200";
            if (_m_.buttons.vertical === "top") layer.style.top = "5px";
            else if (_m_.buttons.vertical === "bottom") layer.style.bottom = "5px";
            else if (_m_.buttons.vertical === "middle") layer.style.bottom = stageframe.offsetHeight/2 - 5 + "px";
            
            if (_m_.buttons.horizontal === "right") layer.style.right = "5px";
            else if (_m_.buttons.horizontal === "left") layer.style.left = "5px";
            else if (_m_.buttons.horizontal === "center") layer.style.width = "99%";
            
            controls.appendChild(layer);
 
            for (var i = 0; i < btnDetails.length; i++) {
                var parts = btnDetails[i].split('|');
                var reg = new RegExp(parts[0], "i");
                if (reg.test(actBtn)) {
                    var btn = document.createElement("a");
                    if (_m_.auto_start === true) {
                        if (_m_.buttons.type === "single" && parts[0] === "start") {
                            btn.style.display = "none";
                        }
                    }
                    else {
                        if (_m_.buttons.type === "single" && parts[0] === "stop") {
                            btn.style.display = "none";
                        }
                    }
                    btn.href = "javascript:" + _m_.namespace + "." + parts[0] + "();";
                    btn.id = "controls-button-" + parts[0];
                    if (_m_.buttons.text === true) {
                        btn.innerHTML = parts[1];
                    }
                    layer.appendChild(btn);
                }
            }
        }
    };

})();

