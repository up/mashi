(function() {

    if (typeof _m_.object != "undefined") {
        _m_.object.prototype.moveTo = function(x, y, delay, ox, oy) {
            var direction = {
              horizontal: '2right',
              vertical: '2bottom'
            }
            var _delay = (delay) ? delay : 25;
            
            var _o = this;
            var _object = this.obj;
            _o.m = _o.id;
            this.steps = 6;
            this.position = {
                'top': true,
                'left': true
            };
            this.diff = {
                'top': null,
                'left': null
            };

            // Get current positions
            if (_object.style.top != "") {
                this.oy = _object.style.top;
            }
            else if (_object.style.bottom != "") {
                this.oy = _object.style.bottom;
                this.position.top = false;
            }
            else this.oy = 0;

            if (_object.style.left != "") {
                this.ox = _object.style.left;
            }
            else if (_object.style.right != "") {
                this.ox = _object.style.right;
                this.position.left = false;
            }
            else this.ox = 0;

            if(parseInt(this.ox, 10) > x) { direction.horizontal = '2left'; }
            if(parseInt(this.oy, 10) > y ) { direction.vertical = '2top'; }
            
            if (!ox) ox = parseInt(this.ox, 10);
            if (!oy) oy = parseInt(this.oy, 10);

            this.diff.left = ox - x;
            this.leftStep = parseInt(this.diff.left / this.steps, 10);

            this.diff.top = oy - y;
            this.topStep = parseInt(this.diff.top / this.steps, 10);

            // horizontal
            if (this.diff.left > 0 && (this.diff.left - this.leftStep) >= this.leftStep) {
                _object.style.left = ox - this.leftStep + "px";
                this.continueSlide = true;
            }
            else if (this.diff.left < 0 && (this.diff.left - this.leftStep) <= this.leftStep) {
                _object.style.left = ox - this.leftStep + "px";
                this.continueSlide = true;
            }
            else {
                _object.style.left = ox + "px";
            }

            // vertical
            if (this.diff.top > 0 && (this.diff.top - this.topStep) >= this.topStep) {
                if (this.position.top == true) {
                    _object.style.top = oy - this.topStep + "px";
                    this.continueSlide = true;
                }
                else _object.style.bottom = oy + this.topStep + "px";
            }
            else if (this.diff.top < 0) {
                if (this.position.top == true) {
                    _object.style.top = oy - this.topStep + "px";
                }
                else {
                    _object.style.bottom = oy - this.topStep + "px";
                }
            }
            else {
                if (this.position.top == true) _object.style.top = oy + "px";
                else _object.style.bottom = oy + "px";
            }

            if (
              direction.horizontal === '2right' && this.diff.left <= this.steps*-1 ||
              direction.horizontal === '2left' && this.diff.left >= this.steps ||
              direction.vertical === '2bottom' && this.diff.top <= this.steps*-1 ||
              direction.vertical === '2top' && this.diff.top >= this.steps
            ) {
                _o.m = setTimeout(
                function() {
                    _o.moveTo(x, y, _delay, parseFloat(_o.obj.style.left), parseFloat(_o.obj.style.top));
                },
                _delay);
            }
            else {
              if (/MSIE (5.5|6)/.test(navigator.userAgent)){ 
                _object.style.backgroundImage = "url(stylesheets/transparent.gif)";
                _object.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod="crop", src="' + _object.title + '")';
              }
                clearTimeout(_o.m);                
            }
        };
        _m_.object.prototype.scrollTo = function(x, y, delay, step) {
          if (_m_.buttons.type === "single") {
              _ma_.$('controls-button-start').style.display = "none";
              _ma_.$('controls-button-stop').style.display = "none";
          }
          var _o = this;
          var _object = this.obj;
          _o.m = _o.id;
          var d = this.delay = (delay) ? delay : 1;
          var s = this.steps = (step) ? step : 1;

          // Get current positions
          this.ox = parseInt(_object.style.left, 10);
          _object.style.left = this.ox - this.steps + 'px';
          if (x < this.ox) {
              _o.m = setTimeout(
              function() {
                _o.scrollTo(x, y, d, s);
              },
              d);
          }
          else {
            if (_m_.buttons.type === "single") {
                _ma_.$('controls-button-start').style.display = "inline-block";
                _ma_.$('controls-button-stop').style.display = "none";
            }
              clearTimeout(_o.m);                
          }
        };
        _m_.object.prototype.appear = function(x, y, duration) {
            var _object = this.obj;
            _object.style.left = x + "px";
            _object.style.top = y + "px";
            // TODO: Is there a way to fade transparent png fixed images in ie
            if (/MSIE (5.5|6|7|8)/.test(navigator.userAgent) === false) {
              _ma_.fadeIn(_object.id, ((duration) ? duration: _m_.fade.duration), _m_.fade.steps, _m_.fade.start);
            }
            else {
               //_ma_.setOpacity(_object.id, 1);
             }
        };
        _m_.object.prototype.disappear = function(x, y, duration) {
            var _object = this.obj;
            _object.style.left = x + "px";
            _object.style.top = y + "px";
            if (/MSIE (5.5|6|7|8)/.test(navigator.userAgent) === false) {
              _ma_.fadeOut(_object.id, (duration) ? duration: _m_.fade.duration, _m_.fade.steps, _m_.fade.end);
            }
            else {
              _ma_.setOpacity(_object.id, 0);
            }
        };
    }

})();

