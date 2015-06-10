;
(function($) {
	var defaults = { //默认设置
		"slide": "#slide",
		"page": ".page",
		"duration": 1000,
		"pageination": false,
		"loop": false
	}
	var opts = {},
		contains = null,
		pages = null,
		bb = true,
		timer = null,
		_index = 0,
		newCss = false,
		transform = ["-webkit-transform", "-ms-transform", "-moz-transform", "transform"],
		transition = ["-webkit-transition", "-ms-transition", "-moz-transition", "transition"];
	
	newCss = (isCss(transform) && isCss(transition));

	function layOut() { //布局
		contains.css({
			width: pages.size() * pages.width(),
			position: 'absolute',
			height: '100%'
		})
		pages.css({
			width: (100 / pages.size()) + '%',
			float: 'left',
			height: '100%'
		});
		contains.parent().css({
			position: 'relative'
		});
	}

	function dat() { //控制层
		if (bb) {
			clearInterval(timer);
			timer = setInterval(function() {
				if (_index <= (pages.length - 1)) {
					_index++;
				} else if (opts.loop && _index == pages.length) {
					_index = 0;
				}
				auto(_index);
			}, opts.duration + 500);
		}
	}

	function auto(i) { //核心运动
		bb = false;
		var disLeft = pages.eq(i).width();
		if (newCss) {
			var str = '';
			str = '-' + (i * disLeft) + 'px,0px,0px';
			contains.css({
				'transition': 'all ' + opts.duration + 'ms ease',
				'transform': 'translate3d(' + str + ')'
			});
			contains.on("webkitTransitionEnd msTransitionend mozTransitionend transitionend", function() {
				bb = true;
			});
		} else {
			contains.animate({
					left: -i * disLeft
				},
				opts.duration);
			bb = true;
		}
	}

	function isCss(pro) { //是否支持属性
		var body = $("body")[0];
		for (var i = 0; i < pro.length; i++) {
			if (pro[i] in body.style) {
				return true;
			}
		}
		return false;
	}
	var SL = $.fn.Slide = function(options) { //壳子
		opts = $.extend({}, defaults, options || {});
		contains = $(opts.slide);
		pages = contains.find(opts.page);
		layOut();
		dat();

	}
})(jQuery)