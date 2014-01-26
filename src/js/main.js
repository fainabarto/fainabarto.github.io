document.addEventListener('DOMContentLoaded', function(){
	var dom = {};
	dom.$ = function(selector){
		return document.body.querySelector(selector);
	};
	dom.$all = function(selector){
		return document.body.querySelectorAll(selector);
	};
	dom.getStyle = function(element){
		return window.getComputedStyle(element);
	};
	dom.hasClass = function(element, className){
		return element.className.indexOf(className) !== -1;
	};
	dom.addClass = function(element, className){
		if (!dom.hasClass(element, className)){
			element.className += ' ' + className;
		}
	};
	dom.removeClass = function(element, className){
		if (element.className.indexOf(' ' + className) !== -1){
			element.className = element.className.replace(' '+className, '');
		} else {
			element.className = element.className.replace(className, '');
		}
	};
	dom.addEvent = function(element, eventName, callback){
		element.addEventListener(eventName, callback);
	};
	var FnStack = function() {
		var i = 0,
			stack = [],
			fnStack = this;
		this.addFn = function(fn, delay, args) {
			stack.push({fn:fn, delay:delay, args:args});
		};
		this.play = function(){
			stack[i].fn(stack[i].args);
			if ((++i) < stack.length){
				setTimeout(fnStack.play, stack[i-1].delay);
			}
		};
		this.all = function(){
			for (var j = stack.length - 1; j >= 0; j--) {
				stack[j].fn();
			}
		};
		this.reload = function() {
			i = 0;	
		};
	};
	if (dom.hasClass(document.body, 'p-gallery')){
		var $navUp = dom.$('.js-navUp'),
			$holder = dom.$('.js-holder'),
			listHeight = parseInt(dom.getStyle(dom.$('.js-list')).height, 10),
			$navDown = dom.$('.js-navDown'),
			position = 0,
			moveHolder = function(direction){
				var current = parseInt(dom.getStyle($holder).top.replace('px', ''), 10);
				$holder.style.top = current - listHeight*direction + 'px';
				if (current - listHeight*direction === 0){
					dom.addClass($navUp, 'm-inactive');
				} else {
					dom.removeClass($navUp, 'm-inactive');
				}
				if (Math.abs(current - listHeight*direction) + listHeight >= $holder.offsetHeight){
					dom.addClass($navDown, 'm-inactive');
				} else {
					dom.removeClass($navDown, 'm-inactive');
				}
			},
			moveHolderDown = function(){
				moveHolder(1);
			};
		dom.addEvent($navUp, 'click', function(){
			if (!dom.hasClass($navUp,'m-inactive')){
				moveHolder(-1);
			}
		});
		dom.addEvent($navDown, 'click', function(e){
			if (!dom.hasClass($navDown, 'm-inactive')){
				moveHolder(1);
			}
		});
		moveHolder(0);
		var	$image = dom.$('.js-image'),
			$preloader = dom.$('.js-preloader'),
			$info = dom.$('.js-info'),
			$elements = dom.$all('.js-galleryItem'),
			hash = location.hash,
			hashTriggered = false,
			element,
			tmpImg = document.createElement('img'),
			itemClickCallback = function(){
				element = this;
				dom.removeClass(dom.$('.js-galleryItem.m-active'), 'm-active');
				dom.addClass(element, 'm-active');
				dom.addClass($image, 'm-load');
				dom.addClass($info, 'm-load');
				dom.addClass($preloader, 'm-visible');
				tmpImg.onload = function(){
					$image.setAttribute('src', tmpImg.getAttribute('src'));
					$image.width = tmpImg.width;
					$image.height = tmpImg.height;
					$info.innerHTML = element.getAttribute('data-description');
					dom.removeClass($image, 'm-load');
					dom.removeClass($info, 'm-load');
					dom.removeClass($preloader, 'm-visible');
					tmpImg.onload = null;
					tmpImg.removeAttribute('src');
				};
				tmpImg.setAttribute('src', element.getAttribute('data-big'));
			};
		for (var i = 0; i < $elements.length; i++) {
			dom.addEvent($elements[i], 'click', itemClickCallback);
			if ($elements[i].getAttribute('href') === hash){
				hashTriggered = true;
				if (i>3){
					var stack = new FnStack();
					for(var j = 1; j < (i+1) / 4; j++){
						stack.addFn(moveHolderDown, 310);
					}
					stack.play();
					$elements[i].click();
				}
			}
		}
		if (!hashTriggered){
			$elements[0].click();
		}
	}
});