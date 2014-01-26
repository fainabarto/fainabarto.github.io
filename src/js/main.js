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
			element,
			tmpImg = document.createElement('img'),
			itemClickCallback = function(){
				element = this;
				dom.removeClass(dom.$('.js-galleryItem.m-active'), 'm-active');
				dom.addClass(element, 'm-active');
				tmpImg.onload = function(){
					$image.setAttribute('src', tmpImg.getAttribute('src'));
					$info.innerHTML = element.getAttribute('data-description');
					tmpImg.onload = null;
				};
				tmpImg.setAttribute('src', element.getAttribute('data-big'));
			};
		for (var i = 0; i < $elements.length; i++) {
			dom.addEvent($elements[i], 'click', itemClickCallback);
		}
	}
});