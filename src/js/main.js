$(document).ready(function() {
	var $navUp = $('.js-navUp'),
		$holder = $('.js-holder'),
		listHeight = $('.js-list').height(),
		$navDown = $('.js-navDown'),
		position = 0,
		moveHolder = function(direction){
			var current = parseInt($holder.css('top').replace('px', ''), 10);
			$holder.css('top', current - listHeight*direction);
			if (current - listHeight*direction === 0){
				$navUp.addClass('m-inactive');
			} else {
				$navUp.removeClass('m-inactive');
			}
			if (Math.abs(current - listHeight*direction) + listHeight >= $holder.height()){
				$navDown.addClass('m-inactive');
			} else {
				$navDown.removeClass('m-inactive');
			}
		};
	$navUp.on('click', function(){
		if (!$navUp.hasClass('m-inactive')){
			moveHolder(-1);
		}
	});
	$navDown.on('click', function(){
		if (!$navDown.hasClass('m-inactive')){
			moveHolder(1);
		}
	});
	moveHolder(0);
	var	$image = $('.js-image'),
		$preloader = $('.js-preloader'),
		$info = $('.js-info'),
		$elements = $('.js-galleryItem');
	$holder.on('click', '.js-galleryItem', function(){
		var $tmpImg = $('<img/>'),
			element = this;
		$elements.removeClass('m-active');
		this.className += ' m-active';
		$tmpImg.on('load', function(){
			$image.attr('src', $tmpImg.attr('src'));
			$info.html(element.getAttribute('data-description'));
		});
		$tmpImg.attr('src', element.getAttribute('data-big'));
	});
});