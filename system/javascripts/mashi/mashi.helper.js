/*
    Copyright (c) 2008-2010, Uli Preuss All Rights Reserved.
    Available via Academic Free License v.3.0 OR the modified BSD license.
    see: http://mashi.com/license for details
*/

(function() {

    if (typeof mashi.application.helper === "undefined") {

        _mhelper_ = mashi.application.prototype.helper = function() {};

        _mhelper_.array_unique = function(arrayName) {
            var newArray = new Array();
            label: for (var i = 0; i < arrayName.length; i++) {
                for (var j = 0; j < newArray.length; j++) {
                    if (newArray[j] == arrayName[i])
                    continue label;
                }
                newArray[newArray.length] = arrayName[i];
            }
            return newArray;
        };

        _mhelper_.getStyle = function(id, styleProp) {
            var y,
            x = document.getElementById(id);
            if (x.currentStyle) {
                y = x.currentStyle[styleProp];
            }
            else if (window.getComputedStyle) {
                y = document.defaultView.getComputedStyle(x, null).getPropertyValue(styleProp);
            }
            return y;
        };


        _mhelper_.hasClass = function(node,className) {
            return node.className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'));
        };
        
        _mhelper_.removeClass = function(node,className) {
            if (_mhelper_.hasClass(node,className)) {
                var reg = new RegExp('(\\s|^)'+className+'(\\s|$)');
                node.className=node.className.replace(reg,' ');
            }
        };
        _mhelper_.addClass = function(node, className) {
            if (!_mhelper_.hasClass(node, className)) node.className += " " + className;
        };

        _mhelper_.removeChildNodes = function(node) {
            while (node.childNodes[0]) {
                node.removeChild(node.childNodes[0]);
            }
        };

        _mhelper_.removeChildNodesByClassName = function(node, className) {
            for (var i = 0; i < node.childNodes.length; i++) {
                if (_mhelper_.hasClass(node.childNodes[i], className)) {
                    node.removeChild(node.childNodes[i]);
                }
            }
        };
        
        _mhelper_.setCookie = function( c_name, value, expiredays ) {
            var exdate=new Date();
            exdate.setDate(exdate.getDate()+expiredays);
            document.cookie=c_name+ "=" +escape(value)+
            ((expiredays==null) ? "" : ";expires="+exdate.toUTCString());
        };

        _mhelper_.getCookie = function( c_name ) {
            if (document.cookie.length>0) {
                c_start=document.cookie.indexOf(c_name + "=");
                if (c_start!=-1) {
                    c_start=c_start + c_name.length+1;
                    c_end=document.cookie.indexOf(";",c_start);
                    if (c_end==-1) c_end=document.cookie.length;
                    return unescape(document.cookie.substring(c_start,c_end));
                }
            }
            return "";
        };

        // (c) Peter-Paul Koch
        _mhelper_.findPosY = function(obj) {
            var curtop = 0;
            if (obj.offsetParent) {
                while (1) {
                    curtop += obj.offsetTop;
                    if (!obj.offsetParent) {
                        break;
                    }
                    obj = obj.offsetParent;
                }
            } else if (obj.y) {
                curtop += obj.y;
            }
            return curtop;
        };
        _mhelper_.findPosX = function(obj) {
            var curleft = 0;
            if (obj.offsetParent) {
                while (1) {
                    curleft += obj.offsetLeft;
                    if (!obj.offsetParent) {
                        break;
                    }
                    obj = obj.offsetParent;
                }
            } else if (obj.x) {
                curleft += obj.x;
            }
            return curleft;
        };
        
        _mhelper_.clearAllIntervals = function() {
          for(var ival in _m_.intervals) {
            clearInterval(_m_.intervals[ival]);
          }
       };
        
        // (c) Douglas Crockford
        String.prototype.trim = function () {
          return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
        };
              
    }

})();
