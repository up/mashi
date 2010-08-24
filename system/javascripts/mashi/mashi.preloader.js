/*
    Copyright (c) 2008-2010, Uli Preuss. All Rights Reserved.
    Available via Academic Free License v.3.0 OR the modified BSD license.
    See: http://mashi.com/license for details
*/

(function() {

   if (typeof mashi.application.preloader === "undefined") {
      
      _map_ = mashi.application.prototype.preloader = function() {};
      
      mashi.module('mashi.helper');

      var PI;
      
      _map_.init = function() {

         var stageframe = document.getElementById('stageframe');
         var stageframe_height = parseFloat(_mhelper_.getStyle('stageframe','height'))/2-12;
         PI = document.createElement('div');
         PI.setAttribute('id', 'progressIndicator');
         PI.setAttribute('class', _m_.id);
         PI.style.padding = stageframe_height + 'px 2px 0 0';

         PI.innerHTML = '&nbsp;';
         stageframe.appendChild(PI);

           this.progress = 0;
           this.image_array = this.getImages();
           if(this.image_array.length === 0) {
             this.preloadCallback(1000);
           }
           else {
             this.addPreloadLayer();
             var mHTML = "";

             for (var i = 0; i < this.image_array.length; i++) {
                 //enables background image cache for internet explorer 6
                 if (/MSIE (6)/.test(navigator.userAgent)) {
                     // no preloading in ie6
                     _map_.incrementProgress();
                 }
                 else {
                   mHTML += '<img onload="_map_.incrementProgress();" class="preloadImages" width=1 height=1 src=' + MASHI_APP_PATH + this.image_array[i] + '>';

                 }

             }
             document.getElementById("mContainer").innerHTML = mHTML;          
           }
           
       };
       _map_.getImages = function() {

           var img, reg, func_str, results, k, img_arr = [];

           for (var i = 0; i < _m_.frame.array.length; i++) {

               reg = new RegExp("src", "ig");
               if (reg.test(_m_.frame.array[i])) {
                   func_str = _m_.frame.array[i][1].toString();
                   results = func_str.match(/src.+(png|gif|jpeg|jpg)/g);
                   if (results !== null) {
                       for (k = 0; k < results.length; k++) {
                           var pattern = /src\s?=\s?.['|"]+\s?\+\s?MASHI_APP_PATH\s?\+\s?['|"]+(.+(png|gif|jpeg|jpg))/g;
                           while (matches = pattern.exec(results[k])) {
                             img_arr.push(matches[1]);
                           }
                       }
                   }
               }

               reg = new RegExp("url", "ig");
               if (reg.test(_m_.frame.array[i])) {
                   func_str = _m_.frame.array[i][1].toString();
                   results = func_str.match(/url.+(png|gif|jpeg|jpg)/g);
                   if (results !== null) {
                       for (k = 0; k < results.length; k++) {
                          var pattern = /MASHI_APP_PATH\s?\+\s?['|"]+(.+(png|gif|jpeg|jpg))/g;
                          while (matches = pattern.exec(results[k])) {
                            img_arr.push(matches[1]);
                          }
                       }
                   }
               }

           }
           var unique_img_arr = _mhelper_.array_unique(img_arr).sort();
           //for(i in unique_img_arr) alert(unique_img_arr[i]);
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
           PI.innerHTML = parseInt(progressbarWidth, 10);
           if (this.progress >= this.image_array.length) {
               this.preloadCallback(300);
           }
       };
       
       _map_.preloadCallback = function(delay) {
                 
           setTimeout(function() {
             if (PI.parentNode && PI.parentNode.removeChild) {
                  PI.parentNode.removeChild(PI);
             }
             if(_m_.start === true) { window[_m_.namespace].start(); };
           },
           delay);
       
       };
          
   }

})();
