/*
	Copyright (c) 2008-2009, Uli Preuss All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	See: http://mashi.tv/license for details
*/
(function() {

    if (typeof mashi.application.object == "undefined") {
        mashi.application.prototype.object = function() {};
        _mao_ = mashi.application.prototype.object;
        _mao_._namespace = "mashi"; 
        _mao_.zindex = 500; 
    }
    _m_.object = function(param) {
      var id = param.id;    
      var image_url = param.bgimage;
      var width = param.width;
      var height = param.height;
      var pos_left = param.position.left;
      var pos_top = param.position.top;

      this.id = id;
      this.obj = document.getElementById(this.id);
      this.parentObj = stageframe;

      if (!this.obj) {
        
        // don't forget to set the necessary styles of the stage
        //this.parentObj.style.position = "relative";
        this.parentObj.style.overflow = "hidden";
        
        this.parentObj.appendChild(
          _mao_.createObject(id, image_url, width, height, pos_left, pos_top)
        );
        this.obj = document.getElementById(this.id);
      	
      }
      else {
        this.obj.style.display = "inline-block";
        this.obj.style.left = pos_left + "px";
        this.obj.style.top = pos_top + "px";
        this.obj.style.backgroundImage = "url(" + this.obj.rel + ") ";
        //this.obj.innerHTML = "";
      }
       this.set = function(params) {
         var _object = this.obj;

         if(!params || params === '') {
           _object.innerHTML = "";
           return;
         }
         
         if(params.style) {
           for(property in params.style) {
             _object.style[property] = params.style[property];
             if(property === "backgroundImage") {
               var image_url = params.style[property].replace(/^url\(|\)/, '');
               if (/MSIE (5.5|6)/.test(navigator.userAgent)){ 
                 _object.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod="crop", src="' + image_url + '")';
                 _object.style.backgroundImage = "url(stylesheets/transparent.gif)";
               }
               
             }
           }
         }
         
         if(params.html) {
           _object.innerHTML = params.html;
         }
         else if(params.$html) {
           _object.innerHTML+= params.$html;
         }
         //_ma_.fadeIn(_object.id, _m_.fade_duration, _m_.fade_steps, _m_.fade_start);
      };
            
    };
    _mao_.createObject = function(id, image_url, width, height, pos_left, pos_top) {
        this.tag = document.createElement('div');
        this.tag.style.backgroundImage = "url(" + image_url + ")";
        this.tag.rel = image_url;
        if (/MSIE (5.5|6)/.test(navigator.userAgent)){ 
          this.tag.style.backgroundImage = "url(stylesheets/transparent.gif)";
          this.tag.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod="crop", src="' + image_url + '")';
        }
        //this.tag.id = _mao_._namespace + '_' + id;
        this.tag.id = id;
        this.tag.style.color = "#000";
        this.tag.style.position = "absolute";
        this.tag.style.height = height + "px";
        this.tag.style.width = width + "px";
       // this.tag.style.zIndex =  _mao_.zindex++;
        this.tag.style.left = pos_left + "px";
        this.tag.style.top = pos_top + "px";
        return this.tag;
    };
    _mao_.iepngfix = function(bgImage, method) {
        if (method) {
            return 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + bgImage + '", sizingMethod="' + method + '")';
        } else {
            return 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + bgImage + '")';
        }
    };
    
})();

