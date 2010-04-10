// Pamoorama 0.3
// By: Jean-Nicolas Jolivet 
// www.silverscripting.com/pamoorama/
// Feel free to do whatever you want with the script! Give credits if you like it
// if you don't like it, don't use it ;)
var pamoorama = new Class({
	
	initialize: function(element, options) {
		this.options = Object.extend({
			activateSlider:		true,
			footercolor:		'#000',
			captioncolor:		'#fff',
			caption:			'',
			width:				650,
			enableAutoscroll:	true,
			autoscrollSpeed: 	10000,
			autoscrollOnLoad: 	false
		}, options || {});
		
		this.el = $(element);
		this.elid = element;
		this.el.setStyle('width', this.options.width + 'px');
		this.skipInit = false;
		
		
		
		this.loading = new Element('div', {
			'id': this.elid + '_footer'
		});
		this.loading.setHTML('Loading Panorama...');
		this.loading.injectInside(this.el);
		
		this.picturename = this.el.getProperty('alt');
		if(this.options.caption == '')
		{
			this.options.caption = this.picturename;
		}
		
		this.area = Math.floor(this.options.width / 2) - 20;
		
		
		this.image = new Asset.image(this.picturename, {
			onload: this.continueInit.bind(this)
		});
		this.image.setStyles({'left': '-10000px', 'position': 'relative'});
		
		this.image.injectInside(document.body);
	
	},
	
	continueInit: function()
	{
		if(! this.skipInit)
		{
			
			this.imageWidth = this.image.getSize().size.x;
			this.imageHeight = this.image.getSize().size.y;
			this.ratio = this.imageWidth / 200;
			this.image.remove();
			this.loading.remove();
			
			
			this.outter = new Element('div', {
				'id': this.elid + '_outter',
				'styles': {
					'width' : this.options.width + 'px',
					'height': this.imageHeight + 'px',
					'overflow': 'hidden'
				}
			});
			
			this.inner = new Element('div', {
				'id': this.elid + '_inner',
				'styles' : {
					'width': this.imageWidth + 'px',
					'height': this.imageHeight + 'px',
					'background': 'transparent url(' + this.picturename + ') no-repeat top left'
				}
			});
			
			this.footer = new Element('div', {
				'id': this.elid + '_footer',
				'styles': {
					'width' : this.options.width + 'px',
					'height': '70px',
					'background-color': this.options.footercolor
				}
			});
			
			this.caption = new Element('div', {
				'id': this.elid + '_caption',
				'styles': {
					'float': 'left',
					'padding-left': '5px',
					'color' : this.options.captioncolor,
					'font-family': "Trebuchet MS",
					'font-size': '13px'
				}
			});
			this.caption.setHTML(this.options.caption);
			
			this.thumb = new Element('div', {
				'id': this.elid + '_thumb',
				'styles': {
					'float': 'right',
					'margin-right': '8px',
					'margin-top': '10px',
					'height': this.imageHeight / this.ratio +'px',
					'width': '200px',
					'text-align': 'left',
					'border': '2px solid #fff',
					'cursor': 'pointer'
				},
				'title': 'Click to move the frame!'
			});
			
			if(window.ie)
			{
				this.ieheightadjust = 0;
			}
			else
			{
				this.ieheightadjust = 5;
			}
			this.frame = new Element('div', {
				'id': this.elid + '_frame',
				'styles': {
					'height': (this.imageHeight / this.ratio) +'px',
					'width': this.options.width / this.ratio + 'px',
					'position': 'relative',
					'top': '-' + (this.imageHeight / this.ratio + this.ieheightadjust) +'px',
					'left' : '0px',
					'border': '1px dashed blue',
					'background-color': 'lightblue',
					'cursor': 'move',
					'z-index': '1000',
					'opacity': '0.4',
					'-moz-opacity': '0.4',
					'filter': 'alpha(opacity=40)'
				},
				'title': 'Drag me to move the panorama!'
			});
			
			if(this.options.enableAutoscroll)
			{
				this.playpause = new Element('div', {
					'id': this.elid + '_playpause',
					'styles': {
						'float': 'left',
						'padding-left': '5px',
						'color' : this.options.captioncolor,
						'font-family': "Trebuchet MS",
						'font-size': '11px',
						'clear': 'left',
						'cursor': 'pointer'
					}
				});
				this.playpause.setHTML('Start Autoscroll');
				this.playpause.addEvent('click', this.playpauseClicked.bind(this));
			}
			
			this.halfFrame = (this.options.width / this.ratio) / 2;
			
			this.image.setProperty('width', 200);
			this.image.setProperty('height', this.imageHeight / this.ratio);
			this.image.setStyle('left', '0px');
			
			//Inject everything
			this.outter.injectInside(this.el);
			this.inner.injectInside(this.outter);
			this.footer.injectInside(this.el);
			this.caption.injectInside(this.footer);
			
			if(this.options.enableAutoscroll)
			{
				this.playpause.injectInside(this.footer);
			}
			this.thumb.injectInside(this.footer);
			
			this.image.injectInside(this.thumb);
			this.frame.injectInside(this.thumb);
			
			
			// reset the scroll
			this.outter.scrollTo(0, 0);
			
			//AutoScroll Effects
			this.autoScrollFx = new Fx.Scroll(this.outter, {duration:this.options.autoscrollSpeed, onComplete: this.animCompleted.bind(this)});
			this.autoSlideFx = new Fx.Style(this.frame, 'left', {duration: this.options.autoscrollSpeed});
			
			//do the scrollthing!
			if(this.options.activateSlider)
			{
				this.scroll = new Scroller(this.outter, {area: this.area, velocity: 0.3, onChange:function(x, y) {
					newleft = (x / this.ratio);
					
					this.outter.scrollTo(x, y);
					
					if(x <= 0)
					{
						this.frame.setStyle('left', 0);
					}
					else if(x >= this.imageWidth)
					{
						this.frame.setStyle('left', 200 - this.frame.getStyle('width').toInt());
					}
					else
					{
						if( (newleft >= 0) && (newleft < 200 - this.frame.getStyle('width').toInt()) ) 
						{
							this.frame.setStyle('left', newleft);
							
						}
					}
				}.bind(this)});
				
				this.outter.addEvent('mouseover', this.scroll.start.bind(this.scroll));
				this.outter.addEvent('mouseout', this.scroll.stop.bind(this.scroll));
			}
			
			this.createDraggable();
			
			this.addImageEvent();
			
			if(this.options.autoscrollOnLoad)
			{
				this.playpauseClicked();
			}
			this.skipInit = true;
		}
		
	},
	
	startAnimRight: function() {
		var limitRight = 200 - this.frame.getStyle('width').toInt();
		
		this.outter.scrollTo(0, 0);
		this.frame.setStyle('left', 0);
		
		this.autoSlideFx.start(limitRight);
		this.autoScrollFx.toRight();
		this.direction = 'right';
		
		//stop the scroller/drag etc..
		this.outter.removeEvents('mouseover');
		this.dragHandle.detach();
		this.image.removeEvents('click');
		
	},
	startAnimLeft: function() {
		this.autoSlideFx.start(0);
		this.autoScrollFx.scrollTo(0);
		this.direction = 'left';
		
	},
	
	stopAnim: function() {
		this.autoSlideFx.stop();
		this.autoScrollFx.stop();
		
		//reconnect events
		this.outter.addEvent('mouseover', this.scroll.start.bind(this.scroll));
		this.createDraggable();
		this.addImageEvent();
	},
	
	animCompleted: function() {
		if(this.direction=='right')
		{
			this.startAnimLeft();
		}
		else
		{
			this.startAnimRight();
		}
	},
	
	playpauseClicked: function() {
		if(this.playpause.getText() == 'Start Autoscroll')
		{
			this.playpause.setHTML('Stop Autoscroll');
			this.startAnimRight();
		}
		else
		{
			this.playpause.setHTML('Start Autoscroll');
			this.stopAnim();
		}
	},
	
	createDraggable: function() {
		this.dragHandle = this.frame.makeDraggable({
				modifiers: {x : 'left', y : false}, 
				limit: {x : [0, 200 - this.frame.getStyle('width').toInt() ]}, 
				onDrag: function() {
					frameleft = this.frame.getStyle('left').toInt();
					newscroll = frameleft * this.ratio;
					
					this.outter.scrollTo(newscroll, 0);
					
				}.bind(this)
		});
	},
		
	addImageEvent: function() {
		this.image.addEvent('click', function(event){
				var event = new Event(event);
				var slideEffect = new Fx.Style(this.frame, 'left',{duration:1000, transition: Fx.Transitions.Sine.easeInOut});
				var scrollEffect = new Fx.Scroll(this.outter, {duration:1000, transition: Fx.Transitions.Sine.easeInOut});
				
				newleft = (event.page.x - this.thumb.getLeft().toInt()) - this.halfFrame;
				if(newleft < 0)
				{
					newleft = 0;
				}
				else if(newleft > 200 - this.frame.getStyle('width').toInt())
				{
					newleft = 200 - this.frame.getStyle('width').toInt();
				}
				
				slideEffect.start(newleft);
				scrollEffect.scrollTo(newleft * this.ratio);
		}.bind(this));
	}
	
});