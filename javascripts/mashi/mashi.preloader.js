/*
	Copyright (c) 2008-2009, Uli Preuss All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://mashi.com/license for details
*/

 (function() {

    if (typeof mashi.application.preloader === "undefined") {
        mashi.application.prototype.preloader = function() {};
        _map_ = mashi.application.prototype.preloader;
    }
    _map_.init = function() {
      
      var stageframe = document.getElementById('stageframe');
      var stageframe_height = parseFloat(getStyle('stageframe','height'))/2-12;
      var progressIndicator = document.createElement('div');
      progressIndicator.setAttribute('id', 'progressIndicator');
      progressIndicator.setAttribute('class', _m_.id);
      progressIndicator.style.padding = stageframe_height + 'px 2px 0 0';
      
      progressIndicator.innerHTML = '&nbsp;';
      stageframe.appendChild(progressIndicator);
      
        this.progress = 0;
        this.image_array = this.getImages();
        if(this.image_array.length === 0) {
          this.noimagesCallback();
        }
        else {
          this.addPreloadLayer();
          var mHTML = "";

          for (var i = 0; i < this.image_array.length; i++) {
              mHTML += '<img onload="_map_.incrementProgress();" class="preloadImages" width=1 height=1 src=' + this.image_array[i] + '>';
          }
          document.getElementById("mContainer").innerHTML = mHTML;          
        }
    };
    _map_.getImages = function() {
        var reg, func_str, k, img_arr = [];
        for (var i = 0; i < _m_.slide.array.length; i++) {
            reg = new RegExp("src", "ig");
            if (reg.test(_m_.slide.array[i])) {
                func_str = _m_.slide.array[i][1].toString();
                var img_src = func_str.match(/src=['|"](?:[^'\/]*\/)*([^'"]+)/g);
                if (img_src !== null) {
                    for (k = 0; k < img_src.length; k++) {
                        img_arr.push(img_src[k].substring(5));
                    }
                }
            }
            reg = new RegExp("url", "ig");
            if (reg.test(_m_.slide.array[i])) {
                func_str = _m_.slide.array[i][1].toString();
                var img_url = func_str.match(/url\((?:[^\(\/]*\/)['|"]*([^\)]+)/g);
                if (img_url !== null) {
                    for (k = 0; k < img_url.length; k++) {
                        img_arr.push(img_url[k].substring(4));
                    }
                }
            }

              // ISSUE: Error in IE 6-8
              reg = new RegExp("bgimage", "g");
              if (reg.test(_m_.slide.array[i])) {
                  func_str = _m_.slide.array[i][1].toString();
                  var object_url = func_str.match(/(((\.\.\/)*\w+\/)+|\/?)([\w|\-]+.(jpg|png|gif))/gi);
                  if (object_url !== null) {
                      for (k = 0; k < object_url.length; k++) {
                          var a = object_url[k];
                          //console.log(a);
                          if (a !== ' ') img_arr.push(a);
                      }
                  }
            }
        }
        var unique_img_arr = unique(img_arr).sort();
        //for(i in unique_img_arr) console.log(unique_img_arr[i]);
        _m_.image.array = unique_img_arr;
        return unique_img_arr;
    };
    _map_.addPreloadLayer = function() {

        var div = document.createElement("div");
        div.id = "mContainer";
        document.getElementsByTagName('body')[0].appendChild(div);

    };
    _map_.incrementProgress = function() {
        this.progress++;
        progressbarWidth = (this.progress / this.image_array.length) * 100;
        document.getElementById('progressIndicator').innerHTML = parseInt(progressbarWidth, 10);
        // var progressbarFiles = this.progress +'/' + this.image_array.length;
        // document.getElementById("progressIndicator").innerHTML = progressbarFiles + " files";
        if (this.progress >= this.image_array.length) {
            this.preloadCallback();
        }
    };
    _map_.preloadCallback = function() {        
        var element = document.getElementById("progressIndicator");
        setTimeout(function() {
          
          if (element.parentNode && element.parentNode.removeChild) {
               element.parentNode.removeChild(element);
          }
          if(_m_.start === true) { window[_m_.namespace].start() }
        },
        300);
    };
    _map_.noimagesCallback = function() {
        var element = document.getElementById("progressIndicator");
        setTimeout(function() {
          if (element.parentNode && element.parentNode.removeChild) {
               element.parentNode.removeChild(element);
          }
           if(_m_.start === true) { window[_m_.namespace].start(); }
        },
        1000);
    };

})();

function unique(arrayName){
    var newArray = new Array();
    label: for (var i = 0; i < arrayName.length; i++) {
        for (var j = 0; j < newArray.length; j++) {
            if (newArray[j] == arrayName[i])
            continue label;
        }
        newArray[newArray.length] = arrayName[i];
    }
    return newArray;
}

function getStyle(el,styleProp) {
	var x = document.getElementById(el);
	if (x.currentStyle)
		var y = x.currentStyle[styleProp];
	else if (window.getComputedStyle)
		var y = document.defaultView.getComputedStyle(x,null).getPropertyValue(styleProp);
	return y;
}
