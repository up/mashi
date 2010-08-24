/*
    Copyright (c) 2008-2010, Uli Preuss. All Rights Reserved.
    Available via Academic Free License v.3.0 OR the modified BSD license.
    See: http://mashi.tv/license for details
*/

(function() {

    if (typeof mashi.application.object == "undefined") {

        mashi.module('mashi.helper');
        if (_IE_) { mashi.module('mashi.IEhacks'); }

        mashi.application.prototype.object = function() {};
        _mao_ = mashi.application.prototype.object;
        _mao_._namespace = "mashi"; 
        _mao_.zindex = 500; 
        _mao_.objects = []; 
             
        _m_.object = function(param) {
            this.id = param.id;
            this.obj = _ma_.$(this.id);

            if(param.className) this.class_name = param.className;
            else this.class_name = '';

            if(param.style) {    
                this.style = {};
                for(property in param.style) {
                    this.style[property] = param.style[property];
                }
            }

            this.html = (param.html) ? param.html : '';
            this.parentObj = stageframe;
          
            if (!this.obj) {

                // Add new object id to array
                _mao_.objects.push(this.id);
                
                // don't forget to set the necessary styles of the stage
                //this.parentObj.style.position = "relative";
                this.parentObj.style.overflow = "hidden";
                this.parentObj.appendChild(
                    _mao_.createObject(this.id, this.class_name, this.style)
                );
                this.obj = _ma_.$(this.id);

                if(typeof this.style !== 'undefined' && typeof this.style['backgroundImage'] !== 'undefined'){
                    this.src = this.style['backgroundImage'].match(/(?:[^\(\/]*\/)['|"]*([^\)]+)/g);
                    if (_IE_ && this.style['backgroundImage'].match(/\.png/i) !== null){ 
                        _mIEhacks_.pngChildHack( this.obj, this.src);
                    }
                    else { 
                        this.obj.style.backgroundImage = "url(" + this.src + ")";
                    }
                }
                if(typeof this.style !== 'undefined' && typeof this.style['textShadow'] !== 'undefined'){
                  if (_IE_6_7_){ 
                    _mIEhacks_.pngChildHack( this.obj, '');
                    _mIEhacks_.textShadow(this.obj, this.style['textShadow'], this.style['fontFamily']);
                  }
                  else if (_IE_8_){ 
                    _mIEhacks_.pngChildHack( this.obj, '');
                    _mIEhacks_.textShadow(this.obj, this.style['textShadow'], this.style['fontFamily'], true);
                  } 
                }
                var html = this.html ? this.html : '';
                if( _IE_ ) _mIEhacks_.addHTML(this.obj, html);
                else this.obj.innerHTML = html;

            }
            else {
                this.obj.style.display = "inline-block";
                this.obj.style.left = param.style.left + "px";
                this.obj.style.top = param.style.top + "px";
                this.obj.style.backgroundImage = "url(" + this.obj.rel + ") ";         
            }

            this.set = function(params) {
            
                var _object = this.obj;
           
                if(!params || params === '') {
                    _object.innerHTML = "";
                    return;
                }
                
                if(params.type === 'textanimation') {
                  _ma_.$(_object.id).innerHTML = params.html;
                }
                
                if(params.style) {

                    for(property in params.style) {
                        if(
                          _IE_ && 
                          property === "backgroundImage" && 
                          params.style[property].match(/\.png/i) !== null
                        ) {
                            var src = params.style[property].match(/(?:[^\(\/]*\/)['|"]*([^\)]+)/g);
                            _mhelper_.removeChildNodesByClassName(_object, 'isChild');
                            _mIEhacks_.pngChildHack( _object, src );
                        }
                        
                        if(_IE_ && property === "textShadow") {
                            if (_IE_6_7_){ 
                                if(params.style[property] !== '') {
                                  _mIEhacks_.textShadow(_object, params.style[property], params.style['fontFamily']);
                                }
                            }
                            else if (_IE_8_){ 
                                if(params.style[property] !== '') {
                                  _mIEhacks_.textShadow(_object, params.style[property], params.style['fontFamily'], true);
                                }
                            } 
                        }
                        else if(_IE_ && property === "fontSize") {
                            if(_ma_.$(_object.id + '_text') !== null){
                                _ma_.$(_object.id + '_text').style.fontSize = params.style[property];
                            }
                            else {
                                _ma_.$(_object.id).style.fontSize = params.style[property];
                            }
                        }
                        else {
                            _object.style[property] = params.style[property];
                        }
                    }
                          
                }
           
                if(params.html && params.type !== 'textanimation') {
                    if(_IE_) {
                        if(typeof _ma_.$(_object.id + '_text') !== 'object') {
                            _mIEhacks_.addHTML(_object, params.html);  
                        }
                        else {
                          if(_ma_.$(_object.id + '_text') !== null) {
                            _ma_.$(_object.id + '_text').innerHTML = params.html;  
                          }
                          else {
                            _ma_.$(_object.id).innerHTML = params.html;  
                          }
                        }
                    }
                    else {
                        _object.innerHTML = params.html;
                    }
                }
                else if(params.$html) {
                  if(_IE_) {
                    if(_ma_.$(_object.id + '_text') !== null) {
                      _ma_.$(_object.id + '_text').innerHTML+= params.$html;  
                    }
                    else {
                      _ma_.$(_object.id).innerHTML+= params.$html;  
                    }
                  }
                    else {
                        _object.innerHTML+= params.$html;
                    }

                }
            };

        };
        _mao_.createObject = function(id, class_name, style) {

            this.object = document.createElement('div');
            this.object.id = id;
            this.object.style.position = "absolute";
            if(class_name !== '') this.object.className = class_name;
          
            for(property in style) {
                if(property !== 'backgroundImage') {
                    this.object.style[property] = style[property];               
                    this.object.rel = style[property];  
                }
            }
            if(this.object.style.padding) {
                if(!_IE_7_8_) {
                    this.object.style.width = parseInt(this.object.style.width, 10) - (parseInt(this.object.style.padding, 10)*2) + "px";         
                    this.object.style.height = parseInt(this.object.style.height, 10) - (parseInt(this.object.style.padding, 10)*2) + "px"; 
                }        
            }
            else {
                this.object.style.padding = "0px";
            }
             	          
            return this.object;
          
        };
        
    }
    
})();
