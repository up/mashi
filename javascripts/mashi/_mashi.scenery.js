/*
	Copyright (c) 2008-2009, Uli Preuss All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://mashi.tv/license for details
*/
(function() {

    if (typeof mashi.application.scenery == "undefined") {
        mashi.application.prototype.scenery = function() {};
        _mas_ = mashi.application.prototype.scenery;
    }
    _mas_.scenery = function() {
          _mas_.doSomeThing();
          _ma_.setOpacity(this.id, 1)
          this.xxx = function() {
            
          }            
    };
    _mas_.doSomeThing = function() {
      
    };

})();

